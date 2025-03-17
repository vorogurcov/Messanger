import {Module} from '@nestjs/common'
import {PassportModule} from "@nestjs/passport";
import {JwtModule, JwtService} from "@nestjs/jwt";
import {JwtStrategy} from "./jwt.strategy";
import {JwtRefreshStrategy} from "./jwt-refresh.strategy";

@Module({
    imports:[
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({ secret: process.env.JWT_SECRET_KEY }),
    ],
    providers:[JwtStrategy, JwtRefreshStrategy, JwtService],
    exports: [JwtStrategy,JwtRefreshStrategy, PassportModule, JwtService],

})
export class JwtStrategyModule{}