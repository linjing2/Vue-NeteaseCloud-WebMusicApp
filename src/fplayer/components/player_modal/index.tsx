import React, { useCallback, useMemo, useState } from 'react';
import './index.scss';
import { BaseProps } from '../../defined';
import Progress from '../../common/progress/index';

const preCls = 'fplayer_modal';

interface FplayerModalProps extends BaseProps {}
const FplayerModal: React.FC<FplayerModalProps> = (props: FplayerModalProps) => {
  const { themeColor = '' } = props;

  const [schemaIndex, setSchemaIndex] = useState(0);
  const [isDisableVolume, setDisableVolume] = useState(false); //是否禁音,true为禁音
  const [isShowLyric, setIsShowLyric] = useState(false); //是否显示歌词
  const [isShowPlayList, setIsShowPlayList] = useState(false); //是否显示播放列表
  const [isShowVolumeContainer, setIsShowVolumeContainer] = useState(false);

  //事件
  //播放模式
  const handleToggleModal = useCallback(() => {
    if (schemaIndex >= 2) {
      setSchemaIndex(0);
    } else {
      const _schemaIndex = schemaIndex + 1;
      setSchemaIndex(_schemaIndex);
    }
  }, [schemaIndex]);

  const handleDisableVolume = useCallback(() => {
    setDisableVolume(!isDisableVolume);
  }, [isDisableVolume]);

  const handleVolumeMouseEnter = useCallback(() => {
    setIsShowVolumeContainer(true);
  }, [isShowVolumeContainer]);

  const handleVolumeMouseLeave = useCallback(() => {
    setIsShowVolumeContainer(false);
  }, [isShowVolumeContainer]);

  const handleIsPlayListClick = useCallback(() => {
    setIsShowPlayList(!isShowPlayList);
  }, [isShowPlayList]);

  const handleIsShowLricClick = useCallback(() => {
    setIsShowLyric(!isShowLyric);
  }, [isShowLyric]);

  //获取播放模式图标,提示
  const getModalType = useMemo(() => {
    let icon = 'shunxubofang';
    let title = '顺序播放';
    switch (schemaIndex) {
      case 0:
        icon = 'shunxubofang';
        title = '顺序播放';
        break;
      case 1:
        icon = 'suijibofang';
        title = '随机播放';
        break;
      case 2:
        icon = 'danquxunhuan';
        title = '单曲循环';
        break;
    }
    return { icon, title };
  }, [schemaIndex]);

  const pModalCls = useMemo(() => {
    const _class = ['item iconfont', `fplayer-${getModalType.icon}`];
    return _class.join(' ');
  }, [getModalType]);

  const volumeCls = useMemo(() => {
    const _class = ['item iconfont volume', isDisableVolume ? 'fplayer-volume1' : 'fplayer-volume'];
    return _class.join(' ');
  }, [isDisableVolume]);

  const playListStyle = useMemo(() => {
    return {
      color: isShowPlayList ? themeColor : ''
    };
  }, [isShowPlayList]);
  const lyricStyle = useMemo(() => {
    return {
      color: isShowLyric ? themeColor : ''
    };
  }, [isShowLyric]);

  return (
    <div className={preCls}>
      <a href="#" className={pModalCls} title={getModalType.title} onClick={handleToggleModal} />
      <a
        href="#"
        className="item iconfont fplayer-bofangliebiao"
        title="播放列表"
        style={playListStyle}
        onClick={handleIsPlayListClick}
      />
      <a
        href="#"
        className="item iconfont fplayer-lyric"
        style={lyricStyle}
        title="歌词"
        onClick={handleIsShowLricClick}
      />
      <a
        href="#"
        className={volumeCls}
        title="音量"
        onClick={handleDisableVolume}
        onMouseEnter={handleVolumeMouseEnter}
        onMouseLeave={handleVolumeMouseLeave}>
        {isShowVolumeContainer ? (
          <div className={`${preCls}_volume_container`}>
            <Progress percent={40} vertical strokeWidth={4} strokeColor={themeColor} />
          </div>
        ) : null}
      </a>
      <a href="https://gitee.com/fudaosheng/fplayer" className="item iconfont fplayer-github" title="代码仓库" />
    </div>
  );
};

export default FplayerModal;
