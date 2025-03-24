import { Module } from '@nestjs/common';
import { EmailSenderService } from './services/email-sender.service';
import {RedisModule} from "../redis/redis.module";

@Module({
    imports: [RedisModule],
    providers: [EmailSenderService],
    exports: [EmailSenderService],
})
export class EmailSenderModule {}
