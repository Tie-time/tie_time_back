import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "varchar", length: 100 })
  pseudo: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;
}
