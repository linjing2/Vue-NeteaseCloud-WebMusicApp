import React, { useState, useContext, useMemo, useCallback } from 'react';
import './index.scss';
import { FPlayerContext } from '../../index';
import { formatDate } from '../../utils/tool';

const preCls = 'fplayer_song_info';

interface Props {
  duration: number;
  currentTime: number;
}

const SongInfo: React.FC<Props> = (props: Props) => {
  const { duration = 0, currentTime = 0 } = props;

  const [isShow, setIsShow] = useState(false);
  const currentAudio = useContext(FPlayerContext);

  const fmtDuration = useMemo(() => {
    return formatDate(new Date(duration), 'mm:ss');
  }, [duration]);

  const fmtCurrentTime = useMemo(() => {
    return formatDate(new Date(currentTime), 'mm:ss');
  }, [currentTime]);

  const handleMousenter = () => {
    setIsShow(true);
  };
  const hanleMouseLeave = () => {
    setIsShow(false);
  };
  return (
    <div className={preCls}>
      <div className={`${preCls}_pic`} onMouseEnter={handleMousenter} onMouseLeave={hanleMouseLeave}>
        {currentAudio.cover ? <img src={currentAudio.cover} alt="" /> : null}
        {isShow ? (
          <div className={`${preCls}_pic_wrap`}>
            <span className="iconfont fplayer-zhankaishangxia"></span>
          </div>
        ) : null}
      </div>
      <div className={`${preCls}_info`}>
        <div>
          <span className={`${preCls}_info_songname`}>{currentAudio.name || 'name'}</span>
          <i>-</i>
          {currentAudio.artist || 'artist'}
        </div>
        <div>
          {fmtCurrentTime}
          <i>/</i>
          {fmtDuration}
        </div>
      </div>
    </div>
  );
};

export default SongInfo;
