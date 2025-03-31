import { Module } from '@nestjs/common';
import { AuthModule } from './user/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ProfileModule } from './user/profile/profile.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        AuthModule,
        ProfileModule,
    ],
})
export class AppModule {}
