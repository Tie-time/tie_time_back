import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { Task } from "./Task";
import { PassionCheckedBy } from "./PassionCheckedBy";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ type: "varchar", length: 100 })
  pseudo: string;

  @ManyToOne(() => Role, (role) => role.users)
  role: Role;

  @OneToMany(() => Task, (task) => task.created_by)
  tasks: Task[];

  @OneToMany(
    () => PassionCheckedBy,
    (passionCheckedBy) => passionCheckedBy.checked_by
  )
  passions: PassionCheckedBy[];
}
