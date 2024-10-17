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
      throw new Error("Rôle introuvable");
    }

    const user = await service.getUserByEmail(userData.email);

    if (user !== null) {
      throw new Error("Cet email est déjà lié à un compte");
    }

    userData.password = hashedPassword;
    userData.role = role;

    await service.createUser(userData);
    res.status(201).send({ success: "Votre compte à été créé avec succès" });
  } catch (error: any) {
    res.status(400).send({ error: error.message });
  }
});

router.post("/signin", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const user = await service.getUserByEmail(userData.email);

    if (user === null) {
      throw new Error("Identifiants incorects");
    }

    const verifyPassword = await bcrypt.compare(
      userData.password,
      user.password
    );

    if (!verifyPassword) {
      throw new Error("Identifiants incorects");
    }

    const payload = {
      email: user.email,
      role: user.role.label,
    };

    const JWT_SECRET = process.env.JWT_SECRET;

    console.log("JWT_SECRET", JWT_SECRET);

    if (JWT_SECRET === undefined || JWT_SECRET === null) {
      throw new Error("Token non définit");
    }

    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: 846000 });

    res.status(200).send({
      token,
    });
  } catch (error: any) {
    res.status(403).send({ error: error.message });
  }
});

router.get(
  "/me",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const id = req.userConnected?.id;
      if (!id) {
        return res.status(401).send({ error: "Non authorisé" });
      }
      const user = await service.getUserById(id);
      if (!user) {
        res.status(404).send({ error: "Utilisateur introuvable" });
      }
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
