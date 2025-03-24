import {Injectable, NotFoundException} from "@nestjs/common";
import {RegisterUserDto} from "../auth/dto/register-user.dto";
import {UserCredentialsRepository} from "./repositories/user-credentials.repository";

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
}
