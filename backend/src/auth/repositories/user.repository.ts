import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '../entities/user.entity';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';

@Injectable()
export class UserRepository {
    constructor(
        @InjectRepository(User)
        private repository: Repository<User>,
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
