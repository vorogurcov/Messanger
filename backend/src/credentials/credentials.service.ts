import {Injectable, NotFoundException} from "@nestjs/common";
import {RegisterUserDto} from "../auth/dto/register-user.dto";
import {UserCredentialsRepository} from "./repositories/user-credentials.repository";
import {UpdateCredentialsDto} from "../profile/dto/update-credentials.dto";
import * as bcrypt from 'bcrypt'

@Injectable()
export class CredentialsService {
    constructor(private readonly repo: UserCredentialsRepository) {}

    async register(dto: RegisterUserDto) {
        const user = this.repo.create(dto);
        return this.repo.save(user);
    }

    async findUserByLogin(login: string) {
        return this.repo.findByLogin(login);
    }

    async getIsEmailVerified(id: string): Promise<boolean> {
        const user = await this.repo.findById(id, ['isEmailVerified']);
        return user?.isEmailVerified as boolean;
    }

    async setIsEmailVerified(id: string, value: boolean) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        user.isEmailVerified = value;
        return this.repo.save(user);
    }

    async updateCredentials(id: string, updateCredentialsDto:UpdateCredentialsDto ) {
        const user = await this.repo.findById(id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }


        if (updateCredentialsDto.email) {
            user.email = updateCredentialsDto.email;
            user.isEmailVerified = false
        }

        if (updateCredentialsDto.password) {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(updateCredentialsDto.password, saltRounds);
            user.password = hashedPassword;
        }



        return this.repo.save(user);
    }
}
