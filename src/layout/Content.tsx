import React from 'react';
import { Route, Switch } from 'react-router-dom';
import PlayList from '../pages/playelist';
import Test from '../pages/test/index';
import PlayListDetail from '@/pages/playlist_detail/index';

const Content: React.FC = () => {

  const routesConfig = [
    {path: '/play_list', component: PlayList},
    {path: '/test', component: Test},
    {path: '/playlist_detail/:id', component: PlayListDetail},
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
