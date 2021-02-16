import React, { useState } from 'react';
import { SongTypes } from '@/store/playlist_detail/defined';
import { Table } from 'antd';
import './index.scss';

const columns = [
  {
    title: '',
    dataIndex: 'index',
    render: (text: string, record: any, index: number) => (
      <div>
        <span>{index + 1}</span>
        {/* <span className="iconfont icon-V" /> */}
      </div>
    )
  },
  {
    title: '',
    dataIndex: 'pic',
    render: (src: string) => {
      return (
        <div className="song_pic">
          <img src={src} className="img" />
          <div className="wrap">
            <span className="iconfont icon-bofang1" />
          </div>
        </div>
      );
    }
  },
  {
    title: '歌曲标题',
    dataIndex: 'name',
    key: 'name'
  },
  {
    title: '歌手',
    dataIndex: 'artist',
    key: 'artist'
  },
  {
    title: '专辑',
    dataIndex: 'album',
    key: 'album'
  },
  {
    title: '时间',
    key: 'time',
    dataIndex: 'time'
  }
];

interface Props {
  songList: SongTypes[];
}
const SongList: React.FC<Props> = ({ songList = [] }: Props) => {
  const [playingTag, setPlayingTag] = useState('');
  return (
    <div className="song_list">
      <Table columns={columns} dataSource={songList} pagination={false} />
    </div>
  );
};

export default SongList;
