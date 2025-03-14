import { DataSource } from 'typeorm';
import { User } from './auth/entities/user.entity';
import { DemoSeedData1741590764743 } from './migration/seed/1741590764743-DemoSeedData';
import { OnlyUser1741590422065 } from './migration/schema/1741590422065-OnlyUser';

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    type: process.env.DB_PROVIDER as 'postgres' | 'mongodb',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [User],
    migrations: [OnlyUser1741590422065, DemoSeedData1741590764743],
});
