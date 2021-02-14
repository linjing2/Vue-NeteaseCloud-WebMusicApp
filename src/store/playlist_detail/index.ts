import { observable, action } from 'mobx';
import { getPlayListDetail, getSongsDetail, getRecommends } from '@/common/network/play_list';
import { PlaylistInfo, Song, SongTypes } from './defined';

export class PlayListDetailStore {
  @observable
  playlistInfo = {};
  @observable
  songs: SongTypes[] = [];
  @observable
  recommends = [];
  @observable
  spinning = false;

  @action
  getPlayListDetail = (id: string) => {
    this.playlistInfo = {};
    this.songs = [];
    this.spinning = true;
    let _getPlayListDetail = getPlayListDetail(id).then(res => {
      const { playlist } = res.data;
      console.log(playlist);
      
      this.playlistInfo = new PlaylistInfo(playlist);
      const { trackIds } = playlist;
      let _trackIds = trackIds
        .map((item: any) => {
          return item.id;
        })
        .join(',');
      getSongsDetail(_trackIds).then(res => {
        const { songs } = res.data;
        const count = songs.length - 1;
        
        songs.some((song: any, index: number) => {
          this.songs.push(new Song(song));
          
          if(index === count){
              this.spinning = false;
              console.log(this.songs);
          }
        });
      });
    });
  };
}

export default new PlayListDetailStore();
