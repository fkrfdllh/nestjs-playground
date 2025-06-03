import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreatePlatformsTable1748844493553 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'platforms',
        columns: [
          {
            name: 'id',
            type: 'int',
            isNullable: false,
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          { name: 'name', type: 'varchar', isNullable: false },
          { name: 'alias', type: 'varchar', isNullable: true },
          { name: 'icon', type: 'varchar', isNullable: true },
          { name: 'created_at', type: 'timestamptz(0)', isNullable: true },
          { name: 'updated_at', type: 'timestamptz(0)', isNullable: true },
          { name: 'deleted_at', type: 'timestamptz(0)', isNullable: true },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('platforms', true);
  }
}
