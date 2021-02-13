import React from 'react';

import './index.scss';
import PlayListItem from '../play_list_item/PlayListItem';

interface Props {
  playList: any[];
}

const PlayList: React.FC<any> = (props: Props) => (
  <div className="play_list">
    {props.playList.map((item, index) => (
      <PlayListItem playItem={item} key={item.id} />
    ))}
  </div>
);

export default PlayList;
