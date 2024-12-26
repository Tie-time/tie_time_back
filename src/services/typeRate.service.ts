import { AppDataSource } from "../database/data-source";
import { Rate } from "../models/Rate";
import { TypeRate } from "../models/TypeRate";

const typeRateRepository = AppDataSource.getRepository(TypeRate);

export const getTypeRates = async (): Promise<TypeRate[]> => {
  return await typeRateRepository.find();
};

export const getTypeRateById = async (id: number): Promise<TypeRate> => {
  return await typeRateRepository.findOneOrFail({ where: { id } });
};

export const getMyRateWithScoreByDate = async (userId: string, date: Date) => {
  return await typeRateRepository
    .createQueryBuilder("type_rate")
    .leftJoin(
      Rate,
      "rate",
      "rate.type_rate = type_rate.id AND rate.created_by = :userId AND rate.date = :date",
      { userId, date }
    )
    .select([
      "rate.id as id",
      "type_rate.label as label",
      "type_rate.description as description",
      "type_rate.out_of as out_of",
      "type_rate.id as type_rate_id",
      "rate.score as score",
    ])
    .orderBy("type_rate.id", "ASC")
    .getRawMany();
};
