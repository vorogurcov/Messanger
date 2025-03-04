import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {UserRepository} from "./repositories/user.repository";
import {JwtPayloadDto} from "./dto/jwt-payload.dto";
import {User} from "./entities/user.entity";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private userRepository:UserRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET_KEY as string,
        });
    }

    async validate(payload:JwtPayloadDto){
        const {login} = payload
        console.log(login)
        const user= await this.userRepository.findUser(login)
        console.log(user)
        if(!user)
            throw new UnauthorizedException()

        return user
    }
}