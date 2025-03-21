import { MigrationInterface, QueryRunner } from "typeorm";

export class UserProfileAndAuthSeed1742557865532 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            INSERT INTO "user_auth" ("id", "login", "phoneNumber", "email", "password", "isEmailVerified") VALUES
                ('e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'Maria', '79110000000', 'maria@example.com', '$2b$10$4xO3KTlVflQyM39O6lm9.uI.KmpmJByWZ9wlNhnjCkKhg7Z1rmIvu', true),
                ('8f729c1f-13bf-4096-9e30-fcb87d79fa0f', 'Ivan', '79000000007', 'ivan@example.com', '$2b$10$2ChIfTpTGLC5MXeb7qtUTuuS5tUQtASAgA4Z0enlrK1Gh3ZEgKIg.', false),
                ('bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'Mihail', '79117777777', 'mihail@example.com', '$2b$10$Cx2PfUyy86ORpb2LyCkay.9r5vatF9vc5Qs6E7CrKwI7k3ydV6.LK', true),
                ('f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'Kristina', '79999999999', 'kristina@example.com', '$2b$10$JVMigUgvE/9vkb76wkQtneRK7AsV0FN18fWoJnD3ywPhsHDT1K0nK', true),
                ('9d573529-5b9c-438d-9991-fd16160f951a', 'Ilya', '78988988888', 'ilya@example.com', '$2b$10$GzWIvKvxAHfZBKy5z3KZ9u0p7c2tTeDNZyGf.e3zGjGdqgDXfRrO.', false)
        `);

        await queryRunner.query(`
            INSERT INTO "user_profile" ("id", "userName", "birthDate", "avatarUrl", "bio", "isOnline", "lastSeen", "userAuthId") VALUES
                ('e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 'Maria', '1990-03-15', 'https://res.cloudinary.com/ddjwyfugk/image/upload/v1742544771/avatars/e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab.jpg', 'Programmer from Saint-Petersburg', true, '2025-03-21 10:00:00', 'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab'),
                ('bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 'Mihail', '1992-11-10', 'https://res.cloudinary.com/ddjwyfugk/image/upload/v1742544606/avatars/bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7.jpg', 'Software developer and gamer', true, '2025-03-21 11:30:00', 'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7'),
                ('f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 'Kristina', '1995-01-17', 'https://res.cloudinary.com/ddjwyfugk/image/upload/v1742544772/avatars/f647dfe1-85fc-4be1-bff2-ff42d7b89c6c.avif', 'Designer from St. Petersburg', true, '2025-03-21 09:45:00', 'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c')
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DELETE FROM "user_profile" WHERE "userAuthId" IN (
                '28c812e8-a30f-4239-8332-d15c2312dbbc', 
                '8f729c1f-13bf-4096-9e30-fcb87d79fa0f', 
                '053aec50-cc59-4aa0-b778-5cd38b6bbc30', 
                '925b0c68-2596-4f29-b4d3-fdd086fa78b6', 
                '9d573529-5b9c-438d-9991-fd16160f951a'
            )
        `);

        await queryRunner.query(`
            DELETE FROM "user_auth" WHERE "id" IN (
                'e2c9d52e-c4ad-4b7d-a0f7-c4d5b3240eab', 
                '8f729c1f-13bf-4096-9e30-fcb87d79fa0f', 
                'bf77f5e4-8589-4a1f-96ec-53b1f0bb10f7', 
                'f647dfe1-85fc-4be1-bff2-ff42d7b89c6c', 
                '9d573529-5b9c-438d-9991-fd16160f951a'
            )
        `);
    }

}
