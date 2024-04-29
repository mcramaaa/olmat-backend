import { MigrationInterface, QueryRunner } from "typeorm";

export class NewUserEntity1714382370868 implements MigrationInterface {
    name = 'NewUserEntity1714382370868'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` CHANGE \`phone\` \`phone\` varchar(255) NOT NULL`);
    }

}
