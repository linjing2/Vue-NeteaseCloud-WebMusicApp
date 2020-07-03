import {request} from './request'

/**最新专辑 */
export function _getNewest(){
    return request({
        url:'/album/newest',
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
export function _getRecommendResource(config){
    console.log(config);
    
    return request({
        url:'/recommend/resource',
        params:{
            uid:config
        }
    })
}