import { AppDataSource } from "../database/data-source";
import { User } from "../models/User";
import { Role } from "../models/Role";
const roleRepository = AppDataSource.getRepository(Role);
const userRepository = AppDataSource.getRepository(User);

export const createUser = async (data: User): Promise<User> => {
  return userRepository.save(data);
};

export const getUsers = async (): Promise<User[]> => {
  const users = await userRepository.find();
  return users;
};

export const getUserByEmail = async (email: string): Promise<User | null> => {
  try {
    return await userRepository.findOneOrFail({
      where: { email },
      relations: ["role"],
    });
  } catch (error) {
    return null;
  }
};

export const getUserById = async (id: string): Promise<User | null> => {
  try {
    return await userRepository.findOne({
      where: { id },
    });
  } catch (error) {
    return null;
  }
};
