import { request } from './request';

export function getHighquality(limit: number, cat = '全部'): any {
  return request({
    url: '/top/playlist/highquality',
    params: {
      limit
    }
  });
}

// 获取歌单分类
export function getCatList(): any {
  return request({
    url: '/playlist/catlist'
  });
}

// 热门歌单分类
export function getMusicListHotTag(): any {
  return request({
    url: '/playlist/hot'
  });
}

// 歌单，网友精选谍
export function getPlayList(cat: string, limit: number, offset: number): any {
  return request({
    url: '/top/playlist',
    params: {
      cat,
      limit,
      offset,
      order: 'hot',
    }
  });
}
