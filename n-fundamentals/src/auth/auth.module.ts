import { Module } from "@nestjs/common";
import { JWTStrategy } from './jwt.strategy';
import { PassportModule } from '@nestjs/passport';

import { UsersModule } from "src/users/users.module";
import { AuthService } from "./auth.service";
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { authConstants } from "./auth.constants";
import { ArtistsModule } from "src/artists/artists.module";
import { ApiKeyStrategy } from './api-key.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';


@Module({
    imports: [ArtistsModule, UsersModule, PassportModule, JwtModule.registerAsync({
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
            secret: configService.get<string>('secret'),
            signOptions: {
                expiresIn: '1d',
            },
        }),
        inject: [ConfigService],
    }),],
    controllers: [AuthController],
    providers: [AuthService, JWTStrategy, ApiKeyStrategy],
    exports: [AuthService],
})
export class AuthModule { }