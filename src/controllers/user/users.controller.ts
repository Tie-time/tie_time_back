import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import * as roleService from "../../services/roles.service";
import * as service from "../../services/users.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";

const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role = await roleService.getRoleByLabel(RoleEnum.USER);

    if (role === null) {
      throw new Error("Role doesn't exist");
    }

    userData.password = hashedPassword;
    userData.role = role;

    await service.createUser(userData);

    res.status(201).send({ success: "Your account successfully created" });
  } catch (error: any) {
    switch (error.code) {
      case "23505":
        error.message = "This email is already linked to an account";
        break;
      default:
        error.message = "An error occurred";
        break;
    }
    res.status(400).send({ error: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await service.getUserByEmail(userData.email);

    if (user === null) {
      throw new Error("Bad credentials");
    }

    const verifyPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!verifyPassword) {
      throw new Error("Bad credentials");
    }

    const payload = {
      userId: user.id,
      email: user.email,
      role: user.role.label,
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    console.log("JWT_SECRET", JWT_SECRET);

    if (JWT_SECRET === undefined || JWT_SECRET === null) {
      throw new Error("No JWT secret provide");
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 846000 });

    res.status(200).send({
      token,
      role: user.role.label,
      id: user.id,
      pseudo: user.pseudo,
    });
  } catch (error: any) {
    res.status(404).send({ error: error.message });
  }
});

router.get(
  "/me",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const id = req.userConnected?.id;
      if (!id) {
        return res.status(401).send({ error: "Not authorized" });
      }
      const user = await service.getUserById(id);
      if (!user) {
        res.status(404).send({ error: "User not found" });
      }
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
