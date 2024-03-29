import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddNameToEventSetting1711664715126 implements MigrationInterface {
  name = 'AddNameToEventSetting1711664715126';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event_settings\` ADD \`name\` varchar(255) NOT NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_settings\` ADD \`tagline\` varchar(255) NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`event_settings\` DROP COLUMN \`tagline\``,
    );
    await queryRunner.query(
      `ALTER TABLE \`event_settings\` DROP COLUMN \`name\``,
    );
  }
}
