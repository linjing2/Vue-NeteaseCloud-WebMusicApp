import React, { useMemo, useState } from 'react';

import './index.scss';

interface Props {
  playItem: any;
}

const PlayListItem: React.FC<Props> = (props: Props) => {
  const [isShowPlay, setIsShowPlay] = useState(false);

  const { playItem } = props;

  // 播放次数
  const playCount = useMemo(() => {
    const playcount = String(playItem.playCount);
    const { length } = playcount;
    return `${playcount.slice(0, length - 4)}万`;
  }, [playItem]);

  // 鼠标进入
  const handleMouseEnter = (e: React.MouseEvent): void => {
    setIsShowPlay(true);
  };

  // 鼠标离开
  const handleMouseLeave = (): void => {
    setIsShowPlay(false);
  };

  // 添加动画
  const opaTransition = useMemo((): string => (isShowPlay ? 'playicon-enter-active' : 'playicon-leave-active'), [
    isShowPlay
  ]);

  const playIcon = useMemo((): undefined | JSX.Element => {
    if (!isShowPlay) {
      return;
    }
    return (
      <div className="play_icon">
        <span className={`iconfont icon-bofang1 ${opaTransition}`} />
      </div>
    );
  }, [isShowPlay]);

  return (
    <div className="paly_item">
      <div className="img_wrap" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <div className="play_count">
          <span className="iconfont icon-erji icon" />
          {playCount}
        </div>
        <img src={playItem.picUrl || playItem.coverImgUrl} alt="" />
        {playIcon}
      </div>
      <div className="play_item_desc">{playItem.name}</div>
    </div>
  );
};

export default PlayListItem;
