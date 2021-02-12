import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayList from '../pages/playe_list/PlayList';

const Content: React.FC = () => {
  return (
    <div className="content">
      <Switch>
        <Route path="/play_list" component={PlayList} />
      </Switch>
    </div>
  );
};

export default Content;
