import { AudioType } from '@/fplayer/defined';
import { SongTypes } from '../playlist_detail/defined';

export class Audio implements AudioType {
  id = '';
  name = '';
  artist = '';
  url = '';
  cover = '';
  lyric = '';
  constructor(song: SongTypes, url: string = '', lyric: string = '') {
    this.id = song.id;
    this.name = song.name;
    this.artist = song.artist;
    this.url = url;
    this.cover = song.pic;
    this.lyric = lyric;
  }
}
