import {request} from './request'

/**获取轮播图数据 */
export function _getBanner(){
    return request({
        url:'/banner'
    })
}
/**推荐歌单 */
export function _getPersonalized(config){
    return request({
        url:'/personalized',
        params:{
            limit:config
        }
    })
}

/**独家放送 */
export function _getPrivateContent(){
    return request({
        url:"/personalized/privatecontent"
    })
}

/**获取每日新歌 */
export function _getNewSong(){
    return request({
        url:'/personalized/newsong',
    })
}

/**获取每日推荐歌单  目前有错：需要登陆*/
export function _getRecommendResource(cookie,uid){
    return request({
        url:'/recommend/songs',
        params:{
            cookie:cookie,
            uid:uid
        }
    })
}