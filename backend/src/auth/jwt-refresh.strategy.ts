import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Request } from 'express';
import { UserRepository } from './repositories/user.repository';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class JwtRefreshStrategy extends PassportStrategy(
    Strategy,
    'jwt-refresh',
) {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromExtractors([
                (req: Request) => req.cookies?.refreshToken,
            ]),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_REFRESH_SECRET_KEY as string,
        });
    }

    async validate(payload: JwtPayloadDto) {
        const { login } = payload;
        const user = await this.userRepository.findUser(login);
        if (!user) throw new UnauthorizedException();

        return user;
    }
}
