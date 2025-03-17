import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UpdateProfileInfoDto } from '../dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from '../dto/update-profile-status.dto';

@Injectable()
export class UserProfileRepository {
    constructor(
        @InjectRepository(UserProfile)
        private repository: Repository<UserProfile>,
    ) {}

    async updateUserProfile(
        userId: string,
        updateProfile: UpdateProfileInfoDto | UpdateProfileStatusDto,
    ) {
        await this.repository.update(userId, updateProfile);
        return this.repository.findOne({ where: { id: userId } });
    }

    async createProfileForUser(userId: string, userLogin) {
        const userProfile: Partial<UserProfile> = {
            id: userId,
            userName: userLogin,
        };
        await this.repository.create(userProfile);
    }
}
