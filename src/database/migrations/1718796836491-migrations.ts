import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1718796836491 implements MigrationInterface {
  name = 'Migrations1718796836491';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD \`hash\` varchar(255) NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`users\` ADD UNIQUE INDEX \`IDX_f1a9842e79756a9f25ba8dbe46\` (\`hash\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`users\` DROP INDEX \`IDX_f1a9842e79756a9f25ba8dbe46\``,
    );
    await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`hash\``);
  }
}
