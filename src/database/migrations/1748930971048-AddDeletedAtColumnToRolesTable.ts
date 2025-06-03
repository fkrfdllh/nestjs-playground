import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeletedAtColumnToRolesTable1748930971048
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'roles',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamptz(0)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('roles', 'deleted_at');
  }
}
