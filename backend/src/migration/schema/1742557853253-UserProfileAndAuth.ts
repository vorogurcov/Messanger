import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileAndAuth1742557853253 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "user_auth" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "login" character varying NOT NULL, 
                "phoneNumber" character(11), 
                "email" character varying(254) NOT NULL, 
                "password" text NOT NULL, 
                "isEmailVerified" boolean NOT NULL DEFAULT false, 
                CONSTRAINT "PK_1d0bfb9c0da7e5fcf8f57162b2f" PRIMARY KEY ("id"),
                CONSTRAINT "UQ_2e3c7d70680e317a4fe5722f84b" UNIQUE ("login"), 
                CONSTRAINT "UQ_eb9db0a798a0637470a5f820d97" UNIQUE ("phoneNumber"), 
                CONSTRAINT "UQ_313d74f6d869debc05277528f34" UNIQUE ("email")
            )
        `);

        await queryRunner.query(`
            CREATE TABLE "user_profile" (
                "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
                "userName" text NOT NULL, 
                "birthDate" date,
                "avatarUrl" character varying(255),
                "bio" text NOT NULL DEFAULT 'Programmer from Saint-Petersburg',
                "isOnline" boolean NOT NULL DEFAULT false,
                "lastSeen" timestamp,
                "userAuthId" uuid,
                CONSTRAINT "PK_a0989c2d855f3d9b3349d62307e" PRIMARY KEY ("id"),
                CONSTRAINT "FK_cbd4cbf67eaffb12ab1d879d9cd" FOREIGN KEY ("userAuthId") REFERENCES "user_auth"("id") ON DELETE CASCADE
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "user_profile"`);

        await queryRunner.query(`DROP TABLE "user_auth"`);
    }

}
