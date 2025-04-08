import {
    IsOptional,
    IsString,
    IsUUID,
    ArrayNotEmpty,
    ArrayUnique,
} from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdateChatDto {
    @IsOptional()
    @IsString()
    type?: string;

    @IsOptional()
    @IsString()
    name?: string;

    // @IsOptional()
    // @IsUUID()
    // chatOwnerId?: string;

    @IsOptional()
    @ArrayNotEmpty()
    @ArrayUnique()
    @IsUUID('4', { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    userIds?: string[];
}
