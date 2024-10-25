import { AppDataSource } from "../database/data-source";
import { Task } from "../models/Task";

const TaskRepository = AppDataSource.getRepository(Task);

// export const getTasksByDay = async (day: Date): Promise<Task[]> => {
//   const Tasks = await TaskRepository.find({ where: { date: day } });
//   return Tasks;
// };

export const createTask = async (data: Task): Promise<Task> => {
  const newTask = await TaskRepository.save(data);
  return newTask;
};
