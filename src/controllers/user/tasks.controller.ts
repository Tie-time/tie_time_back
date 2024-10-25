import express, { Request, Response } from "express";
import * as service from "../../services/tasks.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../../models/User";

const router = express.Router();

router.post(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const taskData = req.body;

      const userConnected = req.userConnected;

      taskData.created_by = userConnected as User;
      taskData.is_checked = false;

      await service.createTask(taskData);
      res.status(201).send({ success: "Tâche créée avec succès" });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
