import { MigrationInterface, QueryRunner } from 'typeorm';

export class OnlyUserSeed1741590764743 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          INSERT INTO "user" ("id", "login", "phoneNumber",  "password" ) VALUES
            ('28c812e8-a30f-4239-8332-d15c2312dbbc', 'Maria', '79110000000', '$2b$10$4xO3KTlVflQyM39O6lm9.uI.KmpmJByWZ9wlNhnjCkKhg7Z1rmIvu'),
            ('8f729c1f-13bf-4096-9e30-fcb87d79fa0f', 'Ivan', '79000000007',  '$2b$10$2ChIfTpTGLC5MXeb7qtUTuuS5tUQtASAgA4Z0enlrK1Gh3ZEgKIg.'),
            ('053aec50-cc59-4aa0-b778-5cd38b6bbc30', 'Mihail', '79117777777',  '$2b$10$Cx2PfUyy86ORpb2LyCkay.9r5vatF9vc5Qs6E7CrKwI7k3ydV6.LK'),
            ('925b0c68-2596-4f29-b4d3-fdd086fa78b6', 'Kristina', '79999999999',  '$2b$10$JVMigUgvE/9vkb76wkQtneRK7AsV0FN18fWoJnD3ywPhsHDT1K0nK'),
            ('9d573529-5b9c-438d-9991-fd16160f951a', 'Ilya', '78988988888',  '$2b$10$GzWIvKvxAHfZBKy5z3KZ9u0p7c2tTeDNZyGf.e3zGjGdqgDXfRrO.')  
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
          DELETE FROM "user" WHERE "id" IN (
            '28c812e8-a30f-4239-8332-d15c2312dbbc', 
            '8f729c1f-13bf-4096-9e30-fcb87d79fa0f', 
            '053aec50-cc59-4aa0-b778-5cd38b6bbc30', 
            '925b0c68-2596-4f29-b4d3-fdd086fa78b6', 
            '9d573529-5b9c-438d-9991-fd16160f951a'
          )
        `);
    }
}
