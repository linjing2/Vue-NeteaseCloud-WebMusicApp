import React from 'react';
import { Button } from 'antd';
import './index.scss';
import { HigCover, defaultHigCover } from '@/store/play_list/defined';

interface Props {
  higCover: HigCover;//需要的数据
}

const BoutiquePlayList: React.FC<Props> = ({ higCover = defaultHigCover }: Props) => {
  return higCover ? (
    <div className="boutique">
      <div className="left">
        <img src={higCover.coverImgUrl} alt="" />
      </div>
      <div className="center">
        <Button className="button" ghost>
          <span className="iconfont icon-huiyuan- icon" />
          精品歌单
        </Button>
        <div>
          <h3>{higCover.name}</h3>
          <p>{higCover.copywriter}</p>
        </div>
      </div>
      <div className="right">
        <div className="bg"></div>
      </div>
    </div>
  ) : null;
};

export default BoutiquePlayList;
