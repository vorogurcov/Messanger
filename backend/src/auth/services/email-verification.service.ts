// email-verification.service.ts
import { Injectable } from '@nestjs/common';
import {} from 'crypto';
import { EmailConfirmationDto } from '../dto/email-confirmation.dto';
import { RedisService } from '../../redis/redis.service';
@Injectable()
export class EmailVerificationService {
    constructor(private redisService: RedisService) {}

    async generateAndSaveCode(userId: string): Promise<string> {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await this.redisService.set(
            `email_verification_for_id:${userId}`,
            code,
            600,
        );
        return code;
    }

    async verifyCode(
        emailConfirmationDto: EmailConfirmationDto,
    ): Promise<boolean> {
        const { confirmationCode, userId } = emailConfirmationDto;
        const storedCode = Number(
            await this.redisService.get(`email_verification_for_id:${userId}`),
        );
        if (storedCode === confirmationCode) {
            await this.redisService.del(`email_verification_for_id:${userId}`);
            return true;
        }
        return false;
    }
}
