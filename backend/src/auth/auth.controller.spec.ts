import { Test } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from './dto/register-user.dto';
import {
    ConflictException,
    HttpStatus,
    UnauthorizedException,
} from '@nestjs/common';
import { LoginUserDto } from './dto/login-user.dto';
import { UserAuth } from './entities/user-auth.entity';

describe('AuthController test suite', () => {
    let authService: AuthService;
    let authController: AuthController;

    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                { provide: UserAuthRepository, useValue: {} },
                { provide: JwtService, useValue: {} },
            ],
            controllers: [AuthController],
        }).compile();

        authService = testingModule.get(AuthService);
        authController = testingModule.get(AuthController);
    });

    describe('"registerUser" test suite', () => {
        const registerUserDtoMock: RegisterUserDto = {
            login: 'someLogin',
            phoneNumber: '79999999999',
            password: 'somePassword',
        };

        it('throws ConflictException if user already exists', async () => {
            // Arrange
            authService.registerUser = jest
                .fn()
                .mockRejectedValue(
                    new ConflictException('User already exists!'),
                );
            // Act
            await expect(
                authController.registerUser(registerUserDtoMock),
            ).rejects.toThrowError(ConflictException);
            // Assert
            expect(authService.registerUser).toHaveBeenCalledWith(
                registerUserDtoMock,
            );
            expect(authService.registerUser).toHaveBeenCalledTimes(1);
        });
        it('registers user if user does not exist', async () => {
            // Arrange
            authService.registerUser = jest.fn();
            const mockRegisterUserAnswer = {
                statusCode: HttpStatus.CREATED,
                message: 'User registered successfully',
            };

            // Act
            const result =
                await authController.registerUser(registerUserDtoMock);
            // Assert
            expect(result).toEqual(mockRegisterUserAnswer);
            expect(authService.registerUser).toHaveBeenCalledTimes(1);
            expect(authService.registerUser).toHaveBeenCalledWith(
                registerUserDtoMock,
            );
            expect(result).toHaveProperty('statusCode', HttpStatus.CREATED);
            expect(result).toHaveProperty(
                'message',
                'User registered successfully',
            );
        });
    });

    describe('"loginUser" test suite', () => {
        const loginUserDtoMock: LoginUserDto = {
            login: 'someLogin',
            password: 'somePassword',
        };

        const mockResponse = {
            cookie: jest.fn(),
        };

        it('throws UnauthorizedException if user does not exist', async () => {
            // Arrange
            authService.loginUser = jest
                .fn()
                .mockRejectedValue(
                    new UnauthorizedException('User does not exist!'),
                );

            // Act
            await expect(
                authController.loginUser(loginUserDtoMock, mockResponse as any),
            ).rejects.toThrowError(UnauthorizedException);
            expect(authService.loginUser).toHaveBeenCalledWith(
                loginUserDtoMock,
            );
            expect(authService.loginUser).toHaveBeenCalledTimes(1);
            // Assert
        });
        it('sets cookie and returns correct answer if user exists', async () => {
            authService.loginUser = jest.fn().mockResolvedValue({
                accessToken: 'accToken',
                refreshToken: 'refToken',
                id: 'someId',
                login: 'someLogin',
            });

            const result = await authController.loginUser(
                loginUserDtoMock,
                mockResponse as any,
            );

            expect(result).toEqual({
                statusCode: HttpStatus.OK,
                message: 'Login successful',
                accessToken: 'accToken',
                user: { id: 'someId', login: 'someLogin' },
            });
            expect(mockResponse.cookie).toHaveBeenCalledWith(
                'refreshToken',
                'refToken',
                expect.any(Object),
            );
        });
    });

    describe('"refreshToken" test suite', () => {
        const mockRequest = {
            user: {
                id: 'someId',
                login: 'someLogin',
                phoneNumber: '79999999999',
                email: 'email',
            } as UserAuth,
        };

        const mockResponse = {
            cookie: jest.fn(),
        };

        it('refreshes tokens if user exists', async () => {
            authService.refreshToken = jest.fn().mockResolvedValue({
                accessToken: 'accToken',
                refreshToken: 'refToken',
                id: 'someId',
                login: 'someLogin',
            });

            const result = await authController.refreshToken(
                mockRequest as any,
                mockResponse as any,
            );

            expect(result).toEqual({
                statusCode: HttpStatus.OK,
                message: 'Refresh token successful',
                user: { id: 'someId', login: 'someLogin' },
                accessToken: 'accToken',
            });
            expect(mockResponse.cookie).toHaveBeenCalledWith(
                'refreshToken',
                'refToken',
                expect.any(Object),
            );
        });

        it('throws UnauthorizedException if user does not exist', async () => {
            authService.refreshToken = jest
                .fn()
                .mockRejectedValue(new UnauthorizedException());

            await expect(
                authController.refreshToken(
                    mockRequest as any,
                    mockResponse as any,
                ),
            ).rejects.toThrow(UnauthorizedException);
            expect(authService.refreshToken).toHaveBeenCalledTimes(1);
            expect(authService.refreshToken).toHaveBeenCalledWith(
                mockRequest.user,
            );
        });
    });
});
