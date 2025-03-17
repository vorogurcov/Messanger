import {
    Controller,
    Post,
    Body,
    ConflictException,
    UnauthorizedException,
    HttpStatus,
    InternalServerErrorException,
    Res,
    UseGuards,
    Req,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from './entities/user-auth.entity';
import * as process from 'process';
@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        try {
            await this.authService.registerUser(registerUserDto);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully',
            };
        } catch (error) {
            throw new ConflictException('User already exists!');
        }
    }
    @Post('login')
    async loginUser(
        @Body() loginUserDto: LoginUserDto,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const { accessToken, refreshToken, ...user } =
                await this.authService.loginUser(loginUserDto);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });

            return {
                statusCode: HttpStatus.OK,
                message: 'Login successful',
                user,
                accessToken,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException();
        }
    }

    @Post('refresh')
    @UseGuards(AuthGuard('jwt-refresh'))
    async refreshToken(
        @Req() req: Request,
        @Res({ passthrough: true }) res: Response,
    ) {
        try {
            const { accessToken, refreshToken, ...user } =
                await this.authService.refreshToken(req.user as UserAuth);

            res.cookie('refreshToken', refreshToken, {
                httpOnly: true,
                secure: true,
                maxAge: 7 * 24 * 60 * 60 * 1000,
                sameSite: 'strict',
            });

            return {
                statusCode: HttpStatus.OK,
                message: 'Refresh token successful',
                user,
                accessToken,
            };
        } catch (error) {
            if (error instanceof UnauthorizedException) throw error;
            throw new InternalServerErrorException();
        }
    }
}
