import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatGroups1745410568577 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "chat_group" (
                "id" uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
                "name" varchar(64) NOT NULL,
                "groupOwnerId" uuid NOT NULL
            );
        `);

        await queryRunner.query(`
            CREATE TABLE "chat_group_chat_group" (
                "chatId" uuid NOT NULL,
                "chatGroupId" uuid NOT NULL,
                PRIMARY KEY ("chatId", "chatGroupId")
            );
        `);

        await queryRunner.query(`
            ALTER TABLE "chat_group"
            ADD CONSTRAINT "FK_group_owner" FOREIGN KEY ("groupOwnerId")
            REFERENCES "user_profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "chat_group_chat_group"
            ADD CONSTRAINT "FK_chat" FOREIGN KEY ("chatId")
            REFERENCES "chat"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);

        await queryRunner.query(`
            ALTER TABLE "chat_group_chat_group"
            ADD CONSTRAINT "FK_chat_group" FOREIGN KEY ("chatGroupId")
            REFERENCES "chat_group"("id") ON DELETE CASCADE ON UPDATE CASCADE;
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `ALTER TABLE "chat_group_chat_group" DROP CONSTRAINT "FK_chat_group";`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_group_chat_group" DROP CONSTRAINT "FK_chat";`,
        );
        await queryRunner.query(
            `ALTER TABLE "chat_group" DROP CONSTRAINT "FK_group_owner";`,
        );
        await queryRunner.query(`DROP TABLE "chat_group_chat_group";`);
        await queryRunner.query(`DROP TABLE "chat_group";`);
    }
}
