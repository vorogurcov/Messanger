import { JwtStrategy } from "./jwt.strategy";
import { JwtPayloadDto } from "./dto/jwt-payload.dto";
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy test suite', () => {
    const userRepositoryMock = {
        findUser: jest.fn(),
    };
    const jwtSecret = 'mockSecret';
    process.env.JWT_SECRET_KEY = jwtSecret;

    const sut: JwtStrategy = new JwtStrategy(userRepositoryMock as any);

    const mockUser = {
        id: 'someId',
        login: 'someLogin',
        phoneNumber: '79990000000',
        email: 'email',
        password: 'hashedPassword',
        avatarUrl: 'url',
    };

    const jwtPayloadDtoMock: JwtPayloadDto = {
        id: 'someId',
        login: 'someLogin',
    };

    describe('"validate" test suite', () => {
        beforeEach(() => {
            jest.clearAllMocks();
        });

        it('should throw UnauthorizedException if user does not exist', async () => {
            // Arrange
            userRepositoryMock.findUser.mockResolvedValue(null);

            // Act
            await expect(sut.validate(jwtPayloadDtoMock)).rejects.toThrow(UnauthorizedException);
            expect(userRepositoryMock.findUser).toHaveBeenCalledTimes(1);
            expect(userRepositoryMock.findUser).toHaveBeenCalledWith(jwtPayloadDtoMock.login);
        });

        it('should return user if user exists', async () => {
            // Arrange
            userRepositoryMock.findUser.mockResolvedValue(mockUser);

            // Act
            const result = await sut.validate(jwtPayloadDtoMock);

            // Assert
            expect(userRepositoryMock.findUser).toHaveBeenCalledTimes(1);
            expect(userRepositoryMock.findUser).toHaveBeenCalledWith(jwtPayloadDtoMock.login);
            expect(result).toEqual(mockUser);
        });
    });
});
