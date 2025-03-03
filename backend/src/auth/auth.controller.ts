import {
    Controller,
    Post,
    Body,
    ConflictException,
    UnauthorizedException,
    HttpStatus,
    InternalServerErrorException
} from "@nestjs/common";
import {RegisterUserDto} from "./dto/register-user.dto";
import {LoginUserDto} from "./dto/login-user.dto";
import {AuthService} from "./auth.service";

@Controller('auth')
export class AuthController{
    constructor(private authService:AuthService){}
    @Post('register')
    async registerUser(@Body() registerUserDto:RegisterUserDto){
        try{
            await this.authService.registerUser(registerUserDto)
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully'
            };
        }catch(error){
            throw new ConflictException('User already exists!');
        }
    }
    @Post('login')
    async loginUser(@Body() loginUserDto:LoginUserDto){
        try{
            const user = await this.authService.loginUser(loginUserDto)
            return {
                statusCode: HttpStatus.OK,
                message: 'Login successful',
                user
            };
        }catch(error){
            if(error instanceof UnauthorizedException)
                throw error;
            throw new InternalServerErrorException()
        }

    }
}