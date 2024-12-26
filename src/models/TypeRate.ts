import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TypeRateEnum } from "../enums/TypeRateEnum";
import { Rate } from "./Rate";

@Entity()
export class TypeRate {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: TypeRateEnum })
  code: TypeRateEnum;

  @Column({ type: "varchar", length: 100 })
  label: string;

  @Column({ type: "text" })
  description: string;

  @Column({ width: 2 })
  out_of: number;

  @OneToMany(() => Rate, (rate) => rate.type_rate)
  rates: User[];
}
