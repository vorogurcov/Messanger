import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
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
            return user;
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

    async getIsEmailVerified(id) {
        try {
            const result = await this.repository.findOne({
                where: { id },
                select: ['isEmailVerified'],
            });
            return result?.isEmailVerified;
        } catch (error: any) {
            console.log('Can not get isEmailVerified!', error.message);
            throw error;
        }
    }
    async setIsEmailVerified(id: string, value: boolean) {
        try {
            const user = await this.repository.findOne({ where: { id } });
            if (!user) {
                throw new NotFoundException(`User with ID ${id} not found`);
            }

            user.isEmailVerified = value;
            await this.repository.save(user);
            return user;
        } catch (error: any) {
            console.log('Can not set isEmailVerified!', error.message);
            throw error;
        }
    }
}
