import { AppDataSource } from "../database/data-source";
import { Passion } from "../models/Passion";
import { PassionCheckedBy } from "../models/PassionCheckedBy";

const passionRepository = AppDataSource.getRepository(Passion);

export const getPassions = async (): Promise<Passion[]> => {
  return await passionRepository.find();
};

export const getPassionById = async (id: number): Promise<Passion> => {
  return await passionRepository.findOneOrFail({ where: { id } });
};

export const getMyPassionsWithCheckedStatusByDate = async (
  userId: string,
  date: Date
) => {
  return await passionRepository
    .createQueryBuilder("passion")
    .leftJoin(
      PassionCheckedBy,
      "pcb",
      "pcb.passion = passion.id AND pcb.checked_by = :userId AND pcb.date = :date",
      { userId, date }
    )
    .select([
      "passion.id as id",
      "passion.label as label",
      "passion.icon_path as icon_path",
      "CASE WHEN pcb.id IS NOT NULL THEN 1 ELSE 0 END as is_checked",
    ])
    .orderBy("passion.id", "ASC")
    .getRawMany()
    .then((results) =>
      results.map((result) => ({
        ...result,
        is_checked: result.is_checked === "1",
      }))
    );
};
