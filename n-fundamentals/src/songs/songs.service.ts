import { Injectable } from '@nestjs/common';
import { Song } from './songs.entity';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, UpdateResult } from 'typeorm';
import { CreateSongDto } from './dto/create-song.dto';
import { UpdateSongDto } from './dto/update-song.dto';
import {
    paginate,
    Pagination,
    IPaginationOptions,
} from 'nestjs-typeorm-paginate';
import { Artist } from 'src/artists/artist.entity';



@Injectable()
export class SongsService {

    constructor(
        @InjectRepository(Song)
        private readonly songRepository: Repository<Song>,
        @InjectRepository(Artist)
        private artistRepository: Repository<Artist>
    ) { }

    // local DB
    // local array
    private readonly songs = [];
    async create(songDTO: CreateSongDto): Promise<Song> {
        const song = new Song();
        song.title = songDTO.title;
        song.artists = songDTO.artists;
        song.duration = songDTO.duration;
        song.lyrics = songDTO.lyrics;
        song.releasedDate = songDTO.releasedDate;
        
        const artists = await this.artistRepository.findByIds(songDTO.artists);
        song.artists = artists;

        return await this.songRepository.save(song);
    }


    async paginate(options: IPaginationOptions): Promise<Pagination<Song>> {
        // Adding query builder
        // If you need to add query builder you can add it here
        const queryBuilder = this.songRepository.createQueryBuilder('c');
        queryBuilder.orderBy('c.releasedDate', 'DESC');
        return paginate<Song>(queryBuilder, options);
    }

    findAll(): Promise<Song[]> {
        return this.songRepository.find();
    }

    findOne(id: number): Promise<Song> {
        return this.songRepository.findOneBy({ id });
    }

    async remove(id: number): Promise<void> {
        await this.songRepository.delete(id);
    }


    update(id: number, recordToUpdate: UpdateSongDto): Promise<UpdateResult> {
        return this.songRepository.update(id, recordToUpdate);
    }
}
