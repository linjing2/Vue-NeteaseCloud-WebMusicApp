import React, { useEffect, useState } from 'react';
import BoutiquePlayList from './childComps/boutique_play_list/BoutiquePlayList';
import NavBar from './childComps/navbar/NavBar';
import useStores from '@/store/index';
import { Spin, Pagination } from 'antd';
import { observer } from 'mobx-react';
import PlayListComp from '@/components/play_list/PlayList';
import './index.scss';

const PlayList: React.FC = () => {
  const { higCover, hotTags, tagLists, isSpinning, playlists, pagination, setPagination, getData, setCat } = useStores(
    'playListStore'
  );
  useEffect(() => {
    getData();
  }, []);

  const handleChange = (page: number, pageSize: number) => {
    setPagination(page, pageSize);
  };

  const handleCatChange = (cat: string) => {
    setCat(cat);
  };

  return (
    <Spin spinning={isSpinning}>
      <div className="musiclist">
        <BoutiquePlayList higCover={higCover} />
        <NavBar hotTags={hotTags} tagLists={tagLists} handleChange={handleCatChange} />
        <PlayListComp playList={playlists} />
        <div className="pagination_wrap">
          <Pagination className="pagination" showQuickJumper {...pagination} onChange={handleChange} />
        </div>
      </div>
    </Spin>
  );
};

export default observer(PlayList);
