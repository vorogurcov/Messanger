import { Injectable } from '@nestjs/common';
import {ConfirmationDto} from '../dto/email-confirmation.dto';
import { RedisService } from '../../redis/redis.service';
@Injectable()
export class EmailVerificationService {
    constructor(private redisService: RedisService) {}

    async generateAndSaveCode(actionKey:string,userId: string): Promise<string> {
        const code = Math.floor(100000 + Math.random() * 900000).toString();
        await this.redisService.set(
            `${actionKey}_for_id:${userId}`,
            code,
            600,
        );
        return code;
    }

    async verifyCode(actionKey:string,
        confirmationDto: ConfirmationDto,
    ): Promise<boolean> {
        const { confirmationCode, userId } = confirmationDto;
        const storedCode = Number(
            await this.redisService.get(`${actionKey}_for_id:${userId}`),
        );
        if (storedCode === confirmationCode) {
            await this.redisService.del(`${actionKey}_for_id:${userId}`);
            return true;
        }
        return false;
    }
}
