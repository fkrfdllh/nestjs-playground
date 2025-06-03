import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity('roles')
export class Role {
  @PrimaryGeneratedColumn({
    type: 'int',
  })
  id!: number;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @CreateDateColumn({
    type: 'timestamptz',
    name: 'created_at',
    nullable: true,
    precision: 0,
  })
  createdAt?: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
    name: 'updated_at',
    nullable: true,
    precision: 0,
  })
  updatedAt?: Date;

  @DeleteDateColumn({
    type: 'timestamptz',
    name: 'deleted_at',
    nullable: true,
    precision: 0,
  })
  deletedAt?: Date;

  @OneToMany(() => User, (user) => user.role)
  users: User[];

  @BeforeInsert()
  beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
  }

  @BeforeUpdate()
  beforeUpdate() {
    this.updatedAt = new Date();
  }

  @BeforeSoftRemove()
  beforeSoftRemove() {
    this.deletedAt = new Date();
  }
}
