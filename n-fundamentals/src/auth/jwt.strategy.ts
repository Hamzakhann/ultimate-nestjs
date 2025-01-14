
import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "./auth.service";
import { authConstants } from "./auth.constants";
import { PayloadType } from "../types/payload.type";





@Injectable()
export class JWTStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // 1.
            ignoreExpiration: false, // 2.
            secretOrKey: process.env.SECRET, // 3.
        });
    }
    async validate(payload: PayloadType) {
        return {
            userId: payload.userId,
            email: payload.email,
            artistId: payload.artistId, // 2
        };
    }
}