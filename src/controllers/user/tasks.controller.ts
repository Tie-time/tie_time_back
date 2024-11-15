import express, { Request, Response } from "express";
import * as service from "../../services/tasks.service";
import { RoleEnum } from "../../enums/RoleEnum";
import { authMiddleware } from "../../middlewares/auth.middleware";
import { User } from "../../models/User";
import { TasksFilter } from "../../types/tasks/filters/tasks.filter";
import { HttpError } from "../../errors/HttpError";
import { getDateWithoutTime } from "../../helpers/date/date.helpers";

const router = express.Router();

router.post(
  "/",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const taskData = req.body;

      const userConnected = req.userConnected as User;

      const formattedDate: Date = getDateWithoutTime(new Date(taskData.date));

      // create auto-increment order
      const maxOrder = await service.getMyTasksCountByDate(
        userConnected,
        formattedDate
      );

      taskData.created_by = userConnected;
      taskData.date = formattedDate.toISOString();
      taskData.is_checked = false;
      taskData.order = maxOrder + 1;

      const taskCreated = await service.createTask(taskData);
      res
        .status(201)
        .send({ success: "Tâche créée avec succès", task: taskCreated });
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

      const formattedDate: Date = getDateWithoutTime(tasksFilter.date);

      const userConnected = req.userConnected as User;

      const tasks = await service.getMyTasksByDate(
        userConnected,
        formattedDate
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

router.put(
  "/:id",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;
      const possibleFields = ["title"];
      const fields = Object.keys(req.body);
      const isValidOperation = fields.every((field) =>
        possibleFields.includes(field)
      );

      if (!isValidOperation) {
        throw new Error(
          `Champs invalides, les champs possible sont: ${possibleFields.join(
            ", "
          )}`
        );
      }

      const taskData = req.body;

      const userConnected = req.userConnected as User;

      const task = await service.getMyTaskById(userConnected, id);

      if (!task) {
        throw new HttpError(404, "Tâche non trouvée");
      }

      const taskUpdated = await service.updateTask(id, taskData);

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

router.delete(
  "/:id",
  authMiddleware({ roles: [RoleEnum.USER, RoleEnum.ADMIN] }),
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const taskData = req.body;

      const userConnected = req.userConnected as User;

      const task = await service.getMyTaskById(userConnected, id);

      if (!task) {
        throw new HttpError(404, "Tâche non trouvée");
      }

      const taskDeleted = await service.deleteTask(id);

      if (!taskDeleted) {
        throw new Error("Échec lors de la suppresion de la tâche");
      }

      res.status(201).send({ success: "Tâche supprimée avec succès" });
    } catch (error: any) {
      const statusCode = error.statusCode || 500;
      res.status(statusCode).send({ error: error.message });
    }
  }
);

export default router;
