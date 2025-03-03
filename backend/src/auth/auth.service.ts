import {Injectable, UnauthorizedException} from "@nestjs/common";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {UserRepository} from "./repositories/user.repository";
@Injectable()
export class AuthService{
    constructor(private userRepository:UserRepository) {}
    async registerUser(registerUserDto:RegisterUserDto){
        try{
            await this.userRepository.saveUser(registerUserDto);
        }catch(error:any){
            throw error;
        }
    }

    async loginUser(loginUserDto:LoginUserDto){
        try{
            const user = await this.userRepository.findUser(loginUserDto)
            if (!user) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const {password, ...userData} = user
            return userData;
        }catch(error:any){
            throw error;
        }
    }
}