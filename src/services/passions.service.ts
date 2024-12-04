import { AppDataSource } from "../database/data-source";
import { Passion } from "../models/Passion";

const PassionRepository = AppDataSource.getRepository(Passion);

export const getPassions = async (): Promise<Passion[]> => {
  return await PassionRepository.find();
};
