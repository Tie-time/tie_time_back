import express, { Request, Response } from "express";
import * as service from "../../services/tasks.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../../models/User";
import { TasksFilter } from "../../types/express/filters/tasks.filter";

const router = express.Router();

router.post(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const taskData = req.body;

      const userConnected = req.userConnected as User;

      // TODO création de l'incrément order automatique
      const maxOrder = await service.getMyTasksCountByDate(
        userConnected,
        taskData.date
      );

      taskData.created_by = userConnected;
      taskData.is_checked = false;
      taskData.order = maxOrder + 1;

      await service.createTask(taskData);
      res.status(201).send({ success: "Tâche créée avec succès" });
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

router.get(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const query = req.query;

      if (!query.date) {
        throw new Error("Date manquante");
      }

      const tasksFilter: TasksFilter = {
        date: new Date(query.date as string),
      };

      const userConnected = req.userConnected as User;

      console.log("TASK FILTER", tasksFilter);
      console.log("USER", userConnected);

      const tasks = await service.getMyTasksByDate(
        userConnected,
        tasksFilter.date
      );

      res.status(200).send(tasks);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  }
);

export default router;
