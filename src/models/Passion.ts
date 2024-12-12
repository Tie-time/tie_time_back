import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { TypeRateEnum } from "../enums/TypeRateEnum";
import { Rate } from "./Rate";
import { PassionEnum } from "../enums/PassionEnum";
import { url } from "inspector";
import { PassionCheckedBy } from "./PassionCheckedBy";

@Entity()
export class Passion {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: PassionEnum })
  label: PassionEnum;

  @Column({ type: "varchar", length: 255 })
  icon_path: string;

  @OneToMany(
    () => PassionCheckedBy,
    (passionCheckedBy) => passionCheckedBy.passion
  )
  checkedBy: PassionCheckedBy[];
}
