import { AppDataSource } from "../database/data-source";
import { Task } from "../models/Task";
import { User } from "../models/User";

const TaskRepository = AppDataSource.getRepository(Task);

export const getTasksByDate = async (date: Date): Promise<Task[]> => {
  const tasks = await TaskRepository.createQueryBuilder("task")
    .leftJoinAndSelect("task.created_by", "created_by")
    .select([
      "task.id",
      "task.title",
      "task.is_checked",
      "task.date",
      "task.order",
      "created_by.email",
    ])
    .andWhere("task.date = :date", { date })
    .orderBy("task.order", "ASC")
    .getMany();
  return tasks;
};

export const getMyTasksByDate = async (
  created_by: User,
  date: Date
): Promise<Task[]> => {
  const tasks = await TaskRepository.find({
    select: ["id", "title", "is_checked", "date", "order"],
    where: { created_by: { id: created_by.id }, date },
    order: { order: "ASC" },
  });
  return tasks;
};

export const createTask = async (data: Task): Promise<Task> => {
  const newTask = await TaskRepository.save(data);
  return newTask;
};
