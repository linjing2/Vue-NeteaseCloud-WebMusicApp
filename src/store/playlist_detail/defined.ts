import { formatDate } from '@/common/utils/tool';

export interface PlaylistInfoTypes {
  img: string;
  title: string;
  name: string;
  shareCount: string;
  subscribedCount: string;
  playCount: string;
  trackCount: string;
  tags: string[];
  createTime: string;
  creatorAvatar: string;
  creatorName: string;
}

export class PlaylistInfo implements PlaylistInfoTypes {
  img = '';
  title = '';
  name = '';
  shareCount = '';
  subscribedCount = '';
  playCount = '';
  trackCount = '';
  tags = [''];
  createTime = '';
  creatorAvatar = '';
  creatorName = '';
  constructor(playlist: any) {
    this.img = playlist.coverImgUrl || '';
    this.title = playlist.description;
    this.name = playlist.name;
    this.shareCount = playlist.shareCount;
    this.subscribedCount = playlist.subscribedCount;
    this.playCount = playlist.playCount;
    this.trackCount = playlist.trackCount;
    this.tags = playlist.tags;
    this.createTime = playlist.createTime;
    this.creatorAvatar = playlist.creator.avatarUrl;
    this.creatorName = playlist.creator.nickname;
  }
}

export interface SongTypes {
  id: string;
  name: string;
  album: string;
  artist: string;
  pic: string;
  time: string;
}

export class Song implements SongTypes {
  id = '';
  name = '';
  album = '';
  artist = '';
  pic = '';
  time = '';
  constructor(song: any) {
    this.id = song.id;
    this.name = song.name;
    this.album = song.al.name;
    this.artist = song.ar[0].name;
    this.pic = song.al.picUrl;
    this.time = formatDate(new Date(song.dt), 'mm:ss');
  }
}
