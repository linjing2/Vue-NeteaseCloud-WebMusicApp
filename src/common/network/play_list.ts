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

//获取歌单详情
export function getPlayListDetail(id: string){
  return request({
    url:'/playlist/detail',
    params:{
      id,
    }
  })
}

//获取歌曲信息
/**获取歌单歌曲信息 */
export function getSongsDetail(ids: string | string[]){
  return request({
      url:'/song/detail',
      params:{
          ids:ids
      }
  })
}

/**歌单评论信息 */
export function getRecommends(id: string,limit: number,offset: number){
  return request({
      url:'/comment/playlist',
      params:{
          id:id,
          limit:limit,
          offset
      }
  })
}
