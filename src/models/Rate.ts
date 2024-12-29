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
import { TypeRate } from "./TypeRate";

@Entity()
@Index("IDX_DATE_RATE_TYPE", ["date", "type_rate"], { unique: true })
export class Rate {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  score: number;

  @Column()
  date: Date;

  @ManyToOne(() => User, (user) => user.id)
  created_by: User;

  @ManyToOne(() => TypeRate, (typeRate) => typeRate.id)
  type_rate: TypeRate;
}
