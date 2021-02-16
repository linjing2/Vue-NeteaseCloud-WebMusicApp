import React from 'react';
import Fplayer from '@/fplayer/index';
import useStores from '@/store/index';
import { toJS } from 'mobx';
import {observer} from 'mobx-react';

const Footer: React.FC = () => {
  const { audioList } = useStores('playMusicStore');
  return (
    <div className="footer">
      <Fplayer themeColor="var(--main-color)" audioList={toJS(audioList)} />
    </div>
  );
};

export default observer(Footer);
