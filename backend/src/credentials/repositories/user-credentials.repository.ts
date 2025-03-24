import { InjectRepository } from '@nestjs/typeorm';
import { Repository} from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAuth } from '../entities/user-auth.entity';
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

