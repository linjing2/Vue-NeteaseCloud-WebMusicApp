<template>
  <div class="artist-detail">
    <scroll ref="scroll" class="artist-scroll-c">
        <artist-base-info :pic-url="picUrl" :desc="artistDesc" :art-name="artName" :music-count="musicCount" :album-count="albumCount"/>
      <artist-bar :list="barlist" />
      <router-view></router-view>
      <!-- <artist-album :hotlist="musiclist"/> -->
    </scroll>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";

import ArtistBaseInfo from "./childComps/ArtistBaseInfo";
import ArtistBar from "./childComps/ArtistBar";
// import ArtistAlbum from "./childComps/ArtistAlbum";
import { _getArtistDesc, _getArtistHot50,_getArtistAlbum } from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";
export default {
  name: "ArtistDetail",
  data() {
    return {
      id:null,
      picUrl:'',
      artName:'',
      musicCount:null,
      albumCount:null,
      artistDesc: null,
      barlist: ["专辑", "歌手详情", "相似歌手"],
      musiclist: []
    };
  },
  components: {
    Scroll,
    ArtistBaseInfo,
    ArtistBar,
  },
  created() {
      console.log('artist');
      
    this.id=this.$route.params.id;
    this.artName=this.$route.params.name;
    this.picUrl=this.$route.params.pic;
    this.musicCount=this.$route.params.musicCount;
    this.albumCount=this.$route.params.albumCount;    
    if (this.id != null) {
      _getArtistDesc(this.id).then(res => {
        this.artistDesc = res.data.briefDesc;
      });

      /**热门五十首 */
      _getArtistHot50(this.id).then(res => {
          console.log(res.data);
          
        for (let i of res.data.songs) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }
      });

      /**获取歌曲专辑 */
      _getArtistAlbum(this.artist.id).then(res=>{
          console.log(res);
          
      })
    }
  }
};
</script>
<style scoped>
.artist-detail {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.artist-scroll-c{
  height: calc(100% - 59px);
}
</style>