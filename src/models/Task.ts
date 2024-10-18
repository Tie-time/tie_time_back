import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ length: 200 })
  title: string;

  @Column()
  checked: boolean;

  @Column()
  date: Date;

  @Column({ width: 2 })
  order: number;

  @ManyToOne(() => User, (user) => user.id)
  created_by: User;
}
