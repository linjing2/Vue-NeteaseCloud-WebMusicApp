import React, { useState } from 'react';
import './index.scss';

const preCls = 'fplayer_song_info';

const SongInfo: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  const handleMousenter = () => {
    setIsShow(true);
  };
  const hanleMouseLeave = () => {
    setIsShow(false);
  };
  return (
    <div className={preCls}>
      <div className={`${preCls}_pic`} onMouseEnter={handleMousenter} onMouseLeave={hanleMouseLeave}>
        {isShow ? (
          <div className={`${preCls}_pic_wrap`}>
            <span className="iconfont fplayer-zhankaishangxia"></span>
          </div>
        ) : null}
      </div>
      <div className={`${preCls}_info`}>
        <div>
          <span className={`${preCls}_info_songname`}>通透</span>
          <i>-</i>
          陈逸云
        </div>
        <div>
          00:07
          <i>/</i>
          04:45
        </div>
      </div>
    </div>
  );
};

export default SongInfo;
