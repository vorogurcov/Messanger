import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from '../credentials/entities/user-auth.entity';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { ProfileModule } from '../profile/profile.module';
import { RedisModule } from '../redis/redis.module';
import { EmailSenderModule } from '../email-sender/email-sender.module';
import { CredentialsModule } from '../credentials/credentials.module';

@Module({
    imports: [
        JwtStrategyModule,
        ProfileModule,
        RedisModule,
        EmailSenderModule,
        CredentialsModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule {}
