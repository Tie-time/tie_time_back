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
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: "float", precision: 2, scale: 1 })
  score: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  created_by: User;

  @ManyToOne(() => TypeRate, (typeRate) => typeRate.id)
  id_type_rate: TypeRate;
}
