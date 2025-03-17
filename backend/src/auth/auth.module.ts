import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { UserAuthRepository } from './repositories/user-auth.repository';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { ProfileModule } from '../profile/profile.module';

@Module({
    imports: [
        JwtStrategyModule,
        TypeOrmModule.forFeature([UserAuth]),
        ProfileModule,
    ],
    controllers: [AuthController],
    providers: [AuthService, UserAuthRepository],
})
export class AuthModule {}
