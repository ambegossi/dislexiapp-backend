import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateSettings1612639900868 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'settings',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'font_family',
            type: 'enum',
            enum: ['nunito', 'roboto', 'ubuntu'],
            default: `'nunito'`,
          },
          {
            name: 'speaking_rate',
            type: 'float',
            default: 1,
          },
          {
            name: 'private_profile',
            type: 'boolean',
            default: false,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('settings');
  }
}
