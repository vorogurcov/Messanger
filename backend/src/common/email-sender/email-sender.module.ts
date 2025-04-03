import { Module } from '@nestjs/common';
import { EmailSenderService } from './services/email-sender.service';
import { RedisModule } from '../redis/redis.module';
import { EmailVerificationService } from './services/email-verification.service';

@Module({
    imports: [RedisModule],
    providers: [EmailSenderService, EmailVerificationService],
    exports: [EmailSenderService, EmailVerificationService],
})
export class EmailSenderModule {}
