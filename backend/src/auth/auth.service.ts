import {Injectable, UnauthorizedException} from "@nestjs/common";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {UserRepository} from "./repositories/user.repository";
import * as bcrypt from 'bcrypt'
import {JwtService} from "@nestjs/jwt";
import {JwtPayloadDto} from "./dto/jwt-payload.dto";

@Injectable()
export class AuthService{
    constructor(private userRepository:UserRepository,
                private jwtService:JwtService
    ) {}
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
            const {password,login, ...other} = loginUserDto;

            const user = await this.userRepository.findUser(login)
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }
            const userData:JwtPayloadDto = {id:user.id, login:user.login}

            const accessToken = await this.jwtService.signAsync(userData,{
                expiresIn:'15m'
            })
            const refreshToken = await this.jwtService.signAsync(userData,
                {
                    secret:process.env.JWT_REFRESH_SECRET_KEY,
                    expiresIn:'10080m'
                })
            return {...userData, accessToken, refreshToken};
        }catch(error:any){
            throw error;
        }
    }
}