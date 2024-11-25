import {
  Column,
  CreateDateColumn,
  Entity,
  Index,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";

@Entity()
export class Task {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ length: 200 })
  title: string;

  @Column()
  is_checked: boolean;

  @Column()
  date: Date;

  @Column({ width: 2 })
  order: number;

  @ManyToOne(() => User, (user) => user.tasks)
  created_by: User;
}
