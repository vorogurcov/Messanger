import { Module } from '@nestjs/common';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';

@Module({
    imports: [JwtStrategyModule, TypeOrmModule.forFeature([UserProfile])],
    providers: [UserProfileRepository, ProfileService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export class ProfileModule {}
