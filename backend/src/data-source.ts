import { DataSource } from 'typeorm';
import { UserAuth } from './auth/entities/user-auth.entity';
import { UserProfile } from './profile/entities/user-profile.entity';
import {UserProfileAndAuth1742557853253} from "./migration/schema/1742557853253-UserProfileAndAuth";
import {UserProfileAndAuthSeed1742557865532} from "./migration/seed/1742557865532-UserProfileAndAuthSeed";

export const AppDataSource = new DataSource({
    host: process.env.DB_HOST,
    type: process.env.DB_PROVIDER as 'postgres' | 'mongodb',
    port: Number(process.env.DB_PORT) ?? 5432,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    entities: [UserAuth, UserProfile],
    migrations: [UserProfileAndAuth1742557853253, UserProfileAndAuthSeed1742557865532]
});
