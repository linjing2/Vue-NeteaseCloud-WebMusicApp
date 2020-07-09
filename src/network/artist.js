import {request} from './request'
export function _getArtistDesc(id){
    return request({
        url:'/artist/desc',
        params:{
            id:id
        }
    })
}
/**获取歌手热门五十首歌曲 */
export function _getArtistHot50(id){
    return request({
        url:'/artist/top/song',
        params:{
            id:id
        }
    })
}

/**获取歌手专辑 */
export function _getArtistAlbum(id){
    return request({
        url:'/artist/album',
        params:{
            id:id
        }
    })
}