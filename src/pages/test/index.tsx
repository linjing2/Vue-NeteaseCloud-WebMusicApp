import React, { useEffect, useState } from 'react';
import useStores from '../../store/index';
import TestCom from './childsComps/test';
import Progress from '../../fplayer/components/progress/index';
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

  return (
    <div className="test">
      <TestCom />
      <div className="item">
        <Progress percent={percent} strokeWidth={8} strokeColor={['pink','rgba(237, 72, 123, 1)']} />
        <div className="btn_wrap">
          <button onClick={() => handleClick(5)}>+</button>
          <button onClick={() => handleClick(-5)}>-</button>
        </div>
      </div>
      <div className="vertical_wrap">
        <div className="vertical_item">
          <Progress vertical percent={percent} strokeColor={['pink','rgba(237, 72, 123, 1)']} strokeWidth={8} />
          <div className="btn_wrap">
            <button onClick={() => handleClick(5)}>+</button>
            <button onClick={() => handleClick(-5)}>-</button>
          </div>
        </div>
        <div className="vertical_item">
          <Progress vertical percent={percent2} disableTransition trackColor="pink" />
          <div className="btn_wrap">
            <button onClick={() => handleClick(1, true)}>+</button>
            <button onClick={() => handleClick(-1, true)}>-</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;
