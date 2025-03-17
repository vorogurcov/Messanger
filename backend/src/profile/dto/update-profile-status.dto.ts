import { IsBooleanString, IsDateString, IsOptional } from 'class-validator';
export class UpdateProfileStatusDto {
    @IsBooleanString()
    @IsOptional()
    isOnline: boolean;

    @IsDateString()
    @IsOptional()
    lastSeen: string;
}
