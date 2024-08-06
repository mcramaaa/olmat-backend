import { MigrationInterface, QueryRunner } from 'typeorm';

export class Migrations1722922015581 implements MigrationInterface {
  name = 'Migrations1722922015581';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\` ON \`participants\``,
    );
    await queryRunner.query(
      `DROP INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` ON \`participants\``,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` ON \`participants\` (\`email\`)`,
    );
    await queryRunner.query(
      `CREATE UNIQUE INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\` ON \`participants\` (\`phone\`)`,
    );
  }
}
