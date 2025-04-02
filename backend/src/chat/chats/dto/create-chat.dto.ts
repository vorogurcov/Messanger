import { Transform } from 'class-transformer';
import { IsArray, IsDateString, IsString, IsUUID } from 'class-validator';

export class CreateChatDto {
    @IsString()
    type: string;

    @IsString()
    name: string;

    @IsDateString()
    createdAt: string;

    @IsArray()
    @IsUUID('4', { each: true })
    @Transform(({ value }) => (Array.isArray(value) ? value : [value]))
    userIds: string[];
}
