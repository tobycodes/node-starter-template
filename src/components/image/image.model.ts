import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToOne } from "typeorm";
import type { Relation } from "typeorm";

import { UserModel } from "@components/user";

@Entity()
export class Image {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "varchar", length: 255 })
  url!: string;

  @Column({ type: "varchar", length: 255 })
  key!: string;

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @OneToOne(() => UserModel, (user) => user.avatar)
  user!: Relation<UserModel>;
}
