import { Transform } from 'class-transformer';
import {
    IsArray,
    IsDateString,
    IsEnum,
    IsString,
    IsUUID,
} from 'class-validator';
import { TypeEnumDto } from './type-enum.dto';
export class CreateChatDto {
    @IsString()
    @IsEnum(TypeEnumDto)
    type: TypeEnumDto;

    @IsString()
    name: string;

    @IsDateString()
    createdAt: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    userIds: string[];
}
