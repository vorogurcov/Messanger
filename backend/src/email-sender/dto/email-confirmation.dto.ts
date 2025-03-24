import { IsNotEmpty, IsPositive, IsUUID, Max, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class EmailConfirmationDto {
    @IsUUID()
    userId: string;

    @IsNotEmpty()
    @IsPositive()
    @Type(() => Number)
    @Min(100000)
    @Max(999999)
    confirmationCode: number;
}
