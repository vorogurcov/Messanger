import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './repositories/user.repository';
import { JwtPayloadDto } from './dto/jwt-payload.dto';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
    constructor(private userRepository: UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY as string,
        });
    }

    async validate(payload: JwtPayloadDto) {
        const { login } = payload;
        const user = await this.userRepository.findUser(login);
        if (!user) throw new UnauthorizedException();

        return user;
    }
}
