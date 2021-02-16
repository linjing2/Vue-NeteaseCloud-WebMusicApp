import React, { createContext } from 'react';
import './index.scss';
import { FplayerProps } from './defined';
import Progress from './common/progress/index';
import SongInfo from './components/songInfo/index';
import FplayerToggle from './components/player_toggle/index';
import FplayerModal from './components/player_modal';

export const preCls = 'fplayer';
export const FPlayerContext = createContext({} as any);

const Fplayer: React.FC<FplayerProps> = (props: FplayerProps) => {
  const { themeColor = '#2d8cf0' } = props;
  return (
    <FPlayerContext.Provider value={null}>
      <audio></audio>
      <div className="fplayer">
        <div className="fplayer_head">
          <Progress percent={40} strokeColor={themeColor} />
        </div>
        <div className="fplayer_main">
          <SongInfo />
          <FplayerToggle themeColor={themeColor} />
          <FplayerModal themeColor={themeColor} />
        </div>
      </div>
    </FPlayerContext.Provider>
  );
};

export default Fplayer;
