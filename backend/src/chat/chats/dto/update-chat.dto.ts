import {
    IsOptional,
    IsString,
    IsUUID,
    ArrayNotEmpty,
    ArrayUnique, IsEnum,
} from 'class-validator';
import { Transform } from 'class-transformer';
import {TypeEnumDto} from "./type-enum.dto";

export class UpdateChatDto {
    @IsOptional()
    @IsEnum(TypeEnumDto)
    type?: TypeEnumDto;

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
