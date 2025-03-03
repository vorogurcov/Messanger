import {Injectable, UnauthorizedException} from "@nestjs/common";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {UserRepository} from "./repositories/user.repository";
import * as bcrypt from 'bcrypt'

@Injectable()
export class AuthService{
    constructor(private userRepository:UserRepository) {}
    async registerUser(registerUserDto:RegisterUserDto){
        try{
            const {password, ...otherUserData} = registerUserDto;

            const salt = await bcrypt.genSalt()
            const hashedPassword = await bcrypt.hash(password, salt);

            const userCredentials = {...otherUserData, password:hashedPassword};

            await this.userRepository.saveUser(userCredentials);
        }catch(error:any){
            throw error;
        }
    }

    async loginUser(loginUserDto:LoginUserDto){
        try{
            const {password, ...userData} = loginUserDto;

            const user = await this.userRepository.findUser(loginUserDto)
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }
            return userData;
        }catch(error:any){
            throw error;
        }
    }
}