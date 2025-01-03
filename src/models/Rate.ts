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

@Entity()
export class Rate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ type: "float", precision: 2, scale: 1 })
  score: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  created_by: User;

  @ManyToOne(() => TypeRate, (typeRate) => typeRate.id)
  type_rate: TypeRate;
}
