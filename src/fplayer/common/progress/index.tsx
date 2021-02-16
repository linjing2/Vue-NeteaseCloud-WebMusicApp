import React, { MouseEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { FProgressProps, RectPos, defaultRectPos } from './define';
import './index.scss';

const Progress: React.FC<FProgressProps> = (props: FProgressProps) => {
  const {
    percent = 1,
    vertical = false,
    disableTransition = false,
    trackColor = '',
    strokeColor = '',
    strokeWidth = '',
    thumb = false,
    hoverShowThumb = false,
    thumbColor = '',
    thumbWidth = '',
    showthumbCircle = false,
    thumbCircleColor = '',
    loading = false,
    allowClick = false,
    allowDrag = false,
    onChange
  } = props;

  const progressRef = useRef({} as HTMLDivElement);
  const [isHoverShowThumb, setIsHoverShowThumb] = useState(false);
  const [isDrag, setIsDrag] = useState(false);
  const [rectPos, setRectPos] = useState(defaultRectPos as RectPos);

  //初始化
  useEffect(() => {
    if (allowDrag && thumb) {
      const _rectPos = progressRef.current.getBoundingClientRect();
      setRectPos(_rectPos);
    }
  }, [allowDrag, thumb]);

  //计算百分比
  const getPercent = useMemo((): number => {
    let _percent = 0;
    _percent = percent > 100 ? 100 : percent < 0 ? 0 : percent;
    return _percent;
  }, [percent]);

  //getPercent是否为0，不等于0为true
  const isPercentEqual0 = useMemo(() => {
    return getPercent !== 0 ? true : false;
  }, [getPercent]);

  //计算thumb尺寸
  const getThumbSize = useMemo(() => {
    if (!strokeWidth) return;
    let _strokeWidth = typeof strokeWidth === 'string' ? parseInt(strokeWidth.slice(0, -2), 10) : strokeWidth;
    let _thubmSize;
    switch (_strokeWidth) {
      case 1:
        _thubmSize = 6;
        break;
      case 2:
        _thubmSize = 10;
        break;
      case 3:
        _thubmSize = 12;
        break;
      default:
        break;
    }
    return _thubmSize;
  }, [strokeWidth]);

  //获取stroke宽度
  const getStrokeWidth = useMemo((): number => {
    return typeof strokeWidth === 'string' ? parseInt(strokeWidth.slice(0, -2), 10) : strokeWidth;
  }, [strokeWidth]);

  const progressClass = useMemo(() => {
    const _class = [
      'f_progress',
      vertical ? 'f_progress_vertical' : '',
      loading ? (vertical ? 'f_progress_vertical_loading' : 'f_progress_loading') : ''
    ];
    return _class.join(' ');
  }, [vertical, loading]);

  const progressStyle = useMemo(() => {
    return {
      background: trackColor,
      height: vertical ? '' : `${getStrokeWidth}px`,
      width: vertical ? `${getStrokeWidth}px` : ''
    };
  }, [trackColor, vertical, getStrokeWidth]);

  const innerClass = useMemo(() => {
    const _class = ['f_progress_inner', vertical ? 'f_progress_vertical_inner' : ''];
    return _class.join(' ');
  }, [vertical]);

  const innerStyle = useMemo(() => {
    return {
      width: vertical ? '100%' : `${getPercent}%`,
      height: vertical ? `${getPercent}%` : '100%',
      transition: isDrag ? 'none' : disableTransition ? 'none' : '',
      borderRadius: `${getStrokeWidth}px`,
      background:
        typeof strokeColor === 'string'
          ? strokeColor
          : `linear-gradient(to ${vertical ? 'top' : 'right'}, ${strokeColor[0]},${strokeColor[1]})`
    };
  }, [getPercent, vertical, disableTransition, strokeColor, getStrokeWidth, isDrag]);

  const thumbClass = useMemo(() => {
    const _class = ['f_progress_thumb', vertical ? 'f_progress_vertical_thumb' : ''];
    return _class.join(' ');
  }, [vertical]);

  const thumbStyle = useMemo(() => {
    return {
      width: thumbWidth ? (typeof thumbWidth === 'string' ? thumbWidth : `${thumbWidth}px`) : `${getThumbSize}px`,
      height: thumbWidth ? (typeof thumbWidth === 'string' ? thumbWidth : `${thumbWidth}px`) : `${getThumbSize}px`,
      background: thumbColor
    };
  }, [thumbWidth, getThumbSize, thumbColor]);

  const thumbCircleClass = useMemo(() => {
    const _class = ['f_progress_thumb_circle'];
    return _class.join(' ');
  }, []);

  const thumbCircleStyle = useMemo(() => {
    return {
      width: `${getStrokeWidth}px`,
      height: `${getStrokeWidth}px`,
      background: thumbCircleColor
    };
  }, [getStrokeWidth, thumbCircleColor]);

  //事件
  const handleProgressMouseEnter = () => {
    if (hoverShowThumb) {
      setIsHoverShowThumb(true);
    }
  };

  const handleProgressMouseLeave = () => {
    if (hoverShowThumb) {
      setIsHoverShowThumb(false);
    }
  };

  const handleProgressClick = useCallback(
    (e: MouseEvent) => {
      if (!allowClick) return;
      if (isDrag) return;
      const { clientX, clientY } = e;
      const { left, bottom, width, height } = progressRef.current.getBoundingClientRect();
      let _percent = 0;
      if (vertical) {
        _percent = ((bottom - clientY) / height) * 100;
      } else {
        _percent = ((clientX - left) / width) * 100;
      }
      if (onChange) onChange(_percent);
    },
    [allowClick, isDrag, vertical, progressRef]
  );

  const handleThumbMouseDown = (e: any) => {
    if (!allowDrag) return;
    const _rectPos = progressRef.current.getBoundingClientRect();
    setRectPos(_rectPos);
    setIsDrag(true);
    document.body.style.userSelect = 'none';

    document.addEventListener('mousemove', handleThumbMouseMove);
    document.addEventListener('mouseup', handleThumbMouseUp);
  };

  const handleThumbMouseMove = (e: any): any => {
    const { left, bottom, width, height } = rectPos;
    if (!(left && bottom && width && height)) return;
    const { clientX, clientY } = e;

    let _percent = percent;
    if (vertical) {
      _percent = ((bottom - clientY) / height) * 100;
    } else {
      _percent = ((clientX - left) / width) * 100;
    }
    _percent = _percent > 100 ? 100 : _percent < 0 ? 0 : _percent;
    if (onChange) onChange(_percent);
  };

  const handleThumbMouseUp = (e: any) => {
    document.removeEventListener('mousemove', handleThumbMouseMove);
    document.removeEventListener('mousedown', handleThumbMouseDown);
    document.removeEventListener('mouseup', handleThumbMouseUp);
    setIsDrag(false);
    document.body.style.userSelect = 'initial';
  };

  //thumb节点
  const thumbElement = useMemo(() => {
    const _thumbElement = isPercentEqual0 ? (
      <div className={thumbClass} style={thumbStyle} onMouseDown={handleThumbMouseDown}>
        {showthumbCircle ? <div className={thumbCircleClass} style={thumbCircleStyle} /> : null}
      </div>
    ) : null;
    if (thumb) {
      return hoverShowThumb ? (isHoverShowThumb ? _thumbElement : null) : _thumbElement;
    } else {
      return null;
    }
  }, [thumb, hoverShowThumb, isHoverShowThumb, isPercentEqual0, thumbCircleClass, thumbCircleStyle, showthumbCircle]);
  return (
    <div
      ref={progressRef}
      className={progressClass}
      style={progressStyle}
      onMouseEnter={handleProgressMouseEnter}
      onMouseLeave={handleProgressMouseLeave}
      onClick={handleProgressClick}>
      <div className={innerClass} style={innerStyle}>
        {thumbElement}
      </div>
    </div>
  );
};

export default Progress;
