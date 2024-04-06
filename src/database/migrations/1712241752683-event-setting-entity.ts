import { MigrationInterface, QueryRunner } from "typeorm";

export class EventSettingEntity1712241752683 implements MigrationInterface {
    name = 'EventSettingEntity1712241752683'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`event_settings\` ADD \`shortname\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`event_settings\` ADD \`copyright\` varchar(255) NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`expired_at\` \`expired_at\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`payments\` CHANGE \`expired_at\` \`expired_at\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`ALTER TABLE \`event_settings\` DROP COLUMN \`copyright\``);
        await queryRunner.query(`ALTER TABLE \`event_settings\` DROP COLUMN \`shortname\``);
    }

}
