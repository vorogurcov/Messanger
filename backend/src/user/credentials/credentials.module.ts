import { Module } from '@nestjs/common';
import { CredentialsService } from './credentials.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserAuth } from './entities/user-auth.entity';
import { UserCredentialsRepository } from './repositories/user-credentials.repository';

@Module({
    imports: [TypeOrmModule.forFeature([UserAuth])],
    providers: [CredentialsService, UserCredentialsRepository],
    exports: [CredentialsService],
})
export class CredentialsModule {}
