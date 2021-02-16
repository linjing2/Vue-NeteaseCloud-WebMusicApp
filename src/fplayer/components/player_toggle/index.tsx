import React, { useCallback, useEffect, useMemo, useState } from 'react';
import './index.scss';

const preCls = 'fplayer_toggle';

interface FplayerToggleProps {
  isPlaying: boolean; //是否在播放状态,true播放，false暂停
  themeColor?: string;
  onPlaying?: (isPlaying: boolean) => any; //开始暂停播放回调，true正在播放状态
  onLove?: (isLove: boolean) => any; //是否喜欢,true喜欢
  onPreMusic?: () => any; //上一首音乐
  onNextMusic?: () => any; //下一首音乐
  onShare?: () => any; //分享
}
const FplayerToggle: React.FC<FplayerToggleProps> = (props: FplayerToggleProps) => {
  const { themeColor = '', isPlaying, onPlaying, onLove, onPreMusic, onNextMusic, onShare } = props;

  const [innerIsPlaying, setInnerIsPlaying] = useState(false); //是否在播放状态
  const [isLove, setIsLove] = useState(false); //是否喜欢

  useEffect(() => {
    setInnerIsPlaying(isPlaying);
  }, [isPlaying]);
  //事件
  const handleToggle = useCallback(() => {
    setInnerIsPlaying(!innerIsPlaying);
    if (onPlaying) onPlaying(!innerIsPlaying);
  }, [innerIsPlaying, onPlaying]);

  const handleLove = useCallback(() => {
    setIsLove(!isLove);
    if (onLove) onLove(!isLove);
  }, [isLove]);

  const handlePreMusic = useCallback(() => {
    if (onPreMusic) {
      onPreMusic();
    }
  }, [onPreMusic]);

  const handleNextMusic = useCallback(() => {
    if (onNextMusic) onNextMusic();
  }, [onNextMusic]);
  const handleShare = useCallback(() => {
    if (onShare) onShare();
  }, [onShare]);
  const loveClass = useMemo(() => {
    const _class = ['iconfont', isLove ? 'fplayer-xihuan' : 'fplayer-xihuan1'];
    return _class.join(' ');
  }, [isLove]);
  const loveStyle = useMemo(() => {
    return {
      color: isLove ? themeColor : ''
    };
  }, [isLove]);
  const playClass = useMemo(() => {
    const _class = ['iconfont play_icon', innerIsPlaying ? 'fplayer-kaishi' : 'fplayer-zanting'];
    return _class.join(' ');
  }, [innerIsPlaying]);
  const preStyle = useMemo(() => {
    return {
      color: themeColor
    };
  }, [themeColor]);
  const playStyle = useMemo(() => {
    return {
      color: themeColor
    };
  }, [themeColor]);
  const nextStyle = useMemo(() => {
    return {
      color: themeColor
    };
  }, [themeColor]);
  return (
    <div className={preCls}>
      <span className={loveClass} style={loveStyle} onClick={handleLove} />
      <span className="iconfont fplayer-pre" style={preStyle} onClick={handlePreMusic} />
      <span className={playClass} style={playStyle} onClick={handleToggle} />
      <span className="iconfont fplayer-next" style={nextStyle} onClick={handleNextMusic} />
      <span className="iconfont fplayer-fenxiang" onClick={handleShare} />
    </div>
  );
};

export default FplayerToggle;
