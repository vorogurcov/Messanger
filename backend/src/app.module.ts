import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {User} from "./auth/entities/user.entity";


@Module({
  imports: [TypeOrmModule.forRoot({
    host:process.env.DB_HOST ?? 'localhost',
    type:process.env.DB_PROVIDER as ('postgres' | 'mongodb'),
    port:Number(process.env.DB_PORT) ?? 5432,
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_NAME,
    synchronize:true,
    entities:[User]
  }),
    AuthModule],
})
export class AppModule {}
