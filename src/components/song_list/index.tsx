import React, { useCallback, useState } from 'react';
import { SongTypes } from '@/store/playlist_detail/defined';
import { Table } from 'antd';
import './index.scss';
import useStores from '@/store/index';
import { observer } from 'mobx-react';
interface Props {
  songList: SongTypes[];
  onPlayMusic: (index: number) => any;
}
const SongList: React.FC<Props> = ({ songList = [], onPlayMusic }: Props) => {
  const [playingTag, setPlayingTag] = useState('');

  const { currentAudio } = useStores('playMusicStore');

  const handlePlayMusic = useCallback(
    index => {
      if (onPlayMusic) onPlayMusic(index);
    },
    [onPlayMusic]
  );

  const columns = [
    {
      title: '',
      dataIndex: 'index',
      render: (text: string, record: any, index: number) => (
        <div>{currentAudio.id === record.id ? <span className="iconfont icon-V" /> : <span>{index + 1}</span>}</div>
      )
    },
    {
      title: '',
      dataIndex: 'pic',
      render: (src: string, record: any, index: number) => {
        return (
          <div className="song_pic">
            <img src={src} className="img" />
            <div className="wrap" onClick={() => handlePlayMusic(index)}>
              <span className="iconfont icon-bofang1" />
            </div>
          </div>
        );
      }
    },
    {
      title: '歌曲标题',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: any) => {
        return <span className={`${currentAudio.id === record.id ? 'active' : ''}`}>{text}</span>;
      }
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

  return (
    <div className="song_list">
      <Table columns={columns} dataSource={songList} pagination={false} />
    </div>
  );
};

export default observer(SongList);
