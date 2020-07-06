<template>
  <div class="detail">
    <scroll class="detail-scroll">
      <detail-base-info :baseInfo="baseInfo" @allPlay="allPlay()" />
      <detail-bar :list="list" @detailBarClick="detailBarClick" />
      <music-item :musiclist="musiclist" v-show="isShow=='music'" />
      <recommends :recommends="recommends" :id="id" v-show="isShow=='recommend'" />
      <music-list-live v-show="isShow=='sub'" :subs="subs" />
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import DetailBaseInfo from "./childComps/DetailBanseInfo";
import DetailBar from "./childComps/DetailBar";
import MusicItem from "./childComps/MusicItem";
import Recommends from "./childComps/Recommends";
import MusicListLive from "./childComps/MusicListLive";

import {
  _getMusicListDetail,
  baseInfo,
  _getSongsDetail,
  songDetail,
  _getRecommends,
  _getSub,
  _getMusicUrl,
  _getLyric
} from "network/detail";
import { playList } from "components/content/playmusic/playList";
export default {
  name: "MusicListDetail",
  data() {
    return {
      id: null,
      musicListDetail: null, //歌单详情信息
      baseInfo: null,
      list: [],
      musiclist: [], //歌单歌曲
      isShow: "music",
      recommends: null,
      limit: 20,
      subs: null,
      playlist:[],
    };
  },
  components: {
    Scroll,

    DetailBaseInfo,
    DetailBar,
    MusicItem,
    Recommends,
    MusicListLive
  },
  created() {
    this.id = this.$route.params.id;

    _getMusicListDetail(this.id).then(res => {
      this.musicListDetail = res.data;
      /**保存歌单基础信息 */
      this.baseInfo = new baseInfo(this.musicListDetail.playlist);
      console.log(this.musicListDetail);
      let str = "评论(" + this.musicListDetail.playlist.commentCount + ")";
      this.list = ["歌曲列表", str, "收藏者"];

      /**遍历查询歌单所有歌曲详情 */
      for (let i of this.musicListDetail.playlist.trackIds) {
        _getSongsDetail(i.id).then(res => {
          let song = new songDetail(res.data.songs);
          this.musiclist.push(song);
        });
      }

      /**获取歌单评论 */
      _getRecommends(this.id, this.limit).then(res => {
        this.recommends = res.data.comments;
      });

      /**获取歌单收藏者 */
      _getSub(this.id, 30).then(res => {
        this.subs = res.data.subscribers;
      });
    });
  },
  methods: {
    detailBarClick(str) {
      this.isShow = str;
    },
    allPlay() {
      // let musiclist = this.musiclist;
      // let url=null,lyric=null;

      // for (let i = 0, length = musiclist.length; i < length; i++) {
       
      //   let getUrl=_getMusicUrl(musiclist[i].id).then(res => {
      //     url = res.data.data[0].url;
      //      return url;
      //   });
      //   let getLyric=_getLyric(musiclist[i].id).then(res => {
      //     lyric = res.data.tlyric.lyric;
      //     return lyric;
      //   });
      //    Promise.all([getUrl,getLyric]).then(results=>{
      //      /**里面有的url没有值 */
      //       let song=new playList(i,musiclist[i],results[0],results[1]);
      //       this.playlist.push(song);
      //    }).catch(err=>{
      //      this.$Message.error('播放失败，请刷新后重试');
      //    })
      // }
      console.log(this.musiclist[0]);
      
      // this.$store.commit('addPlayList',this.playlist);
      this.$bus.$emit('playMusic',this.musiclist);
    }
  }
};
</script>
<style scoped>
.detail {
  width: 100%;
  height: 100%;
  padding: 35px 35px 0px 35px;
  background: #16181c;
  color: #dcdde4;
  overflow: hidden;
}
.detail-scroll {
  height: 100%;
}
</style>