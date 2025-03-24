import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';
@Injectable()
export class RedisService {
    private client: Redis;
    onModuleInit() {
        this.client = new Redis({
            host: process.env.REDIS_HOST ?? 'localhost',
            port: Number(process.env.REDIS_PORT ?? 6379),
        });
    }

    onModuleDestroy() {
        this.client.quit();
    }

    async get(key: string) {
        return await this.client.get(key);
    }

    async set(key: string, value: string, ttl?: number) {
        if (ttl) {
            await this.client.set(key, value, 'EX', ttl);
        } else {
            await this.client.set(key, value);
        }
    }

    async del(key: string) {
        return await this.client.del(key);
    }
}
