import { Body, Controller, Post } from "@nestjs/common";
import { Playlist } from "./playlist.entity";
import { CreatePlayListDto } from "./dto/create-playlist.dto";
import { PlaylistsService } from "./playlists.service";



@Controller('playlists')
export class PlaylistsController {
    constructor(private playListService: PlaylistsService) { }

    @Post()
    create(
        @Body()
        playlistDTO: CreatePlayListDto
    ): Promise<Playlist> {
        return this.playListService.create(playlistDTO);
    }

    
}
