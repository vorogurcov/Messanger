import { Module } from '@nestjs/common';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { StorageModule } from '../storage/storage.module';

@Module({
    imports: [
        JwtStrategyModule,
        StorageModule,
        TypeOrmModule.forFeature([UserProfile]),
    ],
    providers: [UserProfileRepository, ProfileService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export class ProfileModule {}
