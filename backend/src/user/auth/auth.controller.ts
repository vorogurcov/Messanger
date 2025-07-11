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
    BadRequestException,
    ForbiddenException,
} from '@nestjs/common';
import { RegisterUserDto } from './dto/register-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { AuthService } from './services/auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { UserAuth } from '../credentials/entities/user-auth.entity';
import { ConfirmationDto } from '../../common/email-sender/dto/email-confirmation.dto';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('register')
    async registerUser(@Body() registerUserDto: RegisterUserDto) {
        try {
            const user = await this.authService.registerUser(registerUserDto);
            return {
                statusCode: HttpStatus.CREATED,
                message: 'Waiting for verification',
                isEmailVerified: false,
                user,
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
            if (error instanceof ForbiddenException) throw error;
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

    @Post('verify')
    async confirmEmail(@Body() emailConfirmationDto: ConfirmationDto) {
        try {
            await this.authService.confirmEmail(emailConfirmationDto);
            return {
                statusCode: HttpStatus.OK,
                message: 'Email verification successful',
                isEmailVerified: true,
            };
        } catch (error) {
            if (error instanceof BadRequestException) {
                throw new BadRequestException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: error.message,
                    isEmailVerified: false,
                });
            }
            throw new InternalServerErrorException({
                statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
                message: 'Something went wrong!',
                isEmailVerified: false,
            });
        }
    }
}
