import { Module } from '@nestjs/common';
import { JwtStrategyModule } from '../jwt-strategy/jwt-strategy.module';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { ProfileService } from './profile.service';
import { ProfileController } from './profile.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserProfile } from './entities/user-profile.entity';
import { StorageModule } from '../storage/storage.module';
import {CredentialsModule} from "../credentials/credentials.module";
import {EmailSenderModule} from "../email-sender/email-sender.module";

@Module({
    imports: [
        JwtStrategyModule,
        StorageModule,
        TypeOrmModule.forFeature([UserProfile]),
        CredentialsModule,
        EmailSenderModule,
    ],
    providers: [UserProfileRepository, ProfileService],
    controllers: [ProfileController],
    exports: [ProfileService],
})
export class ProfileModule {}
