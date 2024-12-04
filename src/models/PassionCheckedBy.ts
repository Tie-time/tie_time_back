import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { TypeRate } from "./TypeRate";
import { Passion } from "./Passion";

@Entity()
export class PassionCheckedBy {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  checked_by: User;

  @ManyToOne(() => Passion, (passion) => passion.id)
  passion: Passion;
}
