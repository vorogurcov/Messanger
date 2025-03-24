import {
    IsDateString, IsEnum, IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';

export enum AvatarAction {
    KEEP = 'keep',
    DELETE = 'delete',
    UPDATE = 'update'
}

export class UpdateProfileInfoDto {
    @MinLength(4)
    @MaxLength(16)
    @IsOptional()
    userName: string;

    @IsDateString()
    @IsOptional()
    birthDate: string;
    @IsOptional()
    bio: string;

    @IsNotEmpty()
    @IsEnum(AvatarAction)
    avatarAction:AvatarAction;
}
