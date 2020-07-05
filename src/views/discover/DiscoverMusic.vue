<template>
  <div class="discover">
    <nav-bar :list="list" />
    <scroll class="discover-scroll" ref="scroll">
      <div class="content">
        <swiper :banner="banner" />
        <p>推荐歌单</p>
        <music-list :personList="personalized" @imgLoad="imgLoad" />
        <private-content :pri="privateContent" @priImgLoad="priImgLoad" />
        <new-songs :songList="songList" @newSongImgLoad="newSongImgLoad" />
      </div>
    </scroll>
  </div>
</template>
<script>
import MusicList from "components/content/musiclist/MusicList";
import Scroll from "components/common/scroll/Scroll";
import Swiper from "components/common/swiper/Swiper";

import NavBar from "./childComps/NavBar";
import PrivateContent from "./childComps/PrivateContent";
import newSongs from "./childComps/newSongs";

import {
  _getNewSong,
  _getPersonalized,
  _getPrivateContent,
  _getBanner,
  _getRecommendResource
} from "network/discover";
import { debounce } from "assets/common/tool";
export default {
  name: "DiscoverMusic",
  data() {
    return {
      list: ["个性推荐", "歌单", "主播电台", "排行榜", "歌手", "最新音乐"],
      banner: null, //轮播图数据
      limit: 12, //一次获取的歌单数量
      personalized: null, //保存获取到的推荐歌单
      privateContent: null, //独家放送
      songList: null ,//每日新歌
    };
  },
  components: {
    Swiper,
    MusicList,
    Scroll,

    NavBar,
    PrivateContent,
    newSongs
  },
  created() {
    /**轮播图数据 */
    _getBanner().then(res => {
      this.banner = res.data.banners.slice(0, 6);
    });
    /**推荐歌单*/
    _getPersonalized(this.limit).then(res => {
      this.personalized = res.data.result;
    });

    /**独家放送*/
    _getPrivateContent().then(res => {
      this.privateContent = res.data;
    });

    _getNewSong().then(res => {
      this.songList = res.data.result;
    });
  },
  updated() {
    this.$refs.scroll.refresh();
  },
  methods: {
    imgLoad() {
      this.$refs.scroll.refresh();
    },
    priImgLoad() {
      this.$refs.scroll.refresh();
    },
    newSongImgLoad() {
      this.$refs.scroll.refresh();
    }
  }
};
</script>
<style scoped>
.discover {
  width: 100%;
  height: 100%;
}
.discover-scroll {
  margin-top: 10px;
  height: calc(100% - 49px);
  overflow: hidden;
}
.swi {
  width: 100%;
  margin-top: 5px;
}
.content {
  width: 100%;
  padding: 10px 155px;
}
.content p {
  font-size: 20px;
}
</style>