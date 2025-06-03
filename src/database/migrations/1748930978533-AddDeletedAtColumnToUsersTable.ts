import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class AddDeletedAtColumnToUsersTable1748930978533
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'users',
      new TableColumn({
        name: 'deleted_at',
        type: 'timestamptz(0)',
        isNullable: true,
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('users', 'deleted_at');
  }
}
