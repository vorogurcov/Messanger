import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './services/auth.service';
import { JwtStrategyModule } from '../../common/jwt-strategy/jwt-strategy.module';
import { ProfileModule } from '../profile/profile.module';
import { RedisModule } from '../../common/redis/redis.module';
import { EmailSenderModule } from '../../common/email-sender/email-sender.module';
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
