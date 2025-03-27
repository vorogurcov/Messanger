import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import * as bcrypt from 'bcrypt';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import { UserAuth } from '../../credentials/entities/user-auth.entity';
import { JwtService } from '@nestjs/jwt';
import { EmailVerificationService } from '../../email-sender/services/email-verification.service';
import { ConfirmationDto } from '../../email-sender/dto/email-confirmation.dto';
import { ProfileService } from '../../profile/profile.service';
import { EmailSenderService } from '../../email-sender/services/email-sender.service';
import { CredentialsService } from '../../credentials/credentials.service';

@Injectable()
export class AuthService {
    private actionKey = 'email_verification';
    constructor(
        private credentialsService: CredentialsService,
        private jwtService: JwtService,
        private emailVerificationService: EmailVerificationService,
        private profileService: ProfileService,
        private emailSenderService: EmailSenderService,
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
                await this.credentialsService.register(userCredentials);
            const verificationCode =
                await this.emailVerificationService.generateAndSaveCode(
                    this.actionKey,
                    id,
                );
            await this.emailSenderService.sendConfirmationEmail(
                email,
                login,
                verificationCode,
            );
            return {
                id,
                email,
                login,
            };
        } catch (error: any) {
            throw error;
        }
    }

    async loginUser(loginUserDto: LoginUserDto) {
        try {
            const { password, login, ...other } = loginUserDto;

            const user = await this.credentialsService.findUserByLogin(login);
            console.log(user)

            if (!user || !(await bcrypt.compare(password, user.password))) {
                throw new UnauthorizedException('Invalid credentials');
            }

            if (
                !user ||
                !(await this.credentialsService.getIsEmailVerified(user.id))
            ) {
                const { id, email, login } = user;
                const verificationCode =
                    await this.emailVerificationService.generateAndSaveCode(
                        this.actionKey,
                        id,
                    );
                await this.emailSenderService.sendConfirmationEmail(
                    email,
                    login,
                    verificationCode,
                );
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

    async confirmEmail(emailConfirmationDto: ConfirmationDto) {
        const isVerified = await this.emailVerificationService.verifyCode(
            this.actionKey,
            emailConfirmationDto,
        );
        if (!isVerified) {
            throw new BadRequestException('Confirmation code is invalid!');
        }
        const user = await this.credentialsService.setIsEmailVerified(
            emailConfirmationDto.userId,
            true,
        );
        await this.profileService.createProfileForUser(
            user.id,
            user.login,
            user,
        );
    }
}
