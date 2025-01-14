import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SongsModule } from './songs/songs.module';
import { LoggerMiddleware } from './common/middleware/logger.middleware';
import { SongsController } from './songs/songs.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { DataSource } from 'typeorm';
import { Song } from './songs/songs.entity';
import { ArtistsModule } from './artists/artists.module';
import { UsersModule } from './users/users.module';
import { Artist } from './artists/artist.entity';
import { User } from './users/user.entity';
import { PlaylistsModule } from './playlists/playlists.module';
import { Playlist } from './playlists/playlist.entity';
import { AuthModule } from './auth/auth.module';
import { dataSourceOptions, typeOrmAsyncConfig } from "db/data-source";
import { SeedModule } from './seed/seed.module';
import configuration from './config/configuration';


@Module({
  imports: [ConfigModule.forRoot({
    envFilePath: [`.${process.env.NODE_ENV}.env`],
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync(typeOrmAsyncConfig),
    SongsModule,
    ArtistsModule,
    UsersModule,
    PlaylistsModule,
    AuthModule,
    SeedModule],
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule implements NestModule {

  constructor(private dataSource: DataSource) {
    console.log(this.dataSource.driver.database);
  }


  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes(SongsController); //option no 3
  }
}
