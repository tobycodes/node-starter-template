import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import type { Relation } from "typeorm";

import { LocationModel } from "@components/location";
import { ImageModel } from "@components/image";

/**
 * @openapi
 * components:
 *  schemas:
 *   User:
 *    type: object
 *    properties:
 *      id:
 *        type: number
 *        description: The auto-generated id of the user
 *      firstName:
 *       type: string
 *       description: The first name of the user
 *      lastName:
 *        type: string
 *        description: The last name of the user
 *      email:
 *        type: string
 *        description: The email of the user
 *      phone:
 *        type: string
 *        description: The phone number of the user
 *      avatar:
 *        type: string
 *        format: url
 *        description: The url of the avatar image of the user
 *      location:
 *        $ref: '#/components/schemas/Location'
 */
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ length: 50 })
  firstName!: string;

  @Column({ length: 50 })
  lastName!: string;

  @Column({ unique: true })
  email!: string;

  @Column({ length: 150, select: false })
  password!: string;

  @Column({ default: false })
  verified!: boolean;

  @Column({ length: 30, nullable: true, unique: true })
  phone?: string;

  @Column({ length: 255 })
  color!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @DeleteDateColumn({ comment: "Soft delete" })
  deletedAt!: Date;

  @OneToOne(() => ImageModel)
  @JoinColumn()
  avatar?: Relation<ImageModel>;

  @OneToOne(() => LocationModel, (location) => location.user, { eager: true, cascade: true, onDelete: "CASCADE" })
  location!: Relation<LocationModel>;
}
