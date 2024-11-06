import { FindOptions, FindOptionsSelect, UpdateResult } from "typeorm";
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

export const getMyTasksCountByDate = async (
  created_by: User,
  date: Date
): Promise<number> => {
  const count = await TaskRepository.count({
    where: { created_by: { id: created_by.id }, date },
  });
  return count;
};

export const createTask = async (data: Task): Promise<Task> => {
  const newTask = await TaskRepository.save(data);
  return newTask;
};

export const checkTask = async (id: string): Promise<Task | null> => {
  const task = await TaskRepository.findOneBy({ id });

  if (!task) {
    return null; // Tâche non trouvée
  }

  // Sauvegarder les modifications
  const updatedTask = await TaskRepository.save(task);
  return updatedTask;
};

export const updateTask = async (
  id: string,
  taskData: Partial<Task>
): Promise<UpdateResult> => {
  const updatedTask = await TaskRepository.update({ id }, taskData);
  return updatedTask;
};

export const getMyTaskById = async (
  created_by: User,
  id: string
): Promise<Task | null> => {
  const task = await TaskRepository.findOne({
    where: { created_by: { id: created_by.id }, id },
  });
  return task;
};
