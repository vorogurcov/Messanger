import {
    IsDateString, IsNotEmpty,
    IsOptional,
    MaxLength,
    MinLength,
} from 'class-validator';
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
    avatarAction:'keep'|'delete'|'update'
}
