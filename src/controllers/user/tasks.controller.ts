import express, { Request, Response } from "express";
import * as service from "../../services/tasks.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../../models/User";
import { TasksFilter } from "../../types/tasks/filters/tasks.filter";
import { FindOptionsSelect } from "typeorm";
import { Task } from "../../models/Task";
import { HttpError } from "../../errors/HTTPError";

const router = express.Router();

router.post(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const taskData = req.body;

      const userConnected = req.userConnected as User;

      // create auto-increment order
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

router.put(
  "/:id/check",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const userConnected = req.userConnected as User;

      const task = await service.getMyTaskById(userConnected, id);

      if (!task) {
        throw new HttpError(404, "Tâche non trouvée");
      }

      const taskUpdated = await service.updateTask(id, {
        is_checked: !task.is_checked,
      });

      console.log("id", id);
      console.log("task", task);
      console.log("taskUpdated", taskUpdated);
      if (!taskUpdated) {
        throw new Error("Échec de la mise à jour de la tâche");
      }

      res.status(200).send({ success: "Tâche mise à jour avec succès" });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ error: error.message });
    }
  }
);

export default router;
