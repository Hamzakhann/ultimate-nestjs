import { Controller, Body, Post, Get, Put, Delete, HttpException, HttpStatus, Param, ParseIntPipe, Query, DefaultValuePipe, UseGuards } from '@nestjs/common';
import { SongsService } from './songs.service';
import { CreateSongDto } from './dto/create-song.dto';
import { Song } from './songs.entity';
import { UpdateSongDto } from './dto/update-song.dto';
import { UpdateResult } from 'typeorm';
import { Pagination } from 'nestjs-typeorm-paginate';
import { JwtArtistGuard } from 'src/guards/jwt-artist.guard';

@Controller('songs')
export class SongsController {

    constructor(private songsService: SongsService) { }

    @Post()
    @UseGuards(JwtArtistGuard) 
    create(@Body() createSongDTO: CreateSongDto): Promise<Song> {
        return this.songsService.create(createSongDTO);
    }

    @Get()
    findAll(
        @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
        @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    ): Promise<Pagination<Song>> {
        limit = limit > 100 ? 100 : limit;
        return this.songsService.paginate({
            page,
            limit,
        });
    }
    
    @Get(":id")
    findOne(@Param('id', ParseIntPipe) id: number): Promise<Song> {
        return this.songsService.findOne(id);
    }

    @Put(":id")
    update(
        @Param('id', ParseIntPipe) id: number,
        @Body() updateSongDTO: UpdateSongDto,
    ): Promise<UpdateResult> {
        return this.songsService.update(id, updateSongDTO);
    }

    @Delete(":id")
    delete(@Param('id', ParseIntPipe) id: number): Promise<void> {
        return this.songsService.remove(id);
    }
}
