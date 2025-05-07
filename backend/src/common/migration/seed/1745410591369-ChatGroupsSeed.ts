import { MigrationInterface, QueryRunner } from 'typeorm';

export class ChatGroupsSeed1745410591369 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "chat_group" ("id", "name", "groupOwnerId")
            VALUES 
                ('d4e5f678-90ab-4cde-8ef1-234567890123', 'Рабочая группа', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'),
                ('a1b2c3d4-5678-90ef-1234-567890abcdef', 'Личные чаты', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('b2c3d4e5-6789-01f2-3456-789abcdef012', 'Проект X', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'),
                ('c3d4e5f6-7890-12f3-4567-89abcdef0123', 'Команда разработки', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7');
        `);

        await queryRunner.query(`
            INSERT INTO "chat" ("id", "type", "name", "createdAt", "chatOwnerId")
            VALUES
                ('d5e6f789-01ab-2cde-3f45-678901234567', 'group', 'Обсуждение API', '2025-04-03 09:00:00', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'),
                ('e6f78901-23ab-4cde-5f67-890123456789', 'group', 'Дизайн интерфейса', '2025-04-03 10:30:00', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'),
                ('f7890123-45ab-6cde-7f89-0123456789ab', 'private', 'Чат с Ильей', '2025-04-04 14:15:00', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab');
        `);

        await queryRunner.query(`
            INSERT INTO "chat_users_user_profile" ("chatId", "userProfileId")
            VALUES
                ('d5e6f789-01ab-2cde-3f45-678901234567', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'),
                ('d5e6f789-01ab-2cde-3f45-678901234567', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('e6f78901-23ab-4cde-5f67-890123456789', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'),
                ('e6f78901-23ab-4cde-5f67-890123456789', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'),
                ('f7890123-45ab-6cde-7f89-0123456789ab', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('f7890123-45ab-6cde-7f89-0123456789ab', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c');
        `);

        await queryRunner.query(`
            INSERT INTO "chat_group_chat_group" ("chatId", "chatGroupId")
            VALUES
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'd4e5f678-90ab-4cde-8ef1-234567890123'),
                ('d5e6f789-01ab-2cde-3f45-678901234567', 'd4e5f678-90ab-4cde-8ef1-234567890123'),
                ('a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', 'a1b2c3d4-5678-90ef-1234-567890abcdef'),
                ('f7890123-45ab-6cde-7f89-0123456789ab', 'a1b2c3d4-5678-90ef-1234-567890abcdef'),
                ('e6f78901-23ab-4cde-5f67-890123456789', 'b2c3d4e5-6789-01f2-3456-789abcdef012'),
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'c3d4e5f6-7890-12f3-4567-89abcdef0123'),
                ('d5e6f789-01ab-2cde-3f45-678901234567', 'c3d4e5f6-7890-12f3-4567-89abcdef0123');
        `);

        await queryRunner.query(`
            INSERT INTO "message" ("id", "context", "senderId", "chatId", "createdAt")
            VALUES
                ('a1b2c3d4-5678-90ef-1234-567890abcdef', 'Когда будем делать ревью API?', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'd5e6f789-01ab-2cde-3f45-678901234567', '2025-04-03 09:05:00'),
                ('b2c3d4e5-6789-01f2-3456-789abcdef012', 'Давайте в четверг', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'd5e6f789-01ab-2cde-3f45-678901234567', '2025-04-03 09:10:00'),
                ('c3d4e5f6-7890-12f3-4567-89abcdef0123', 'Посмотрите новый дизайн', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'e6f78901-23ab-4cde-5f67-890123456789', '2025-04-03 10:35:00');
        `);

        await queryRunner.query(`
            UPDATE "chat" SET "lastMessageId" = 'b2c3d4e5-6789-01f2-3456-789abcdef012' WHERE "id" = 'd5e6f789-01ab-2cde-3f45-678901234567';
            UPDATE "chat" SET "lastMessageId" = 'c3d4e5f6-7890-12f3-4567-89abcdef0123' WHERE "id" = 'e6f78901-23ab-4cde-5f67-890123456789';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "message" WHERE "chatId" IN (
                'd5e6f789-01ab-2cde-3f45-678901234567',
                'e6f78901-23ab-4cde-5f67-890123456789'
            );
        `);

        await queryRunner.query(`DELETE FROM "chat_group_chat_group";`);

        await queryRunner.query(`
            DELETE FROM "chat_users_user_profile" WHERE "chatId" IN (
                'd5e6f789-01ab-2cde-3f45-678901234567',
                'e6f78901-23ab-4cde-5f67-890123456789',
                'f7890123-45ab-6cde-7f89-0123456789ab'
            );
        `);

        await queryRunner.query(`
            DELETE FROM "chat" WHERE "id" IN (
                'd5e6f789-01ab-2cde-3f45-678901234567',
                'e6f78901-23ab-4cde-5f67-890123456789',
                'f7890123-45ab-6cde-7f89-0123456789ab'
            );
        `);

        await queryRunner.query(`DELETE FROM "chat_group";`);
    }
}
