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
}
export interface FplayerProps extends BaseProps {
  audioList?: Array<AudioType>;//播放列表
  defaultAudio?: AudioType;//默认播放的音频
  autoPlay?: boolean; //是否开启自动播放，默认为true
}

export const defaultCurrentAudio = {
  id: '',
  name: '',
  artist: '',
  url: '',
  cover: '',
  lyric: '',
}
