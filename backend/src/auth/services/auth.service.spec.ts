import { Test } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UserAuthRepository } from '../repositories/user-auth.repository';
import { JwtService } from '@nestjs/jwt';
import { RegisterUserDto } from '../dto/register-user.dto';
import { LoginUserDto } from '../dto/login-user.dto';
import { UserAuth } from '../entities/user-auth.entity';
import { JwtPayloadDto } from '../dto/jwt-payload.dto';
import * as bcrypt from 'bcrypt';
const mockUserAuthRepository = () => ({
    saveUser: jest.fn(),
    findUser: jest.fn(),
});
const mockJwtService = () => ({
    signAsync: jest.fn(),
});

const mockBcrypt = {
    genSalt: jest.fn(),
    hash: jest.fn(),
    compare: jest.fn(),
};

const mockRegisterDto: RegisterUserDto = {
    login: 'login',
    email: 'email@email.com',
    password: 'asdASD!1',
};

const mockLoginUserDto: LoginUserDto = {
    login: 'login',
    password: 'asdASD!1',
};

const mockUserAuth: UserAuth = {
    id: '1',
    login: 'login',
    phoneNumber: '79990000000',
    email: 'email',
    password: 'hashedPassword',
    isEmailVerified: false,
    userProfile:undefined as any,
};


describe('AuthService test suite', () => {
    let userRepository: ReturnType<typeof mockUserAuthRepository>;
    let authService: AuthService;
    let jwtService: JwtService;

    beforeEach(async () => {
        const testingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: UserAuthRepository,
                    useFactory: mockUserAuthRepository,
                },
                { provide: JwtService, useFactory: mockJwtService },
            ],
        }).compile();

        authService = testingModule.get(AuthService);
        userRepository = testingModule.get(UserAuthRepository);
        jwtService = testingModule.get(JwtService);
        jest.clearAllMocks();
    });

    describe('"registerUser" test suite', () => {
        beforeEach(() => {
            jest.spyOn(bcrypt, 'genSalt').mockImplementation(
                mockBcrypt.genSalt,
            );
            jest.spyOn(bcrypt, 'hash').mockImplementation(mockBcrypt.hash);
        });

        it('should hash password and call userRepository.saveUser with correct data', async () => {
            const salt = 'somesalt';
            const hashedPassword = 'hashedPassword123';

            mockBcrypt.genSalt.mockResolvedValue(salt);
            mockBcrypt.hash.mockResolvedValue(hashedPassword);

            await authService.registerUser(mockRegisterDto);

            expect(mockBcrypt.genSalt).toHaveBeenCalledTimes(1);
            expect(mockBcrypt.hash).toHaveBeenCalledWith(
                mockRegisterDto.password,
                salt,
            );

            expect(userRepository.saveUser).toHaveBeenCalledWith({
                login: mockRegisterDto.login,
                phoneNumber: mockRegisterDto.email,
                password: hashedPassword,
            });
        });

        it('should throw error if hashing fails', async () => {
            mockBcrypt.genSalt.mockRejectedValue(
                new Error('Salt generation error'),
            );

            await expect(
                authService.registerUser(mockRegisterDto),
            ).rejects.toThrow('Salt generation error');
        });

        it('should throw error if repository fails', async () => {
            const salt = 'somesalt';
            const hashedPassword = 'hashedPassword123';

            mockBcrypt.genSalt.mockResolvedValue(salt);
            mockBcrypt.hash.mockResolvedValue(hashedPassword);
            userRepository.saveUser.mockRejectedValue(new Error('Save failed'));

            await expect(
                authService.registerUser(mockRegisterDto),
            ).rejects.toThrow('Save failed');
        });
    });

    describe('"loginUser" test suite', () => {
        beforeEach(() => {
            jest.spyOn(bcrypt, 'compare').mockImplementation(
                mockBcrypt.compare,
            );
        });

        it('should compare passwords and return tokens if passwords valid', async () => {
            // Arrange
            userRepository.findUser.mockResolvedValue(mockUserAuth);
            mockBcrypt.compare.mockResolvedValue(true);
            const mockJwtPayloadDto: JwtPayloadDto = {
                id: mockUserAuth.id,
                login: mockUserAuth.login,
            };
            // Act
            const result = await authService.loginUser(mockLoginUserDto);

            // Assert
            expect(mockBcrypt.compare).toHaveBeenCalledTimes(1);
            expect(mockBcrypt.compare).toHaveBeenCalledWith(
                mockLoginUserDto.password,
                mockUserAuth.password,
            );
            expect(result).toHaveProperty('accessToken');
            expect(result).toHaveProperty('refreshToken');
            expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
            expect(jwtService.signAsync).toHaveBeenNthCalledWith(
                1,
                mockJwtPayloadDto,
                { expiresIn: '15m' },
            );
            expect(jwtService.signAsync).toHaveBeenNthCalledWith(
                2,
                mockJwtPayloadDto,
                { expiresIn: '10080m' },
            );
        });

        it('should throw UnauthorizedException if password is incorrect', async () => {
            // Arrange
            userRepository.findUser.mockResolvedValue(mockUserAuth);
            mockBcrypt.compare.mockResolvedValue(false);
            // Act
            await expect(
                authService.loginUser(mockLoginUserDto),
            ).rejects.toThrow('Invalid credentials');

            // Assert
            expect(mockBcrypt.compare).toHaveBeenCalledTimes(1);
            expect(mockBcrypt.compare).toHaveBeenCalledWith(
                mockLoginUserDto.password,
                mockUserAuth.password,
            );
        });
    });

    describe('"refreshToken" test suite', () => {
        beforeEach(() => {
            jest.spyOn(jwtService, 'signAsync')
                .mockResolvedValueOnce('accessToken123')
                .mockResolvedValueOnce('refreshToken456');
        });

        it('should refresh tokens', async () => {
            // Arrange
            const mockJwtPayloadDto: JwtPayloadDto = {
                id: mockUserAuth.id,
                login: mockUserAuth.login,
            };
            const newAccessToken = 'accessToken123';
            const newRefreshToken = 'refreshToken456';
            // Act
            const result = await authService.refreshToken(mockUserAuth);

            // Assert
            expect(jwtService.signAsync).toHaveBeenCalledTimes(2);
            expect(jwtService.signAsync).toHaveBeenNthCalledWith(
                1,
                mockJwtPayloadDto,
                { expiresIn: '15m' },
            );
            expect(jwtService.signAsync).toHaveBeenNthCalledWith(
                2,
                mockJwtPayloadDto,
                { expiresIn: '10080m' },
            );
            expect(result).toEqual({
                ...mockJwtPayloadDto,
                accessToken: newAccessToken,
                refreshToken: newRefreshToken,
            });
        });
    });
});
