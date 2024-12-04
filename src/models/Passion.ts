import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TypeRateEnum } from "../enums/TypeRateEnum";
import { Rate } from "./Rate";
import { PassionEnum } from "../enums/PassionEnum";
import { url } from "inspector";

@Entity()
export class Passion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: PassionEnum })
  label: PassionEnum;

  @Column({ type: "varchar", length: 255 })
  iconUrl: string;

  @OneToMany(() => Rate, (rate) => rate.type_rate)
  rates: User[];
}
