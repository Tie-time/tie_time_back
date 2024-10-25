import { AppDataSource } from "../database/data-source";
import { Task } from "../models/Task";
import { User } from "../models/User";

const TaskRepository = AppDataSource.getRepository(Task);

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
