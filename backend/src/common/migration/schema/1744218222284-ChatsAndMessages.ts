import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatsAndMessages1744218222284 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "chat" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "type" varchar(16) NOT NULL,
                "name" varchar(64) NOT NULL,
                "createdAt" TIMESTAMP NOT NULL,
                "chatOwnerId" uuid,
                "lastMessageId" uuid
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "message" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "context" text NOT NULL,
                "senderId" uuid NOT NULL,
                "chatId" uuid NOT NULL,
                "createdAt" TIMESTAMP NOT NULL DEFAULT now()
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "chat_users_user_profile" (
                "chatId" uuid NOT NULL,
                "userProfileId" uuid NOT NULL,
                PRIMARY KEY ("chatId", "userProfileId")
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "chat"
            ADD CONSTRAINT "FK_chat_owner" FOREIGN KEY ("chatOwnerId")
            REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "chat"
            ADD CONSTRAINT "FK_last_message" FOREIGN KEY ("lastMessageId")
            REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_sender" FOREIGN KEY ("senderId")
            REFERENCES "user_profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "message"
            ADD CONSTRAINT "FK_chat" FOREIGN KEY ("chatId")
            REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
        `);

        await queryRunner.query(`
            ALTER TABLE "chat_users_user_profile"
            ADD CONSTRAINT "FK_chat_users_chat" FOREIGN KEY ("chatId")
            REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "chat_users_user_profile"
            ADD CONSTRAINT "FK_chat_users_user" FOREIGN KEY ("userProfileId")
            REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "chat_users_user_profile" DROP CONSTRAINT "FK_chat_users_user";`);
        await queryRunner.query(`ALTER TABLE "chat_users_user_profile" DROP CONSTRAINT "FK_chat_users_chat";`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_chat";`);
        await queryRunner.query(`ALTER TABLE "message" DROP CONSTRAINT "FK_sender";`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_last_message";`);
        await queryRunner.query(`ALTER TABLE "chat" DROP CONSTRAINT "FK_chat_owner";`);
        await queryRunner.query(`DROP TABLE "chat_users_user_profile";`);
        await queryRunner.query(`DROP TABLE "message";`);
        await queryRunner.query(`DROP TABLE "chat";`);
    }

}

