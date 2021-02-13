import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayList from '../pages/playe_list';
import Test from '../pages/test/index';

const Content: React.FC = () => {

  const routesConfig = [
    {path: '/play_list', component: PlayList},
    {path: '/test', component: Test},
  ]
  
  return (
    <div className="content">
      <Switch>
        {
          routesConfig.map(route => {
            return (<Route key={route.path} {...route} />)
          })
        }
      </Switch>
    </div>
  );
};

export default Content;
