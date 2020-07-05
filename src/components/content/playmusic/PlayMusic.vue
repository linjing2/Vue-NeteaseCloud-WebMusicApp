<template>
  <div class="play">
    <aplayer
      ref="aplayer"
      class="aplayer"
      theme="#b82525"
      fixed
      :customAudioType="customAudioType"
      autoplay
      :music="{
    title: '夏天的风 (Live)',
    author: '刘瑞琦',
    url: 'http://m7.music.126.net/20200705214024/4fb9d04c8ec2a766bf670d62a312ed97/ymusic/50df/220b/0351/f7b4a7bee91eb519b6fbcdaace1571fc.mp3',
    pic: '',
    lrc: '[00:00.00]lrc here\n[00:01.00]aplayer'
  }"
    />
  </div>
</template>
<script>
import aplayer from "vue-aplayer";
export default {
  name: "PlayMusic",
  components: {
    aplayer
  },
  data() {
    return {
      videoUpload: {
        progress: false,
        progressPercent: 0,
        successPercent: 0,
        music: {
          title: "",
          author: "",
          url: "",
          lrc: "[00:00.00]lrc here\n[00:01.00]aplayer"
        }
      },
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
  methods: {
    play() {
      this.$refs.aplayer.play();
    }
  }
};
</script>
<style scoped>
.play {
    width: 100%;
  height: 66px;
  position: relative;
  bottom: 20px;
}
.aplayer{
    color:#fff;
    width: 100%;
    background: #202023;
}
</style>