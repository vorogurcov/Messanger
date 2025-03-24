import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { ProfileModule } from '../profile/profile.module';
import { EmailVerificationService } from './services/email-verification.service';
import { RedisModule } from '../redis/redis.module';
import { EmailSenderModule } from '../email-sender/email-sender.module';

@Module({
    imports: [
        JwtStrategyModule,
        TypeOrmModule.forFeature([UserAuth]),
        ProfileModule,
        RedisModule,
        EmailSenderModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserAuthRepository, EmailVerificationService],
})
export class AuthModule {}
