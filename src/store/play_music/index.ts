import { observable, action, makeAutoObservable } from 'mobx';
import { AudioType } from '@/fplayer/defined';
import { getMusicUrl, getMusicLyric } from '@/common/api/play_list';
import { SongTypes } from '../playlist_detail/defined';
import { Audio } from './defined';

export class PlayMusicStore {
  constructor(){
      makeAutoObservable(this);
  }
  @observable
  loading: boolean = false;
  @observable
  audioList: Array<AudioType> = []; //音频列表
  @observable
  defaultAudioIndex: number = 0;
  @observable
  currentAudio: AudioType = {} as AudioType;

  /**播放音乐的初始化操作
   * @params playList播放列表
   * index 要播放的歌曲在列表中的下标
   */
  @action
  playMusic = (playList = [], index: number) => {
    //初始化
    this.audioList = [];
    const _audioList = [] as Array<AudioType>;
    const count = playList.length;
    this.loading = true;
    this.defaultAudioIndex = index;
    playList.some((item: SongTypes, index) => {
      let url = getMusicUrl(item.id).then(res => {
        const url = res.data.data[0].url;
        return Promise.resolve(url);
      });
      let lyric = getMusicLyric(item.id).then(res => {
        const lyric = res.data.lrc.lyric||'';
        return Promise.resolve(lyric);
      });
      Promise.all([url, lyric])
        .then(results => {
          const audio = new Audio(item, results[0], results[1],index);
          _audioList.push(audio);
          if (index + 1 === count) {
            this.loading = false;
            this.audioList = _audioList;
            console.log(_audioList);
            
          }
        })
        .catch(err => {
          this.loading = false;
          // alert(err);
        });
    });
  };

  @action
  setCurrentAudio = (audio: AudioType) => {
    this.currentAudio = audio;
  }
}

export default new PlayMusicStore();
