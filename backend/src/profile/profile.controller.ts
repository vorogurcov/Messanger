import {
    Body,
    Controller, Delete, Get,
    HttpStatus,
    InternalServerErrorException,
    Patch,
    Post,
    Req, UploadedFile,
    UseGuards, UseInterceptors,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UpdateProfileInfoDto } from './dto/update-profile-info.dto';
import { UpdateProfileStatusDto } from './dto/update-profile-status.dto';
import { ProfileService } from './profile.service';
import { Request } from 'express';
import {FileInterceptor} from "@nestjs/platform-express";
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
    @UseInterceptors(FileInterceptor('file'))
    async updateAvatar(@Req() req:Request, @UploadedFile() avatar: Express.Multer.File) {
        const userId = (req.user as any).id
        return await this.profileService.updateAvatar(userId,avatar)
    }

    @Delete('avatar')
    async deleteAvatar(@Req() req: Request) {
        const {id} = req.user as any
        await this.profileService.deleteAvatar(id);
    }

    @Get('me')
    async getMyProfile(@Req() req:Request){
        const {id} = req.user as any
        try{
            const userProfile = await this.profileService.getUserProfileById(id)
            return {
                statusCode:HttpStatus.OK,
                message:'User profie was found!',
                userProfile,
            }
        }catch(error){
            throw error;
        }

    }
}
