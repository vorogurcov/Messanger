import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnlyUser1741590422065 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
      CREATE TABLE "user" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "login" character varying NOT NULL, 
        "phoneNumber" character(11) NOT NULL, 
        "email" character varying(254), 
        "password" text NOT NULL, 
        "avatarUrl" character varying(255), 
        CONSTRAINT "PK_1d0bfb9c0da7e5fcf8f57162b2f" PRIMARY KEY ("id"),
        CONSTRAINT "UQ_2e3c7d70680e317a4fe5722f84b" UNIQUE ("login"), 
        CONSTRAINT "UQ_eb9db0a798a0637470a5f820d97" UNIQUE ("phoneNumber"), 
        CONSTRAINT "UQ_313d74f6d869debc05277528f34" UNIQUE ("email") 
      )
    `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user"`);
    }
}
