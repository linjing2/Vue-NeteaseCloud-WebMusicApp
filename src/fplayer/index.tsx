import React, { createContext, useCallback, useEffect, useRef, useState, useMemo } from 'react';
import './index.scss';
import { FplayerProps, defaultCurrentAudio, AudioType, audioSchema } from './defined';
import Progress from './common/progress/index';
import SongInfo from './components/songInfo/index';
import FplayerToggle from './components/player_toggle/index';
import FplayerModal from './components/player_modal';

export const preCls = 'fplayer';
export const FPlayerContext = createContext({} as any);

const Fplayer: React.FC<FplayerProps> = (props: FplayerProps) => {
  const { themeColor = '#2d8cf0', audioList = [], defaultAudioIndex, autoPlay = true, onChange } = props;

  const audioRef = useRef({} as HTMLAudioElement);
  const [currentAudio, setCurrentAudio] = useState(defaultCurrentAudio as AudioType); //当前音频
  const [currentAudioIndex, setCurrentAudioIndex] = useState(0); //正在播放音乐的音频在audioList中的下标
  const [isAudioLoading, setIsAudioLoading] = useState(false); //是否在加载音频
  const [isPlaying, setIsPlaying] = useState(false); //播放是否在,true是，false暂停
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0); //audio总时长
  const [isAudioProgressDrag, setIsAudioProgressDrag] = useState(false); //是否在拖拽设置音乐进度
  const [audioPercent, setAudioPercent] = useState(0);
  const [innerAudioList, setInnerAudioList] = useState([] as Array<AudioType>);
  const [schemaIndex, setSchemaIndex] = useState(0);
  const [volumePercent, setVolumePercent] = useState(100);//音量
  const [mockVolumePercent, setMockVolumePercent] = useState(100);

  //处理audioList
  useEffect(() => {
    setCurrentAudioIndex(0);
    if (audioList.length) {
      const flag = audioList.every(item => typeof item.index === 'number');
      let _innerAudioList = [];
      if (flag) {
        _innerAudioList = audioList.sort((a: any, b: any) => {
          return a.index - b.index;
        });
        setInnerAudioList(_innerAudioList);
      } else {
        setInnerAudioList(audioList);
      }
    }

    if (!innerAudioList.length) return;
    if (defaultAudioIndex) {
      setCurrentAudio(innerAudioList[defaultAudioIndex]);
      setCurrentAudioIndex(defaultAudioIndex);
    } else if (innerAudioList.length) {
      setCurrentAudio(innerAudioList[0]);
      setCurrentAudioIndex(0);
    }
  }, [audioList, innerAudioList, defaultAudioIndex]);

  //处理拖拽设置音乐进度
  useEffect(() => {
    const newCurrentTime = (audioRef.current.duration * audioPercent) / 100;
    if (newCurrentTime && !isAudioProgressDrag) {
      audioRef.current.currentTime = newCurrentTime;
    }
  }, [isAudioProgressDrag]);

  //设置volume
  useEffect(() => {
    audioRef.current.volume = volumePercent / 100;
  },[volumePercent,audioRef]);

  const currentAudioUrl = useMemo(() => {
    if (currentAudio && currentAudio.url) {
      return currentAudio.url;
    } else {
      return '';
    }
  }, [currentAudio]);

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
    if (onChange) onChange(currentAudio);
  }, [isPlaying, currentAudio, onChange]);

  const handleAudioPause = useCallback(() => {
    setIsPlaying(false);
  }, [isPlaying]);

  const handleAudioEnded = useCallback(() => {
    setIsPlaying(false);
    const newCurrentAudioIndex = currentAudioIndex + 1;
    toggleAudio(true, newCurrentAudioIndex);
  }, [currentAudioIndex, isPlaying]);

  const handleAudioError = (err: any) => {
    if (!audioList.length) return;
    console.log('音频加载错误');
    console.log(err);
    toggleAudio(true, currentAudioIndex + 1);
  };

  const handleAudioTimeUpdate = () => {
    if (!isAudioProgressDrag) {
      const newCurrentTime = audioRef.current.currentTime * 1000;
      setCurrentTime(newCurrentTime); //media currentTime单位s
      setAudioPercent((newCurrentTime / duration) * 100);
    }
  };

  /**功能函数 */
  //设置指定音频
  /**
   *
   * @param isAutoToggle 是否自动切换歌曲，false不会考虑schema
   * @param newCurrentAudioIndex
   */
  const toggleAudio = (isAutoToggle: boolean, newCurrentAudioIndex: number) => {
    if (isAutoToggle) {
      console.log(schemaIndex, audioSchema.RANDOM);

      switch (schemaIndex) {
        case audioSchema.ORDER:
          break;
        case audioSchema.RANDOM:
          newCurrentAudioIndex = Math.floor(Math.random() * innerAudioList.length); //随机播放
          console.log(newCurrentAudioIndex);
          break;
        case audioSchema.LOOP:
          newCurrentAudioIndex = currentAudioIndex;
      }
    }
    //区间效验
    if (newCurrentAudioIndex < 0) {
      newCurrentAudioIndex = innerAudioList.length - 1;
    } else if (newCurrentAudioIndex > innerAudioList.length - 1) {
      newCurrentAudioIndex = 0;
    }
    setCurrentAudioIndex(newCurrentAudioIndex);
    setCurrentAudio(innerAudioList[newCurrentAudioIndex]);
  };

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
    toggleAudio(false, currentAudioIndex - 1);
  }, [currentAudioIndex]);

  const handleToggleNextAudio = useCallback(() => {
    toggleAudio(false, currentAudioIndex + 1);
  }, [currentAudioIndex]);

  const handleAudioProgressChange = useCallback((percent: number, isDrag: boolean) => {
    setAudioPercent(percent);
    if (!isDrag) {
      audioRef.current.currentTime = (percent / 100) * audioRef.current.duration;
    }
  }, []);

  const handleAudioProgressDragStart = useCallback(() => {
    setIsAudioProgressDrag(true);
  }, [isAudioProgressDrag]);

  const handleAudioProgressDragEnded = useCallback(() => {
    setIsAudioProgressDrag(false);
  }, [isAudioProgressDrag]);

  //切换播放方式
  const handlePlaySchemaChange = useCallback(
    (schemaIndex: number) => {
      console.log(schemaIndex);

      setSchemaIndex(schemaIndex);
    },
    [schemaIndex]
  );

  //volume
  //切换volume
  const handleToggleVolume = useCallback((isDisableVolume: boolean) => {
    if(isDisableVolume){
      setMockVolumePercent(volumePercent);
      setVolumePercent(0);
    } else {
      setVolumePercent(mockVolumePercent);
    }
  }, [volumePercent,mockVolumePercent]);

  const handleVulumeChange = useCallback((percent: number) => {
    setVolumePercent(percent);
  },[volumePercent]);

  return (
    <FPlayerContext.Provider value={currentAudio}>
      <audio
        src={currentAudioUrl}
        autoPlay={autoPlay}
        ref={audioRef}
        loop={schemaIndex === audioSchema.LOOP ? true : false}
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
            loading={isAudioLoading}
            thumb
            hoverShowThumb
            allowClick
            allowDrag
            onChange={handleAudioProgressChange}
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
          <FplayerModal
            themeColor={themeColor}
            volumePercent={volumePercent}
            onPlaySchemaChange={handlePlaySchemaChange}
            onToggleDisableVolume={handleToggleVolume}
            onVolumeChange={handleVulumeChange}
          />
        </div>
      </div>
    </FPlayerContext.Provider>
  );
};

export default Fplayer;
