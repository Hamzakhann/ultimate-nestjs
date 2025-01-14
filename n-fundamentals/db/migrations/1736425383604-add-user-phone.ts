import { MigrationInterface, QueryRunner } from "typeorm";

export class AddUserPhone1736425383604 implements MigrationInterface {
    name = 'AddUserPhone1736425383604'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

}
