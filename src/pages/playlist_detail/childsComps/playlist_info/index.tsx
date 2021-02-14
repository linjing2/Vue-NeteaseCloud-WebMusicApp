import React, { useCallback, useMemo } from 'react';
import { PlaylistInfoTypes } from '@/store/playlist_detail/defined';
import './index.scss';
import { Tag, Avatar, Button } from 'antd';
import { formatDate } from '@/common/utils/tool';

interface Props {
  playlistInfo: PlaylistInfoTypes;
}
const PlayListInfo: React.FC<Props> = ({ playlistInfo }: Props) => {
  const getCreateDate = useMemo(() => {
    return formatDate(new Date(playlistInfo.createTime), 'yyyy-MM-dd');
  }, [playlistInfo]);

  const getTags = useMemo(() => {
    return playlistInfo.tags && playlistInfo.tags.join(' / ');
  }, [playlistInfo]);

  const onPlayMusic = () => {};
  return (
    <div className="playlist_info">
      <div className="left">
        <img src={playlistInfo.img} />
      </div>
      <div className="right">
        <div className="head_wrap">
          <div className="head_main">
            <h3>
              <Tag style={{ background: 'initial', borderColor: 'var(--main-color', color: 'var(--main-color' }}>
                歌单
              </Tag>
              {playlistInfo.name}
            </h3>
            <div className="create_playlist">
              <Avatar src={playlistInfo.creatorAvatar} size={30}></Avatar>
              <span className="creator-name">{playlistInfo.creatorName}</span>
              <span>创建时间：{getCreateDate}</span>
            </div>
          </div>
          <div className="play">
            <div className="play-left">
              歌曲数
              <br />
              {playlistInfo.trackCount}
            </div>
            <div className="play-right">
              播放数
              <br />
              999
            </div>
          </div>
        </div>
        <div className="main">
          <div className="btn_wrap">
            <Button
              shape="round"
              style={{ border: 'none', background: 'var(--main-color)', color: '#fff' }}
              className="button"
              onClick={onPlayMusic}>
              <i className="iconfont icon-bofang" />
              播放全部
            </Button>
            <Button shape="round" className="button">
              <i className="iconfont icon-shoucang" />
              收藏({playlistInfo.subscribedCount})
            </Button>
            <Button shape="round" className="button">
              <i className="iconfont icon-fenxiang" />
              分享({playlistInfo.shareCount})
            </Button>
          </div>
          <div className="desc">
            <p>
              标签：
              <span>{getTags}</span>
            </p>
            <p className="desc_title">简介：{playlistInfo.title}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlayListInfo;
