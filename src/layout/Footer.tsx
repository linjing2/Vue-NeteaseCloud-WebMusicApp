import React from 'react';
import Fplayer from '@/fplayer/index';
import useStores from '@/store/index';
import { toJS } from 'mobx';
import { observer } from 'mobx-react';
import { AudioType } from '@/fplayer/defined';

const Footer: React.FC = () => {
  const { audioList, defaultAudioIndex, setCurrentAudio } = useStores('playMusicStore');
  const handleChange = (audio: AudioType) => {
    setCurrentAudio(audio);
  };
  return (
    <div className="footer">
      <Fplayer
        themeColor="var(--main-color)"
        audioList={toJS(audioList)}
        defaultAudioIndex={toJS(defaultAudioIndex)}
        onChange={handleChange}
      />
    </div>
  );
};

export default observer(Footer);
