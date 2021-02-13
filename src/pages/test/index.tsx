import React from 'react';
import useStores from '../../store/index';
import {observer} from 'mobx-react';

const Test: React.FC = () => {
  const testStore = useStores('testStore');

  const {count, setCount} = testStore;
  const hanleClick = () => {
    setCount();
  }
  return (
    <div>
      <h4>测试</h4>
      <h4>{count}</h4>
      <button onClick={hanleClick} style={{width: '40px'}}>+</button>
    </div>
  );
};

export default observer(Test);
