import React, { useEffect,useMemo,useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import useStores from '@/store';
import {Spin} from 'antd';
import PlayListInfo from './childsComps/playlist_info/index';
import NavBar from '../../components/navbar/index';
import SongList from '@/components/song_list/index';
import {toJS} from 'mobx';

const navConfig = [
  {value: 'songs',label: '歌曲列表'},
  {value: 'recommends',label: '评论'},
]

const PlayListDetail: React.FC = () => {
  const { id } = useParams() as { id: string };
  const [modal, setModal] = useState('songs');
  const {getPlayListDetail,spinning,songs,playlistInfo} = useStores('playListDetailStore');

  useEffect(() => {
      getPlayListDetail(id);
  },[id]);

  const handleChange = (value: string) => {
    setModal(value);
  }

  return (
    <div className="playlist_detail">
      <Spin spinning={spinning}>
          <PlayListInfo playlistInfo={playlistInfo} />
          <NavBar navConfig={navConfig} onChange={handleChange} />
          {
            modal === 'songs' ? <SongList songList={toJS(songs)} /> : null
          }
      </Spin>
    </div>
  );
};

export default observer(PlayListDetail);
