import React, { useEffect, useState, useMemo } from 'react';
import { Button, Popover } from 'antd';
import './index.scss';
import { TagList } from '@/store/play_list/defined';

interface Props {
  hotTags: []; //热门标签
  tagLists: Array<TagList>; //全部标签
  handleChange?: (cat: string) => any;
}

const iconList = ['icon-global', 'icon-music', 'icon-kafei', 'icon-biaoqing', 'icon-huatizhuti'];

// Props:
// handleChange(e)导航变化时触发
const NavBar: React.FC<Props> = ({ hotTags = [], tagLists = [], handleChange }: Props) => {
  const [tagName, setTagName] = useState('全部歌单' as string); // 当前标签名

  const handleSubClick = (name: string): void | undefined => {
    setTagName(name);
    if(handleChange)handleChange(name);
  };

  // popover弹出层内容
  const popoverContent = useMemo(
    (): JSX.Element => (
      <div className="popover_content">
        <div className="title">{tagName}</div>
        {tagLists.map((tag: any, index: number) => (
          <div className="tag_container" key={tag.categories.id}>
            <div className="name_wrap">
              <div className="name">
                <span className={`iconfont ${iconList[index]}`} />
                {tag.categories.name}
              </div>
            </div>
            {/* 子标签 */}
            <div className="sub_wrap">
              {tag.subs.map((sub: any, index2: number) => (
                <div
                  className="sub"
                  key={sub.name}
                  onClick={(): void => {
                    handleSubClick(sub.name);
                  }}>
                  <span className={`${sub.name === tagName ? 'active' : ''}`}>{sub.name}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    ),
    [tagLists, tagName]
  );

  // 热门标签
  const hotTagsElements = useMemo(
    () => (
      <div className="hot_tag_wrap">
        {hotTags.map((item: any) => (
          <div
            className="hot_tag"
            key={item.id}
            onClick={(): void => {
              handleSubClick(item.name);
            }}>
            <span className={`${item.name === tagName ? 'active' : ''}`}>{item.name}</span>
          </div>
        ))}
      </div>
    ),
    [hotTags, tagName]
  );

  return (
    <div className="navbar">
      <div className="btn_wrap">
        <Popover trigger="click" content={popoverContent} placement="bottomLeft" autoAdjustOverflow={false}>
          <Button className="btn">
            {tagName}
            <span className="iconfont icon-qian" />
          </Button>
        </Popover>
      </div>
      {hotTagsElements}
    </div>
  );
};

export default NavBar;
