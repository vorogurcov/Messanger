import {
    Body,
    Controller,
    HttpStatus,
    InternalServerErrorException,
    Patch,
    Post,
    Req,
    UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
@Controller('profile')
@UseGuards(AuthGuard('jwt'))
export class ProfileController {
    constructor(private profileService: ProfileService) {}

    @Patch()
    async updateProfileInfo(
        @Req() req: Request,
        @Body() dto: UpdateProfileInfoDto,
    ) {
        try {
            const updatedProfile = await this.profileService.updateUserProfile(
                (req.user as { id: string }).id,
                dto,
            );

            return {
                statusCode: HttpStatus.OK,
                message: 'Profile info updated successfully',
                userProfile: updatedProfile,
            };
        } catch {
            throw new InternalServerErrorException('Something went wrong!');
        }
    }

    @Patch('status')
    async updateProfileStatus(
        @Req() req: Request,
        @Body() dto: UpdateProfileStatusDto,
    ) {
        try {
            const updatedProfile = await this.profileService.updateUserProfile(
                (req.user as { id: string }).id,
                dto,
            );

            return {
                statusCode: HttpStatus.OK,
                message: 'Profile status updated successfully',
                userProfile: updatedProfile,
            };
        } catch {
            throw new InternalServerErrorException('Something went wrong!');
        }
    }
    @Post('avatar')
    updateAvatar() {
        // TODO:Implement update Avatar feature
    }
}
