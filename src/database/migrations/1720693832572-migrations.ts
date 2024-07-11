import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1720693832572 implements MigrationInterface {
  name = 'Migrations1720693832572';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`participants\` ADD UNIQUE INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\` (\`phone\`)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`participants\` DROP INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\``,
    );
  }
}
