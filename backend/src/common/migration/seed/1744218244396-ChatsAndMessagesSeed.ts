import { MigrationInterface, QueryRunner } from "typeorm";

export class ChatsAndMessagesSeed1744218244396 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        // 1. Чаты
        await queryRunner.query(`
            INSERT INTO "chat" ("id", "type", "name", "createdAt", "chatOwnerId")
            VALUES 
                ('a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', 'private', 'Chat: Maria & Kristina', '2025-04-01 12:00:00', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'group', 'Dev Team Chat', '2025-04-02 15:30:00', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7');
        `);

        // 2. Привязка пользователей к чатам (ManyToMany)
        await queryRunner.query(`
            INSERT INTO "chat_users_user_profile" ("chatId", "userProfileId")
            VALUES
                ('a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'), -- Maria
                ('a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'), -- Kristina
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'), -- Maria
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'), -- Mihail
                ('c33b16f4-8410-4693-9a9e-abc213ff8880', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'); -- Kristina
        `);

        // 3. Сообщения
        await queryRunner.query(`
            INSERT INTO "message" ("id", "context", "senderId", "chatId", "createdAt")
            VALUES
                ('ab91b13b-01c0-4a49-b6b9-bd4563bce001', 'Привет, Кристина!', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', '2025-04-01 12:01:00'),
                ('fdc27815-267a-4326-9ff3-63f80b24d002', 'Привет, Мария! Как дела?', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', '2025-04-01 12:02:00'),

                ('68c25b00-0418-4ef2-a49a-90b9b2743903', 'Привет, команда!', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-02 15:31:00'),
                ('11358e06-0cd7-4d21-88d6-d08d8bcb5c00', 'Хай! Начнём работу.', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-02 15:32:00'),
                ('f01be84d-446b-44fc-bffe-0104b3dd9224', 'Готова к обсуждению задач.', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-02 15:33:00');
        `);

        // 4. Проставим lastMessage в чаты
        await queryRunner.query(`
            UPDATE "chat"
            SET "lastMessageId" = 'fdc27815-267a-4326-9ff3-63f80b24d002'
            WHERE "id" = 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111';
        `);
        await queryRunner.query(`
            UPDATE "chat"
            SET "lastMessageId" = 'f01be84d-446b-44fc-bffe-0104b3dd9224'
            WHERE "id" = 'c33b16f4-8410-4693-9a9e-abc213ff8880';
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "message" WHERE "id" IN (
                'ab91b13b-01c0-4a49-b6b9-bd4563bce001',
                'fdc27815-267a-4326-9ff3-63f80b24d002',
                '68c25b00-0418-4ef2-a49a-90b9b2743903',
                '11358e06-0cd7-4d21-88d6-d08d8bcb5c00',
                'f01be84d-446b-44fc-bffe-0104b3dd9224'
            );
        `);

        await queryRunner.query(`
            DELETE FROM "chat_users_user_profile" WHERE "chatId" IN (
                'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111',
                'c33b16f4-8410-4693-9a9e-abc213ff8880'
            );
        `);

        await queryRunner.query(`
            DELETE FROM "chat" WHERE "id" IN (
                'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111',
                'c33b16f4-8410-4693-9a9e-abc213ff8880'
            );
        `);
    }

}

