import {
  BeforeInsert,
  BeforeSoftRemove,
  BeforeUpdate,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('platforms')
export class Platform {
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

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'alias',
  })
  alias?: string;

  @Column({
    nullable: true,
    type: 'varchar',
    name: 'icon',
  })
  icon?: string;

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
