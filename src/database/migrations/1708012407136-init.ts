import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1708012407136 implements MigrationInterface {
    name = 'Init1708012407136'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`provincies\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_b9b5e6eb174ca5a8d9e5ed04d0\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`regions\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`region_code\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_4fcd12ed6a046276e2deb08801\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`subdistricts\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`city_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_6b8edc4fb44648164d0d1635c5\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`cities\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`province_id\` varchar(255) NOT NULL, \`region_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_4762ffb6e5d198cfec5606bc11\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`schools\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`address\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`degree\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`is_accept\` tinyint NOT NULL, \`province_id\` varchar(255) NOT NULL, \`city_id\` varchar(255) NOT NULL, \`subdistrict_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_95b932e47ac129dd8e23a0db54\` (\`id\`), UNIQUE INDEX \`IDX_74a5374cf6d1c970dd47f888bf\` (\`email\`), UNIQUE INDEX \`IDX_6eaa373335646a77e5cdddd996\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`participants\` (\`id\` varchar(255) NOT NULL, \`name\` varchar(255) NOT NULL, \`gender\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`birth\` varchar(255) NOT NULL, \`img\` varchar(255) NOT NULL, \`attachment\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`payment_id\` int NOT NULL, \`school_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_1cda06c31eec1c95b3365a0283\` (\`id\`), UNIQUE INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\` (\`phone\`), UNIQUE INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`payments\` (\`id\` int NOT NULL AUTO_INCREMENT, \`code\` varchar(255) NOT NULL, \`amount_participants\` int UNSIGNED NOT NULL, \`payment_amount\` int UNSIGNED NOT NULL, \`status\` int UNSIGNED NOT NULL, \`img\` int UNSIGNED NOT NULL, \`user_id\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_2b3c754ea3bf83cab000b8ed3d\` (\`code\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(255) NOT NULL, \`nama\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`phone\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` (\`id\`), UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_a000cca60bcf04454e72769949\` (\`phone\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admins\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role_id\` int NOT NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, UNIQUE INDEX \`IDX_051db7d37d478a69a7432df147\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`admin_role\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`permissions\` text NULL, \`created_at\` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`created_by\` varchar(255) NULL DEFAULT 'System', \`updated_at\` datetime(6) NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`updated_by\` timestamp NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`subdistricts\` ADD CONSTRAINT \`FK_bd1910ffb32bd4e8cac5a34b625\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_52af18d505515614479e5c9f5e9\` FOREIGN KEY (\`province_id\`) REFERENCES \`provincies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`cities\` ADD CONSTRAINT \`FK_42a294591feef6af3d96d60132a\` FOREIGN KEY (\`region_id\`) REFERENCES \`regions\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schools\` ADD CONSTRAINT \`FK_8d27a0fa9ccde6952aa719e374a\` FOREIGN KEY (\`province_id\`) REFERENCES \`provincies\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schools\` ADD CONSTRAINT \`FK_d92181684e73f7533e903e1acfd\` FOREIGN KEY (\`city_id\`) REFERENCES \`cities\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`schools\` ADD CONSTRAINT \`FK_feaef04da6b374c39efc59b1266\` FOREIGN KEY (\`subdistrict_id\`) REFERENCES \`subdistricts\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_0405e491d80bf2ee0db1166d203\` FOREIGN KEY (\`payment_id\`) REFERENCES \`payments\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`participants\` ADD CONSTRAINT \`FK_c782e6d3294427d395137de3778\` FOREIGN KEY (\`school_id\`) REFERENCES \`schools\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`payments\` ADD CONSTRAINT \`FK_427785468fb7d2733f59e7d7d39\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`admins\` ADD CONSTRAINT \`FK_5733c73cd81c566a90cc4802f96\` FOREIGN KEY (\`role_id\`) REFERENCES \`admin_role\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`admins\` DROP FOREIGN KEY \`FK_5733c73cd81c566a90cc4802f96\``);
        await queryRunner.query(`ALTER TABLE \`payments\` DROP FOREIGN KEY \`FK_427785468fb7d2733f59e7d7d39\``);
        await queryRunner.query(`ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_c782e6d3294427d395137de3778\``);
        await queryRunner.query(`ALTER TABLE \`participants\` DROP FOREIGN KEY \`FK_0405e491d80bf2ee0db1166d203\``);
        await queryRunner.query(`ALTER TABLE \`schools\` DROP FOREIGN KEY \`FK_feaef04da6b374c39efc59b1266\``);
        await queryRunner.query(`ALTER TABLE \`schools\` DROP FOREIGN KEY \`FK_d92181684e73f7533e903e1acfd\``);
        await queryRunner.query(`ALTER TABLE \`schools\` DROP FOREIGN KEY \`FK_8d27a0fa9ccde6952aa719e374a\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_42a294591feef6af3d96d60132a\``);
        await queryRunner.query(`ALTER TABLE \`cities\` DROP FOREIGN KEY \`FK_52af18d505515614479e5c9f5e9\``);
        await queryRunner.query(`ALTER TABLE \`subdistricts\` DROP FOREIGN KEY \`FK_bd1910ffb32bd4e8cac5a34b625\``);
        await queryRunner.query(`DROP TABLE \`admin_role\``);
        await queryRunner.query(`DROP INDEX \`IDX_051db7d37d478a69a7432df147\` ON \`admins\``);
        await queryRunner.query(`DROP TABLE \`admins\``);
        await queryRunner.query(`DROP INDEX \`IDX_a000cca60bcf04454e72769949\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_a3ffb1c0c8416b9fc6f907b743\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_2b3c754ea3bf83cab000b8ed3d\` ON \`payments\``);
        await queryRunner.query(`DROP TABLE \`payments\``);
        await queryRunner.query(`DROP INDEX \`IDX_b77ad0832a0f8ec526c1f40a84\` ON \`participants\``);
        await queryRunner.query(`DROP INDEX \`IDX_ac6356d2bb81151dcc2a5c239a\` ON \`participants\``);
        await queryRunner.query(`DROP INDEX \`IDX_1cda06c31eec1c95b3365a0283\` ON \`participants\``);
        await queryRunner.query(`DROP TABLE \`participants\``);
        await queryRunner.query(`DROP INDEX \`IDX_6eaa373335646a77e5cdddd996\` ON \`schools\``);
        await queryRunner.query(`DROP INDEX \`IDX_74a5374cf6d1c970dd47f888bf\` ON \`schools\``);
        await queryRunner.query(`DROP INDEX \`IDX_95b932e47ac129dd8e23a0db54\` ON \`schools\``);
        await queryRunner.query(`DROP TABLE \`schools\``);
        await queryRunner.query(`DROP INDEX \`IDX_4762ffb6e5d198cfec5606bc11\` ON \`cities\``);
        await queryRunner.query(`DROP TABLE \`cities\``);
        await queryRunner.query(`DROP INDEX \`IDX_6b8edc4fb44648164d0d1635c5\` ON \`subdistricts\``);
        await queryRunner.query(`DROP TABLE \`subdistricts\``);
        await queryRunner.query(`DROP INDEX \`IDX_4fcd12ed6a046276e2deb08801\` ON \`regions\``);
        await queryRunner.query(`DROP TABLE \`regions\``);
        await queryRunner.query(`DROP INDEX \`IDX_b9b5e6eb174ca5a8d9e5ed04d0\` ON \`provincies\``);
        await queryRunner.query(`DROP TABLE \`provincies\``);
    }

}
