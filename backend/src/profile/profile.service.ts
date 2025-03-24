import {Injectable} from '@nestjs/common';
import {UserProfileRepository} from './repositories/user-profile.repository';
import {AvatarAction, UpdateProfileInfoDto} from './dto/update-profile-info.dto';
import {UpdateProfileStatusDto} from './dto/update-profile-status.dto';
import {UserAuth} from '../auth/entities/user-auth.entity';
import {StorageService} from "../storage/storage.service";

@Injectable()
export class ProfileService {
    constructor(private userProfileRepository: UserProfileRepository,
                private storageService:StorageService
    ) {}
    async updateUserProfile(
        userId: string,
        updateUserProfile: UpdateProfileInfoDto ,
        avatar:Express.Multer.File,
    ) {
        const {avatarAction, file, ...userProfileInfo} = updateUserProfile as any
        await this.actOnAvatar(avatarAction,userId,avatar)
        return await this.userProfileRepository.updateUserProfile(
            userId,
            userProfileInfo,
        );
    }

    async updateUserProfileStatus(
        userId:string,
        updateUserProfileStatus: UpdateProfileStatusDto,
    ){
        return await this.userProfileRepository.updateUserProfile(
            userId,
            updateUserProfileStatus,
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

    async actOnAvatar(avatarAction:AvatarAction,userId: string, avatar: Express.Multer.File) {
        try {
            if(avatarAction === AvatarAction.DELETE){
                const publicId = 'avatars/' + userId
                await this.storageService.deleteFile(publicId)
                await this.userProfileRepository.updateAvatarUrl(userId, '')
            }

            if(avatarAction === AvatarAction.UPDATE){
                const publicId = 'avatars/' + userId
                await this.storageService.deleteFile(publicId)
                const result = await this.storageService.uploadFile(avatar, `avatars`, userId);
                await this.userProfileRepository.updateAvatarUrl(userId, result.url)

                return {
                    message: 'Avatar updated successfully',
                    avatarUrl: result.url,
                };
            }

        } catch (error) {
            throw new Error(`Error updating avatar: ${error.message}`);
        }
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
