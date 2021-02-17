export interface BaseProps {
  themeColor?: string; //播放器主题颜色
}

export interface AudioType {
  id?: number | string; //音频id
  name: string; //音频名称
  artist?: string; //音频作者
  url: string; //音频路径
  cover: string; //音频封面路径
  lyric: string; //歌词路径
  index?: number; //歌曲在歌单中的索引，如果传入该值在播放器内部会进行次排序，以确保接收到的audioList和页面渲染的顺序一样
}
export interface FplayerProps extends BaseProps {
  audioList?: Array<AudioType>; //播放列表
  defaultAudioIndex?: number; //默认播放音频的索引
  autoPlay?: boolean; //是否开启自动播放，默认为true
  onChange?: (audio: AudioType) => any; //播放音乐变化时触发
}

export const defaultCurrentAudio = {
  id: '',
  name: '',
  artist: '',
  url: '',
  cover: '',
  lyric: ''
};

//audio播放方式
export enum audioSchema {
  ORDER = 0,
  RANDOM,
  LOOP
}
