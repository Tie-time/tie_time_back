import { UpdateResult } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { Rate } from "../models/Rate";
import { User } from "../models/User";

const rateRepository = AppDataSource.getRepository(Rate);

export const createRate = async (data: Rate): Promise<Rate> => {
  const newRate = await rateRepository.save(data);
  return newRate;
};

export const getMyRateById = async (
  created_by: User,
  id: string
): Promise<Rate | null> => {
  const rate = await rateRepository.findOne({
    where: { created_by: { id: created_by.id }, id },
  });
  return rate;
};

export const updateRate = async (
  id: string,
  rateData: Partial<Rate>
): Promise<UpdateResult> => {
  const updatedRate = await rateRepository.update({ id }, rateData);
  return updatedRate;
};
