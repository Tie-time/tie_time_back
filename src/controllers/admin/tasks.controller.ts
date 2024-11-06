import express, { Request, Response } from "express";
import * as service from "../../services/tasks.service";
import { TasksFilter } from "../../types/tasks/filters/tasks.filter";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  try {
    const query = req.query;

    if (!query.date) {
      throw new Error("Date manquante");
    }

    const tasksFilter: TasksFilter = {
      date: new Date(query.date as string),
    };

    const tasks = await service.getTasksByDate(tasksFilter.date);

    res.status(200).send(tasks);
  } catch (error: any) {
    res.status(500).send({ error: error.message });
  }
});

export default router;
