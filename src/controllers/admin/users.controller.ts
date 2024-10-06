import bcrypt from "bcryptjs";
import express, { Request, Response } from "express";
import * as roleService from "../../services/roles.service";
import * as service from "../../services/users.service";

const router = express.Router();

export interface UsersKpis {
  totalUsers: number;
  totalUsersActive: number;
  totalNewUsers: number;
}

export type UsersId = string[];

router.get("/", async (req: Request, res: Response) => {
  try {
    const users = await service.getUsers();

    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

router.get("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const users = await service.getUserById(id);
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send({ error: "An error occurred" });
  }
});

router.post("/", async (req: Request, res: Response) => {
  try {
    const userData = req.body;
    const hashedPassword = await bcrypt.hash(userData.password, 10);
    const role = await roleService.getRoleById(req.body.roleId);

    if (role === null) {
      throw new Error("Role doesn't exist");
    }

    userData.password = hashedPassword;
    userData.role = role;

    await service.createUser(userData);

    res.status(201).send({ success: "The account is successfully created" });
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

export default router;
