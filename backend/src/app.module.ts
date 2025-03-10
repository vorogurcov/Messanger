import { Module } from '@nestjs/common';
import {AuthModule} from "./auth/auth.module";
import {TypeOrmModule} from "@nestjs/typeorm";
import {AppDataSource} from "./data-source";


@Module({
  imports: [TypeOrmModule.forRoot(AppDataSource.options),
    AuthModule],
})
export class AppModule {}
