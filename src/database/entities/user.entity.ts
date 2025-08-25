import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Role } from './role.entity';
import bcrypt from 'bcrypt';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({
    type: 'bigint',
  })
  id!: number;

  @Column({
    nullable: false,
    type: 'int',
    name: 'role_id',
  })
  roleId!: number;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'name',
  })
  name!: string;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'email',
  })
  email!: string;

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'username',
  })
  username?: string;

  @Column({
    nullable: false,
    type: 'varchar',
    name: 'password',
  })
  password!: string;

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'phone',
  })
  phone?: string;

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

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn({ name: 'role_id' })
  role: Role;

  @BeforeInsert()
  async beforeInsert() {
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.password = await bcrypt.hash(this.password, await bcrypt.genSalt());
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
