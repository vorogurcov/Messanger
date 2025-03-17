import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { UserAuth } from '../entities/user-auth.entity';
import { RegisterUserDto } from '../dto/register-user.dto';

@Injectable()
export class UserAuthRepository {
    constructor(
        @InjectRepository(UserAuth)
        private repository: Repository<UserAuth>,
    ) {}

    async saveUser(registerUserDto: RegisterUserDto) {
        try {
            const user = await this.repository.create(registerUserDto);
            await this.repository.save(user);
        } catch (error: any) {
            console.error('Can not save user!', error.message);
            throw error;
        }
    }
    async findUser(login: string) {
        try {
            const user = await this.repository.findOne({
                where: [
                    { email: login },
                    { login: login },
                    { phoneNumber: login },
                ],
            });
            return user;
        } catch (error: any) {
            console.error('Can not find user!', error.message);
            throw error;
        }
    }
}
