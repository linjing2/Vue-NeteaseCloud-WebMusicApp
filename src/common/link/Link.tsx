import React from 'react';
import { NavLink } from 'react-router-dom';
import './index.scss';

interface Props {
  to: string | object;
  children?: any;
  title?: string;
}

const Link: React.FC<Props> = ({ to = '', children = null, title = '' }: Props) => {
  return (
    <NavLink to={to} className="link" activeClassName="active">
      {children ? children : title ? title : null}
    </NavLink>
  );
};

export default Link;
