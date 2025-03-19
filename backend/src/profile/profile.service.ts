import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';
import { UserAuth } from '../auth/entities/user-auth.entity';

@Injectable()
export class ProfileService {
    constructor(private userProfileRepository: UserProfileRepository) {}
    async updateUserProfile(
        userId: string,
        updateUserProfile: UpdateProfileInfoDto | UpdateProfileStatusDto,
    ) {
        return await this.userProfileRepository.updateUserProfile(
            userId,
            updateUserProfile,
        );
    }

    async updateAvatar() {
        // TODO
    }

    async createProfileForUser(
        userId: string,
        userLogin: string,
        userAuth: UserAuth,
    ) {
        await this.userProfileRepository.createProfileForUser(
            userId,
            userLogin,
            userAuth,
        );
    }
}
