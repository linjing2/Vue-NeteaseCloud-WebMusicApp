import React from 'react';
import Fplayer from '@/fplayer/index';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <Fplayer themeColor="var(--main-color)" />
    </div>
  );
};

export default Footer;
