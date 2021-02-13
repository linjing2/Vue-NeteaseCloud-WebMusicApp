import React, { useCallback, useMemo } from 'react';
import { FProgressProps } from './define';
import './index.scss';

const Progress: React.FC<FProgressProps> = (props: FProgressProps) => {
  const {
    percent = 1,
    vertical = false,
    disableTransition = false,
    trackColor = '',
    strokeColor = '',
    strokeWidth = ''
  } = props;

  //计算百分比
  const getPercent = useMemo(() => {
    let _percent = 0;
    _percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    return _percent;
  }, [percent]);

  const progressClass = useMemo(() => {
    const _class = ['f_progress', vertical ? 'f_progress_vertical' : ''];
    return _class.join(' ');
  }, [vertical]);

  const progressStyle = useMemo(() => {
    return {
      background: trackColor,
      height: vertical ? '' : typeof strokeWidth === 'string' ? strokeWidth : `${strokeWidth}px`,
      width: vertical ? (typeof strokeWidth === 'string' ? strokeWidth : `${strokeWidth}px`) : ''
    };
  }, [trackColor, strokeWidth, vertical]);

  const innerClass = useMemo(() => {
    const _class = ['f_progress_inner', vertical ? 'f_progress_vertical_inner' : ''];
    return _class.join(' ');
  }, [vertical]);

  const innerStyle = useMemo(() => {
    return {
      width: vertical ? '100%' : `${getPercent}%`,
      height: vertical ? `${getPercent}%` : '100%',
      transition: disableTransition ? 'none' : '',
      background:
        typeof strokeColor === 'string'
          ? strokeColor
          : `linear-gradient(to ${vertical ? 'top' : 'right'}, ${strokeColor[0]},${strokeColor[1]})`
    };
  }, [getPercent, vertical, disableTransition, strokeColor]);
  return (
    <div className={progressClass} style={progressStyle}>
      <div className={innerClass} style={innerStyle}></div>
    </div>
  );
};

export default Progress;
