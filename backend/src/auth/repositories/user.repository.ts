import {InjectRepository} from "@nestjs/typeorm";
import {Repository} from "typeorm";
import {Injectable} from '@nestjs/common'
import {User} from '../entities/user.entity'
import {RegisterUserDto} from "../dto/register-user.dto";

@Injectable()
export class UserRepository{
    constructor(
        @InjectRepository(User)
        private repository:Repository<User>
    ){}

    async createUser(registerUserDto:RegisterUserDto){
        const user = await this.repository.create(registerUserDto)
        await this.repository.save(user)
    }
}