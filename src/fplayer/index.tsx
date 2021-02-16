import React, { createContext, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import './index.scss';
import { FplayerProps, defaultCurrentAudio, AudioType } from './defined';
import Progress from './common/progress/index';
import SongInfo from './components/songInfo/index';
import FplayerToggle from './components/player_toggle/index';
import FplayerModal from './components/player_modal';

export const preCls = 'fplayer';
export const FPlayerContext = createContext({} as any);

const Fplayer: React.FC<FplayerProps> = (props: FplayerProps) => {
  const { themeColor = '#2d8cf0', audioList = [], defaultAudio, autoPlay = true } = props;

  const audioRef = useRef({} as HTMLAudioElement);
  const [currentAudio, setCurrentAudio] = useState(defaultCurrentAudio as AudioType); //当前音频
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); //正在播放音乐的音频在audioList中的下标
  const [isAudioLoading, setIsAudioLoading] = useState(false); //是否在加载音频
  const [isPlaying, setIsPlaying] = useState(false); //播放是否在,true是，false暂停
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); //audio总时长
  const [isAudioProgressDrag, setIsAudioProgressDrag] = useState(false); //是否在拖拽设置音乐进度

  useEffect(() => {
    setCurrentAudioIndex(0);
    if (defaultAudio) {
      setCurrentAudio(defaultAudio);
      audioList.some((audio, index) => {
        if (audio.id === defaultAudio.id) {
          setCurrentAudioIndex(index);
          return true;
        }
      });
    } else if (audioList.length > 0) {
      setCurrentAudio(audioList[0]);
      setCurrentAudioIndex(0);
    }
  }, [audioList]);

  const audioPercent = useMemo(() => {
    if (!(duration && currentTime)) return 0;
    return (currentTime / duration) * 100;
  }, [duration, currentTime]);

  /**事件 */
  const handleAudioLoadStart = useCallback(() => {
    console.log('浏览器开始寻找指定视频');
  }, []);

  const handleAudioDurationChange = useCallback(() => {
    console.log('音频时间变化');
    setDuration(audioRef.current.duration * 1000);
    setIsAudioLoading(true);
  }, []);

  const handleAudioLoadedMetadata = useCallback(() => {
    console.log('开始加载元数据');
  }, []);
  const handleAudioProgress = useCallback(() => {
    console.log('开始加载');
  }, [isAudioLoading]);
  const handleAudioCanPlay = useCallback(() => {
    console.log('可以播放');
    setIsAudioLoading(false);
  }, [isAudioLoading]);
  const handleAudioCanPlayThrough = useCallback(() => {
    console.log('加载完成');
  }, []);

  const handleAudioPlaying = useCallback(() => {
    console.log('正在播放');
    setIsPlaying(true);
  }, [isPlaying]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    const newCurrentAudioIndex = currentAudioIndex + 1;
    toggleAudio(newCurrentAudioIndex);
  }, []);

  const handleAudioError = (err: any) => {
    if (!audioList.length) return;
    console.log('音频加载错误');
    console.log(err);
    toggleAudio(currentAudioIndex + 1);
  };

  const handleAudioTimeUpdate = () => {
    setCurrentTime(audioRef.current.currentTime * 1000); //media currentTime单位s
  };

  /**功能函数 */
  //设置指定音频
  const toggleAudio = (newCurrentAudioIndex: number) => {
    //区间效验
    if (newCurrentAudioIndex < 0) {
      newCurrentAudioIndex = audioList.length - 1;
      setCurrentAudioIndex(newCurrentAudioIndex);
      setCurrentAudio(audioList[newCurrentAudioIndex]);
    } else if (newCurrentAudioIndex > audioList.length - 1) {
      setCurrentAudioIndex(0);
      setCurrentAudio(audioList[0]);
    } else {
      setCurrentAudioIndex(newCurrentAudioIndex);
      setCurrentAudio(audioList[newCurrentAudioIndex]);
    }
  };
  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
  }, [isPlaying]);

  const handlePlayingPauseToggle = useCallback(
    (_isPlaying: boolean) => {
      setIsPlaying(_isPlaying);
      if (_isPlaying) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
    },
    [isPlaying]
  );

  //切换播放歌曲
  const handleTogglePreAudio = useCallback(() => {
    toggleAudio(currentAudioIndex - 1);
  }, [currentAudioIndex]);

  const handleToggleNextAudio = useCallback(() => {
    toggleAudio(currentAudioIndex + 1);
  }, [currentAudioIndex]);

  //设置播放时间
  const setAudioCurrentTime = useCallback((percent: number) => {
    const _currentTime = (percent / 100) * audioRef.current.duration;
    audioRef.current.currentTime = _currentTime;
  }, []);

  const handleSetAudioCurrentTime = useCallback((percent, isDrag) => {
    if (isDrag) return;
    setAudioCurrentTime(percent);
  }, []);

  const handleAudioProgressDragStart = useCallback(() => {
    setIsAudioProgressDrag(true);
  }, [isAudioProgressDrag]);

  const handleAudioProgressDragEnded = useCallback((percent: number) => {
    setIsAudioProgressDrag(false);
    setAudioCurrentTime(percent);
  }, []);

  return (
    <FPlayerContext.Provider value={currentAudio}>
      <audio
        src={currentAudio.url}
        autoPlay={autoPlay}
        ref={audioRef}
        onLoadStart={handleAudioLoadStart}
        onDurationChange={handleAudioDurationChange}
        onLoadedMetadata={handleAudioLoadedMetadata}
        onProgress={handleAudioProgress}
        onCanPlay={handleAudioCanPlay}
        onCanPlayThrough={handleAudioCanPlayThrough}
        onPlaying={handleAudioPlaying}
        onPause={handleAudioPause}
        onEnded={handleAudioEnded}
        onError={handleAudioError}
        onTimeUpdate={handleAudioTimeUpdate}
      />
      <div className="fplayer">
        <div className="fplayer_head">
          <Progress
            percent={audioPercent}
            strokeColor={themeColor}
            thumbColor={themeColor}
            loading={isAudioLoading}
            thumb
            hoverShowThumb
            allowClick
            allowDrag
            onChange={handleSetAudioCurrentTime}
            onDragStart={handleAudioProgressDragStart}
            onDragEnded={handleAudioProgressDragEnded}
          />
        </div>
        <div className="fplayer_main">
          <SongInfo duration={duration} currentTime={currentTime} />
          <FplayerToggle
            isPlaying={isPlaying}
            themeColor={themeColor}
            onPlaying={handlePlayingPauseToggle}
            onPreMusic={handleTogglePreAudio}
            onNextMusic={handleToggleNextAudio}
          />
          <FplayerModal themeColor={themeColor} />
        </div>
      </div>
    </FPlayerContext.Provider>
  );
};

export default Fplayer;
