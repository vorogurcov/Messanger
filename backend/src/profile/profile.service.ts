import { Injectable } from '@nestjs/common';
import { UserProfileRepository } from './repositories/user-profile.repository';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';
import { UserAuth } from '../auth/entities/user-auth.entity';
import {StorageService} from "../storage/storage.service";

@Injectable()
export class ProfileService {
    constructor(private userProfileRepository: UserProfileRepository,
                private storageService:StorageService
    ) {}
    async updateUserProfile(
        userId: string,
        updateUserProfile: UpdateProfileInfoDto | UpdateProfileStatusDto,
    ) {
        return await this.userProfileRepository.updateUserProfile(
            userId,
            updateUserProfile,
        );
    }

    async getUserProfileById(userId:string){
        try{
            const userProfile = this.userProfileRepository.getUserProfile(userId)
            return userProfile
        }catch(error){
            throw error;
        }

    }

    async updateAvatar(userId: string, avatar: Express.Multer.File) {
        try {
            const result = await this.storageService.uploadFile(avatar, `avatars`, userId);

            await this.userProfileRepository.updateAvatarUrl(userId, result.url)

            return {
                message: 'Avatar updated successfully',
                avatarUrl: result.url,
            };
        } catch (error) {
            throw new Error(`Error updating avatar: ${error.message}`);
        }
    }

    async deleteAvatar(userId:string){
        const publicId = 'avatars/' + userId
        await this.storageService.deleteFile(publicId)
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
