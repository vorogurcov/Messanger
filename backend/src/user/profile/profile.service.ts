import {
    ForbiddenException,
    Injectable,
    NotFoundException,
} from '@nestjs/common';
import { UserProfileRepository } from './repositories/user-profile.repository';
import {
    AvatarAction,
    UpdateProfileInfoDto,
} from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';
import { UserAuth } from '../credentials/entities/user-auth.entity';
import { StorageService } from '../../common/storage/storage.service';
import { CredentialsService } from '../credentials/credentials.service';
import * as bcrypt from 'bcrypt';
import { UpdateCredentialsDto } from './dto/update-credentials.dto';
import { EmailSenderService } from '../../common/email-sender/services/email-sender.service';
import { EmailVerificationService } from '../../common/email-sender/services/email-verification.service';

@Injectable()
export class ProfileService {
    private actionKey = 'credentials_verification';
    constructor(
        private userProfileRepository: UserProfileRepository,
        private storageService: StorageService,
        private credentialsService: CredentialsService,
        private emailSenderService: EmailSenderService,
        private emailVerificationService: EmailVerificationService,
    ) {}
    async updateUserProfile(
        userId: string,
        updateUserProfile: UpdateProfileInfoDto,
        avatar: Express.Multer.File,
    ) {
        const { avatarUrl, avatarAction, file, ...userProfileInfo } =
            updateUserProfile as any;
        await this.actOnAvatar(avatarAction, userId, avatar);
        console.log(userProfileInfo);
        return await this.userProfileRepository.updateUserProfile(
            userId,
            userProfileInfo,
        );
    }

    async updateUserProfileStatus(
        userId: string,
        updateUserProfileStatus: UpdateProfileStatusDto,
    ) {
        return await this.userProfileRepository.updateUserProfile(
            userId,
            updateUserProfileStatus,
        );
    }

    async getUserProfileById(userId: string) {
        try {
            const userProfile =
                this.userProfileRepository.getUserProfile(userId);
            return userProfile;
        } catch (error) {
            throw error;
        }
    }

    async actOnAvatar(
        avatarAction: AvatarAction,
        userId: string,
        avatar: Express.Multer.File,
    ) {
        try {
            if (avatarAction === AvatarAction.DELETE) {
                const publicId = 'avatars/' + userId;
                await this.storageService.deleteFile(publicId);
                await this.userProfileRepository.updateAvatarUrl(userId, '');
            }

            if (avatarAction === AvatarAction.UPDATE) {
                const publicId = 'avatars/' + userId;
                await this.storageService.deleteFile(publicId);
                const result = await this.storageService.uploadFile(
                    avatar,
                    `avatars`,
                    userId,
                );
                await this.userProfileRepository.updateAvatarUrl(
                    userId,
                    result.url,
                );

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

    async checkPassword(userLogin: string, password: string) {
        const user = await this.credentialsService.findUserByLogin(userLogin);

        if (!user) {
            throw new NotFoundException(
                `User with login "${userLogin}" not found`,
            );
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            throw new ForbiddenException('Incorrect password');
        }

        const passwordVerifiedMarker =
            await this.emailVerificationService.generateAndSaveCode(
                this.actionKey,
                user.id,
            );

        return passwordVerifiedMarker;
    }

    async updateCredentials(
        login: string,
        userId: string,
        updateCredentialsDto: UpdateCredentialsDto,
    ) {
        const confirmationCode = Number(
            updateCredentialsDto.passwordVerifiedMarker,
        );
        const isVerified = await this.emailVerificationService.verifyCode(
            this.actionKey,
            { userId, confirmationCode },
        );
        if (!isVerified) throw new ForbiddenException();

        const userAuth = await this.credentialsService.updateCredentials(
            userId,
            updateCredentialsDto,
        );
        if (updateCredentialsDto.email) {
            const emailVerificationCode =
                await this.emailVerificationService.generateAndSaveCode(
                    'email_verification',
                    userId,
                );
            await this.emailSenderService.sendProfileUpdateVerificationEmail(
                userAuth.email,
                userAuth.login,
                emailVerificationCode,
            );
        }

        return {
            id: userId,
            login,
        };
    }

    async findUsers(q:string){
        return await this.userProfileRepository.findUsers(q)
    }
}
