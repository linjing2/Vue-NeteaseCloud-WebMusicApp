import React from 'react';
import Link from '../common/link/Link';
import { Redirect } from 'react-router-dom';

const Asider: React.FC = () => {
  const routes = [
    {
      to: '/play_list',
      title: '歌单'
    },
    {
      to: '/test',
      title: '测试',
    }
  ];
  return (
    <div className="asider">
      {routes.map(item => {
        return <Link key={item.to} {...item} />;
      })}
      <Redirect to="/play_list" />
    </div>
  );
};

export default Asider;
