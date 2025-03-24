import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppDataSource } from './data-source';
import { ProfileModule } from './profile/profile.module';

@Module({
    imports: [
        TypeOrmModule.forRoot(AppDataSource.options),
        AuthModule,
        ProfileModule,
    ],
})
export class AppModule {}
