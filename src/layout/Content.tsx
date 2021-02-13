import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayList from '../pages/playe_list/PlayList';
import Test from '../pages/test/index';

const Content: React.FC = () => {
  
  return (
    <div className="content">
      <Switch>
        <Route path="/play_list" component={PlayList} />
        <Route path="/test" component={Test} />
      </Switch>
    </div>
  );
};

export default Content;
