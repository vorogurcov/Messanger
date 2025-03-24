import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { UserAuth } from '../entities/user-auth.entity';
import { RegisterUserDto } from '../../auth/dto/register-user.dto';

// user-credentials.repository.ts — ЧИСТЫЙ data-access
@Injectable()
export class UserCredentialsRepository {
    constructor(
        @InjectRepository(UserAuth)
        private repository: Repository<UserAuth>,
    ) {}

    create(userData: Partial<UserAuth>) {
        return this.repository.create(userData);
    }

    save(user: UserAuth) {
        return this.repository.save(user);
    }

    findByLogin(login: string) {
        return this.repository.findOne({
            where: [
                { email: login },
                { login: login },
                { phoneNumber: login },
            ],
        });
    }

    findById(id: string, select?: (keyof UserAuth)[]) {
        return this.repository.findOne({
            where: { id },
            select: select,
        });
    }
}

