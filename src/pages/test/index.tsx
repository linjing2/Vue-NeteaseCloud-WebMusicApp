import React, { useEffect, useState } from 'react';
import useStores from '../../store/index';
import TestCom from './childsComps/test';
import Progress from '@/fplayer/common/progress/index';
import './index.scss';

const Test: React.FC = () => {
  const [percent, setPercent] = useState(0);
  const [percent2, setPercent2] = useState(0);

  const handleClick = (count: number, flag: boolean = false) => {
    if (flag) {
      setPercent2(percent2 + count);
    } else {
      setPercent(percent + count);
    }
  };

  const onChange = (percent: number) => {
    setPercent(percent);
  };

  return (
    <div className="test">
      <TestCom />
      <h4>默认</h4>
      <div className="item">
        <Progress
          percent={percent}
          strokeColor={['pink', 'rgba(237, 72, 123, 1)']}
          thumb
          allowDrag
          allowClick
          hoverShowThumb
          loading={true}
          onChange={onChange}
        />
        <div className="btn_wrap">
          <button onClick={() => handleClick(5)}>+</button>
          <button onClick={() => handleClick(-5)}>-</button>
        </div>
      </div>
      <h4>垂直</h4>
      <div className="vertical_wrap">
        <div className="vertical_item">
          <Progress
            vertical
            percent={percent}
            strokeColor={['pink', 'rgba(237, 72, 123, 1)']}
            strokeWidth={2}
            thumb
            loading
            onChange={onChange}
          />
          <div className="btn_wrap">
            <button onClick={() => handleClick(5)}>+</button>
            <button onClick={() => handleClick(-5)}>-</button>
          </div>
        </div>
        <div className="vertical_item">
          <Progress
            strokeWidth={3}
            vertical
            percent={percent2}
            disableTransition
            trackColor="pink"
            thumbColor="green"
          />
          <div className="btn_wrap">
            <button onClick={() => handleClick(1, true)}>+</button>
            <button onClick={() => handleClick(-1, true)}>-</button>
          </div>
        </div>
        <div className="vertical_item">
          <Progress strokeWidth="2px" vertical percent={percent} trackColor="pink" thumbWidth={10} />
          <div className="btn_wrap">
            <button onClick={() => handleClick(5)}>+</button>
            <button onClick={() => handleClick(-5)}>-</button>
          </div>
        </div>
        <div className="vertical_item">
          <Progress strokeWidth="3px" vertical percent={percent} trackColor="pink" thumbWidth="15px" />
          <div className="btn_wrap">
            <button onClick={() => handleClick(5)}>+</button>
            <button onClick={() => handleClick(-5)}>-</button>
          </div>
        </div>
        <div className="vertical_item">
          <Progress strokeWidth="4px" vertical percent={percent} trackColor="pink" />
          <div className="btn_wrap">
            <button onClick={() => handleClick(5)}>+</button>
            <button onClick={() => handleClick(-5)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
