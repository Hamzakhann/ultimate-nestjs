import { Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Artist } from "src/artists/artist.entity";
import { Playlist } from "src/playlists/playlist.entity";


@Entity("songs")
export class Song {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    // @Column("varchar", { array: true })
    // artists: string[];
    @ManyToMany(() => Artist, (artist) => artist.songs, { cascade: true })
    @JoinTable({ name: "songs_artists" })
    artists: Artist[];

    @Column({ type: "date" })
    releasedDate: Date;

    @Column({ type: "time" })
    duration: Date;

    @Column({ type: "text" })
    lyrics: string;

    /**
* Many songs can belong to the playlist for each unique user
*/
    @ManyToOne(() => Playlist, (playList) => playList.songs)
    playList: Playlist;
}