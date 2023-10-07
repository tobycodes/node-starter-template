import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  Check,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
  JoinColumn,
} from "typeorm";
import type { Relation } from "typeorm";

import { UserModel } from "@components/user";

/**
 * @openapi
 * components:
 *  schemas:
 *    Location:
 *     type: object
 *     properties:
 *      id:
 *       type: number
 *       description: The auto-generated id of the location
 *      lat:
 *        type: number
 *        description: The latitude of the location
 *      lng:
 *        type: number
 *        description: The longitude of the location
 *      city:
 *        type: string
 *        description: The city of the location
 *      state:
 *        type: string
 *        description: The state of the location
 */
@Entity()
@Check(`"lat" >= -90 AND "lat" <= 90`)
@Check(`"lng" >= -180 AND "lng" <= 180`)
class Location {
  @PrimaryGeneratedColumn()
  readonly id!: number;

  @Column({ type: "float" })
  lat!: number;

  @Column({ type: "float" })
  lng!: number;

  @Column({ type: "varchar", length: 255 })
  city!: string;

  @Column({ type: "varchar", length: 255 })
  state!: string;

  @CreateDateColumn({ select: false })
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToOne(() => UserModel, (user) => user.location)
  @JoinColumn()
  user!: Relation<UserModel>;
}

export { Location };
