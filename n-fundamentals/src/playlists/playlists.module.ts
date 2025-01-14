import { Module } from '@nestjs/common';
import { PlaylistsController } from './playlists.controller';
import { TypeOrmModule } from "@nestjs/typeorm";
import { Playlist } from "./playlist.entity";
import { PlaylistsService } from "./playlists.service";
import { Song } from "src/songs/songs.entity";
import { User } from "src/users/user.entity";


@Module({
  imports: [TypeOrmModule.forFeature([Playlist, Song, User])],
  controllers: [PlaylistsController],
  providers: [PlaylistsService]
})
export class PlaylistsModule { }
