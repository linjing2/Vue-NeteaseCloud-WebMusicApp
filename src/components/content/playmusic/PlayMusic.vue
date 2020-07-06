<template>
  <div class="play">
    <div class="pre"></div>
    <aplayer
      ref="aplayer"
      class="aplayer"
      theme="#b82525"
      :listFolded="true"
      :lrcType="1"
      fixed
      :customAudioType="customAudioType"
      autoplay
      :music="audio[0]"
      :list="audio"
    />
    <div class="next" @click="next()"></div>
  </div>
</template>
<script>
import aplayer from "vue-aplayer";

import { playList } from "components/content/playmusic/playList";

import { _getMusicUrl, _getLyric } from "network/detail";
export default {
  name: "PlayMusic",
  components: {
    aplayer
  },
  data() {
    return {
      musiclist: [],
      audio: [
        {
          title: "夏天的风 (Live)",
          artist: "刘瑞琦",
          src:
            "http://m7.music.126.net/20200705214024/4fb9d04c8ec2a766bf670d62a312ed97/ymusic/50df/220b/0351/f7b4a7bee91eb519b6fbcdaace1571fc.mp3",
          pic:
            "https://p2.music.126.net/kOjwydrPmmB4j4DrvmAflw==/7875801790952799.jpg",
          lrc: "[00:00.00] 我们一起学猫叫\n[99:99.99] 一起喵喵喵喵喵",
          theme:"https://p2.music.126.net/kOjwydrPmmB4j4DrvmAflw==/7875801790952799.jpg"
        },
        {
          artist: "抖音热歌DJ",
          lrc: "[00:00.00] 我们一起学猫叫\n[99:99.99] 一起喵喵喵喵喵",
          pic:
            "https://p1.music.126.net/--w_fkOOk_zt2Xjxk17aYw==/109951164456284814.jpg",
          src:
            "http://m7.music.126.net/20200706203326/f71935c1dbf852163a209fc332ccb7f7/ymusic/565d/030e/0252/a7a9596dd54d23e21a1958ef90ad28df.mp3",
          title: "我还年轻 (抖音DJ版) (翻自 老王乐队)",
          theme:"https://p1.music.126.net/--w_fkOOk_zt2Xjxk17aYw==/109951164456284814.jpg"
        }
      ],
      customAudioType: {
        customHls(audioElement, audio, player) {
          if (Hls.isSupported()) {
            const hls = new Hls();
            hls.loadSource(audio.url);
            hls.attachMedia(audioElement);
          } else if (
            audioElement.canPlayType("application/x-mpegURL") ||
            audioElement.canPlayType("application/vnd.apple.mpegURL")
          ) {
            audioElement.src = audio.url;
          } else {
            player.showNotice("Error: HLS is not supported.");
          }
        }
      }
    };
  },
  mounted() {
    this.$bus.$on("playMusic", list => {
      let url = null,
        lyric = null;
      for (let i = 0, length = list.length; i < length; i++) {
        let getUrl = _getMusicUrl(list[i].id).then(res => {
          url = res.data.data[0].url;
          return url;
        });
        let getLyric = _getLyric(list[i].id).then(res => {
          lyric = "";
          if (res.data.lrc) lyric = res.data.lrc.lyric;
          return lyric;
        });
        Promise.all([getUrl, getLyric])
          .then(results => {
            let song = new playList(i, list[i], results[0], results[1]);
            this.musiclist.push(song);
          })
          .catch(err => {
            this.$Message.error("播放失败，请刷新后重试");
          });
      }
      this.musiclist = this.musiclist.filter(item => {
        return item.url !== "";
      });
      console.log(this.musiclist);
      console.log(this.musiclist);

      setTimeout(() => {
        this.playMusic(this.musiclist);
      }, 1000);
    });
  },
  methods: {
    playMusic(musiclist) {
      console.log("---");

    },
    next() {
     console.log(this.$refs.aplayer);
     //切换到下一首音乐
    //  this.$refs.aplayer.onAudioEnded();
    this.$refs.aplayer.toggle(1);
      // control
    }
  }
};
</script>
<style>
.play {
  width: 100%;
  height: 66px;
  position: relative;
  bottom: 20px;
}
.aplayer {
  color: #fff !important;
  width: 100%;
  background: #202023 !important;
}
.aplayer .aplayer-pic {
  margin: 0 50px 0 80px;
}
.play .pre {
  width: 35px;
  height: 35px;
  cursor: pointer;
  background: url("~assets/img/playmusic/pre.png") no-repeat center center;
  background-size: 100%;
  position: absolute;
  left: 40px;
  z-index: 3;
  bottom: -9px;
}
.play .next {
  width: 35px;
  height: 35px;
  cursor: pointer;
  background: url("~assets/img/playmusic/next.png") no-repeat center center;
  background-size: 100%;
  position: absolute;
  left: 161px;
  z-index: 3;
  bottom: -9px;
}
</style>