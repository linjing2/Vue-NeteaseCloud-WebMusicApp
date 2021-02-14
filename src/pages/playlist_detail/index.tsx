import React, { useEffect,useState } from 'react';
import { observer } from 'mobx-react';
import { useParams } from 'react-router-dom';
import useStores from '@/store';
import {Spin} from 'antd';
import PlayListInfo from './childsComps/playlist_info/index';

const PlayListDetail: React.FC = () => {
  const { id } = useParams() as { id: string };
  const {getPlayListDetail,spinning,songs,playlistInfo} = useStores('playListDetailStore');

  useEffect(() => {
      getPlayListDetail(id);
  },[id])

  return (
    <div className="playlist_detail">
      <Spin spinning={spinning}>
          <PlayListInfo playlistInfo={playlistInfo} />
      </Spin>
    </div>
  );
};

export default observer(PlayListDetail);
