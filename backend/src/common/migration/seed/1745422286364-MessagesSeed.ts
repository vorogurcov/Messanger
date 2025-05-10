import { MigrationInterface, QueryRunner } from 'typeorm';

export class MessagesSeed1745422286364 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "chat" ("id", "type", "name", "createdAt", "chatOwnerId")
            VALUES 
                ('d4e6f789-01ab-2cde-3f45-678901234567', 'private', 'Chat: Maria & Mihail', '2025-04-01 09:00:00', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('d7e6f789-01ab-2cde-3f45-678901234567', 'private', 'Chat: Maria & Kristina', '2025-04-01 09:05:00', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab');
        `);

        await queryRunner.query(`
            INSERT INTO "chat_users_user_profile" ("chatId", "userProfileId")
            VALUES
                ('d4e6f789-01ab-2cde-3f45-678901234567', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'), -- Maria
                ('d4e6f789-01ab-2cde-3f45-678901234567', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'), -- Mihail
                ('d7e6f789-01ab-2cde-3f45-678901234567', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'), -- Maria
                ('d7e6f789-01ab-2cde-3f45-678901234567', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c'); -- Kristina
        `);

        // Вставка сообщений
        await queryRunner.query(`
            INSERT INTO "message" ("id", "context", "senderId", "chatId", "createdAt") VALUES
            ('11111111-aaaa-bbbb-cccc-111111111111', 'Привет всем в чате API!', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'd4e6f789-01ab-2cde-3f45-678901234567', '2025-04-03 09:00:10'),
            ('22222222-aaaa-bbbb-cccc-222222222222', 'Я здесь!', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'd7e6f789-01ab-2cde-3f45-678901234567', '2025-04-03 09:01:00'),
            ('33333333-aaaa-bbbb-cccc-333333333333', 'Какой план на сегодня?', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'd4e6f789-01ab-2cde-3f45-678901234567', '2025-04-03 09:02:00'),
            ('44444444-aaaa-bbbb-cccc-444444444444', 'Дизайн финализирован', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'e6f78901-23ab-4cde-5f67-890123456789', '2025-04-03 10:00:00'),
            ('55555555-aaaa-bbbb-cccc-555555555555', 'Проверю позже', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'e6f78901-23ab-4cde-5f67-890123456789', '2025-04-03 10:10:00'),
            ('66666666-aaaa-bbbb-cccc-666666666666', 'Кристина, привет!', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', '2025-04-03 08:10:00'),
            ('77777777-aaaa-bbbb-cccc-777777777777', 'Ты тут?', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'f7890123-45ab-6cde-7f89-0123456789ab', '2025-04-03 14:00:00'),
            ('88888888-aaaa-bbbb-cccc-888888888888', 'Да, привет', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'f7890123-45ab-6cde-7f89-0123456789ab', '2025-04-03 14:05:00'),
            ('99999999-aaaa-bbbb-cccc-999999999999', 'Уже проверяю!', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-03 13:30:00'),
            ('aaaaaaaa-aaaa-bbbb-cccc-aaaaaaaaaaaa', 'Не забудьте отправить отчет', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-03 13:45:00'),
            ('bbbbbbbb-aaaa-bbbb-cccc-bbbbbbbbbbbb', 'Проверка связи', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'd4e6f789-01ab-2cde-3f45-678901234567', '2025-04-04 12:00:00'),
            ('cccccccc-aaaa-bbbb-cccc-cccccccccccc', 'Всё работает', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'd4e6f789-01ab-2cde-3f45-678901234567', '2025-04-04 12:01:00'),
            ('dddddddd-aaaa-bbbb-cccc-dddddddddddd', 'Созвон на 15:00', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'e6f78901-23ab-4cde-5f67-890123456789', '2025-04-04 11:00:00'),
            ('eeeeeeee-aaaa-bbbb-cccc-eeeeeeeeeeee', 'Готово!', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'f7890123-45ab-6cde-7f89-0123456789ab', '2025-04-04 15:00:00'),
            ('ffffffff-aaaa-bbbb-cccc-fffffffffffe', 'Обсудим позже', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'c33b16f4-8410-4693-9a9e-abc213ff8880', '2025-04-04 16:30:00'),
            ('11111111-bbbb-cccc-dddd-111111111111', 'Принято', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', '2025-04-05 09:00:00'),
            ('22222222-bbbb-cccc-dddd-222222222222', 'Начинаем?', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111', '2025-04-05 09:10:00');
        `);

        await queryRunner.query(`
            UPDATE "chat" SET "lastMessageId" = 'cccccccc-aaaa-bbbb-cccc-cccccccccccc' WHERE "id" = 'd4e6f789-01ab-2cde-3f45-678901234567';
            UPDATE "chat" SET "lastMessageId" = 'dddddddd-aaaa-bbbb-cccc-dddddddddddd' WHERE "id" = 'e6f78901-23ab-4cde-5f67-890123456789';
            UPDATE "chat" SET "lastMessageId" = '22222222-bbbb-cccc-dddd-222222222222' WHERE "id" = 'a1e229c2-dad0-4ab3-9b6a-5f33ffb2f111';
            UPDATE "chat" SET "lastMessageId" = 'eeeeeeee-aaaa-bbbb-cccc-eeeeeeeeeeee' WHERE "id" = 'f7890123-45ab-6cde-7f89-0123456789ab';
            UPDATE "chat" SET "lastMessageId" = 'ffffffff-aaaa-bbbb-cccc-fffffffffffe' WHERE "id" = 'c33b16f4-8410-4693-9a9e-abc213ff8880';
            UPDATE "chat" SET "lastMessageId" = '22222222-aaaa-bbbb-cccc-222222222222' WHERE "id" = 'd7e6f789-01ab-2cde-3f45-678901234567';

        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "message" WHERE "id" IN (
                '11111111-aaaa-bbbb-cccc-111111111111',
                '22222222-aaaa-bbbb-cccc-222222222222',
                '33333333-aaaa-bbbb-cccc-333333333333',
                '44444444-aaaa-bbbb-cccc-444444444444',
                '55555555-aaaa-bbbb-cccc-555555555555',
                '66666666-aaaa-bbbb-cccc-666666666666',
                '77777777-aaaa-bbbb-cccc-777777777777',
                '88888888-aaaa-bbbb-cccc-888888888888',
                '99999999-aaaa-bbbb-cccc-999999999999',
                'aaaaaaaa-aaaa-bbbb-cccc-aaaaaaaaaaaa',
                'bbbbbbbb-aaaa-bbbb-cccc-bbbbbbbbbbbb',
                'cccccccc-aaaa-bbbb-cccc-cccccccccccc',
                'dddddddd-aaaa-bbbb-cccc-dddddddddddd',
                'eeeeeeee-aaaa-bbbb-cccc-eeeeeeeeeeee',
                'ffffffff-aaaa-bbbb-cccc-fffffffffffe',
                '11111111-bbbb-cccc-dddd-111111111111',
                '22222222-bbbb-cccc-dddd-222222222222'
            );
        `);
        for (const chatId of [
            'd4e6f789-01ab-2cde-3f45-678901234567',
            'd7e6f789-01ab-2cde-3f45-678901234567',
        ]) {
            await queryRunner.query(
                `DELETE FROM "chat_users_user" WHERE "chatId" = '${chatId}'`,
            );
            await queryRunner.query(
                `DELETE FROM "chat" WHERE "id" = '${chatId}'`,
            );
        }
    }
}
