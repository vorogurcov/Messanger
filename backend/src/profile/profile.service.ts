import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';

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

    async createProfileForUser(userId: string, userLogin: string) {
        await this.userProfileRepository.createProfileForUser(
            userId,
            userLogin,
        );
    }
}
