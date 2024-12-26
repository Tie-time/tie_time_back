import { AppDataSource } from "../database/data-source";
import { Rate } from "../models/Rate";

const rateRepository = AppDataSource.getRepository(Rate);

export const createRate = async (data: Rate): Promise<Rate> => {
  const newRate = await rateRepository.save(data);
  return newRate;
};
