import { DeleteResult } from "typeorm";
import { AppDataSource } from "../database/data-source";
import { PassionCheckedBy } from "../models/PassionCheckedBy";

const passionCheckedByRepository =
  AppDataSource.getRepository(PassionCheckedBy);

export const getPassionCheckedByDateUserAndPassion = async (
  userId: string,
  date: Date,
  passionId: number
): Promise<PassionCheckedBy | null> => {
  return await passionCheckedByRepository.findOne({
    where: { checked_by: { id: userId }, date, passion: { id: passionId } },
  });
};

export const addPassionCheckedBy = async (data: PassionCheckedBy) => {
  return await passionCheckedByRepository.save(data);
};

export const deletePassionCheckedBy = async (
  id: string
): Promise<DeleteResult> => {
  const deletedTask = await passionCheckedByRepository.delete({ id });
  return deletedTask;
};
