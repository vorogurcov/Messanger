import {Injectable, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProfile } from '../entities/user-profile.entity';
import { UpdateProfileInfoDto } from '../dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from '../dto/update-profile-status.dto';
import { UserAuth } from '../../auth/entities/user-auth.entity';
import {NotFoundError} from "rxjs";

@Injectable()
export class UserProfileRepository {
    constructor(
        @InjectRepository(UserProfile)
        private repository: Repository<UserProfile>,
    ) {}

    async getUserProfile(userId:string){
        try{
            return await this.repository.findOneBy({id:userId})
        }catch{
            throw new NotFoundException(`User with id ${userId} was not found`)
        }
    }


    async updateUserProfile(
        userId: string,
        updateProfile: UpdateProfileInfoDto | UpdateProfileStatusDto,
    ) {
        try {
            await this.repository.update(userId, updateProfile);
            return this.repository.findOne({ where: { id: userId } });
        } catch (error) {
            console.log('Can not update user profile!', error.message);
            throw error;
        }
    }

    async createProfileForUser(
        userId: string,
        userLogin: string,
        userAuth: UserAuth,
    ) {
        try {
            const createUserProfileDto: Partial<UserProfile> = {
                id: userId,
                userName: userLogin,
                userAuth,
            };
            const userProfile =
                await this.repository.create(createUserProfileDto);
            await this.repository.save(userProfile);
        } catch (error) {
            console.log('Can not create profile for user!', error.message);
            throw error;
        }
    }
    async updateAvatarUrl(userId: string, avatarUrl: string) {
        try {
            await this.repository.update(userId, { avatarUrl });
        } catch (error) {
            console.log('Can not update avatar URL!', error.message);
            throw error;
        }
    }
}
