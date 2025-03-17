import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserAuth]),
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UserAuthRepository, JwtStrategy, JwtRefreshStrategy],
    exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
