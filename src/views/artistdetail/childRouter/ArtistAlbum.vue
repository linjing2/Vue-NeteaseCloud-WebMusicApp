<template>
    <div class="artist-album" v-if="artist!=null">
        <artist-hot50 :hotlist="musiclist" @musicItemClick="HotPlay"/>
        <artist-album-list v-for="(item,index) in albumlist" :key="index" :album="item"/>
    </div>
</template>
<script>
import ArtistHot50 from "../childComps/ArtistHot50";
import ArtistAlbumList from "../childComps/ArtistAlbumList"
import { _getArtistHot50, _getArtistAlbum} from "network/artist";
import { _getSongsDetail, songDetail } from "network/detail";

import {indexMixin} from "views/musicListDetail/indexMixin"
export default {
    name:'ArtistAlbum',
    data(){
        return {
            artist:null,
            musiclist:[],
            albumlist:[]
        }
    },
    components:{
        ArtistHot50,
        ArtistAlbumList
    },
    created(){
        this.artist=this.$route.query.artist||this.$store.state.artist;
        if (this.artist!= null) {
      /**热门五十首 */
      _getArtistHot50(this.artist.id).then(res => {

        for (let i of res.data.songs) {
          _getSongsDetail(i.id).then(res => {
            let song = new songDetail(res.data.songs);
            this.musiclist.push(song);
          });
        }
      });

      /**获取歌曲专辑 */
      _getArtistAlbum(this.artist.id).then(res => {
          this.albumlist=res.data.hotAlbums;
        console.log(this.albumlist);
      });
    }
    },
    mixins:[indexMixin],
    methods:{
        HotPlay(index){
            console.log(index);
            this.PlayMusic(index);
        }
    }
}
</script>
<style scoped>
.artist-album{
    width: 100%;
}
</style>