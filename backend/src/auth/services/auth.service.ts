import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserAuthRepository } from '../repositories/user-auth.repository';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UserAuth } from '../entities/user-auth.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationService } from './email-verification.service';
import { EmailConfirmationDto } from '../dto/email-confirmation.dto';
import { ProfileService } from '../../profile/profile.service';
import {EmailSenderService} from "../../email-sender/email-sender.service";

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserAuthRepository,
        private jwtService: JwtService,
        private emailVerificationService: EmailVerificationService,
        private profileService: ProfileService,
        private emailSenderService:EmailSenderService,
    ) {}
    async registerUser(registerUserDto: RegisterUserDto) {
        try {
            const { password, ...otherUserData } = registerUserDto;

            const salt = await bcrypt.genSalt();
            const hashedPassword = await bcrypt.hash(password, salt);

            const userCredentials = {
                ...otherUserData,
                password: hashedPassword,
            };

            const { id, email, login } =
                await this.userRepository.saveUser(userCredentials);
            const verificationCode =
                await this.emailVerificationService.generateAndSaveCode(id);
            await this.emailSenderService.sendConfirmationEmail(email, login, verificationCode)
        } catch (error: any) {
            throw error;
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        try {
            const { password, login, ...other } = loginUserDto;

            const user = await this.userRepository.findUser(login);
            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }

            if (
                !user ||
                !(await this.userRepository.getIsEmailVerified(user.id))
            ) {
                const { id, email, login } = user;
                const verificationCode =
                    await this.emailVerificationService.generateAndSaveCode(id);
                await this.emailSenderService.sendConfirmationEmail(email, login, verificationCode)
                throw new ForbiddenException('Email is not verified!');
            }

            const userData: JwtPayloadDto = { id: user.id, login: user.login };

            const accessToken = await this.jwtService.signAsync(userData, {
                secret: process.env.JWT_SECRET_KEY,
                expiresIn: '15m',
            });
            const refreshToken = await this.jwtService.signAsync(userData, {
                secret: process.env.JWT_REFRESH_SECRET_KEY,
                expiresIn: '10080m',
            });
            return { ...userData, accessToken, refreshToken };
        } catch (error: any) {
            throw error;
        }
    }

    async refreshToken(user: UserAuth) {
        const userData: JwtPayloadDto = { id: user.id, login: user.login };

        const accessToken = await this.jwtService.signAsync(userData, {
            secret: process.env.JWT_SECRET_KEY,
            expiresIn: '15m',
        });
        const refreshToken = await this.jwtService.signAsync(userData, {
            secret: process.env.JWT_REFRESH_SECRET_KEY,
            expiresIn: '10080m',
        });

        return { ...userData, accessToken, refreshToken };
    }

    async confirmEmail(emailConfirmDto: EmailConfirmationDto) {
        const isVerified =
            await this.emailVerificationService.verifyCode(emailConfirmDto);
        if (!isVerified) {
            throw new BadRequestException('Confirmation code is invalid!');
        }
        const user = await this.userRepository.setIsEmailVerified(
            emailConfirmDto.userId,
            true,
        );
        await this.profileService.createProfileForUser(
            user.id,
            user.login,
            user,
        );
    }
}
