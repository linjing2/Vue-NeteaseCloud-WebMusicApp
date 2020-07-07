<template>
    <div class="play-music" v-if="music.length!==0">
        <div class="top">
            <div class="music-top-icon"><img :src="music[currentIndex].pic" alt=""></div>
            <div class="music-top-center">
                <div class="music-title">{{music[currentIndex].title}}</div>
                <div class="music-artist">{{music[currentIndex].artist}}</div>
            </div>
        </div>
        <div class="paly-music-left">
            <div class="pre" @click="preMusic()"><img src="~assets/img/playmusic/pre.png" alt=""></div>
            <div class="play" @click="toggle()">
                <img src="~assets/img/playmusic/play.png" alt="" v-show="!isPlay">
                <img src="~assets/img/playmusic/play2.png" alt="" v-show="isPlay">
            </div>
            <div class="netx" @click="nextMusic()"><img src="~assets/img/playmusic/next.png" alt=""></div>
        </div>
        <div class="play-music-right">
            <audio :src="music[currentIndex].src" autoplay  ref="audio" @timeupdate="audioTimeUpdate()"></audio>
            <div class="music-pro">
                <div class="currentTime">{{currentTime}}</div>
                <music-progress class="music-pro-progress" ref="music_pro" @childclick="setMusicCurrent"/>
                <div class="totalTime">{{duration}}</div>
            </div>
            <div class="volumn">
                <div class="volumn-icon" @click="toggleVolume()">
                    <img src="~assets/img/playmusic/volumn.svg" alt="" v-show="!isVolume">
                    <img src="~assets/img/playmusic/novolumn.svg" alt="" class="vol-img" v-show="isVolume">
                    </div>
                <volumn-progress ref="volume_pro" @childclick="setVolume"/>
            </div>
            <div class="icon">{{$refs.audio}}</div>
        </div>
    </div>
</template>
<script>
import MusicProgress from "components/common/progress/Progress"
import VolumnProgress from "components/common/progress/Progress"
import {formatDate} from "assets/common/tool"
export default {
    name:'PlayMusic',
    data(){
        return {
            isPlay:false,//true正在播放
            isVolume:false,
            currentTime:'00:00',
            duration:'00:00',
            musicProWidth:0,
            currentIndex:0,
            music:[
                {
                title:'赠友人',
                artist:'王子异',
                index:'1',
                lrc:'',
                src:'http://m7.music.126.net/20200707111019/8a94767210fc90b5cb131203291a598e/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3034133621/6dde/7512/1f51/548e4eb1cbd74369991374d99cc13274.mp3',
                pic:'https://p2.music.126.net/oWtw4zWuc04wC6WNV8-3Xg==/109951165085770824.jpg'
            },
            {
                title:'谁',
                artist:'伦桑',
                index:'0',
                lrc:'',
                src:'http://m8.music.126.net/20200707184706/a7e1f62ef61767350fa09369788f5030/ymusic/obj/w5zDlMODwrDDiGjCn8Ky/3068096975/e3d6/07b4/9780/d5bafe48003ed63da02426b2847e5d13.mp3',
                pic:'https://p2.music.126.net/0aPc7gxdRzQS1ivCUgtdbQ==/109951165100753386.jpg'
            }
            ]
        }
    },
    components:{
        MusicProgress,
        VolumnProgress
    },
    mounted(){
        this.$refs.audio.volume=0.8;
        this.$refs.volume_pro.setProgress(0.8);
        this.$bus.$on('playMusic',list=>{
            console.log('bus on,'+this.music);
            
            this.music=list.filter(item=>{
                return item.src!=='';
            });
            /**对数组进行次排序 */
            this.music=this.music.sort((a,b)=>{
                return a.index-b.index;
            })
            // this.currentIndex=0;
            // this.$refs.audio.src=this.music[0].src;
            console.log(this.music);
            
        })
    },
    methods:{
        /**暂停或播放音乐 */
        toggle(){
            this.isPlay=!this.isPlay;
            if(this.isPlay&&this.$refs.audio!=null)this.$refs.audio.play();
            else{
                this.$refs.audio.pause();
            }
        },
        toggleVolume(){
            
             this.isVolume=!this.isVolume;
            if(this.isVolume){
                this.$refs.audio.volume=0.0;
            }
            else{
                this.$refs.audio.volume=0.8;
                this.$refs.volume_pro&&this.$refs.volume_pro.setProgress(0.8);
            }
        },
        /**返回当前的播放时间 */
        audioTimeUpdate(){
            if(this.$refs.audio!=null){
                /**new Date()传入的是毫秒，而$refs.audio.currentTime返回的是秒*/ 
            if(this.$refs.audio.ended){
                console.log('end');
                this.currentIndex++;
            }
            this.isPlay=true;
            this.currentTime=formatDate(new Date(this.$refs.audio.currentTime*1000),"mm:ss");
            this.duration=formatDate(new Date(this.$refs.audio.duration*1000),"mm:ss");
            let scale=this.$refs.audio.currentTime/this.$refs.audio.duration;
            this.$refs.music_pro.setProgress(scale);
            }
        },
        setVolume(scale){
            console.log('volumn,'+scale);
            this.$refs.audio.volume=scale;
           
        },
        setMusicCurrent(scale){
            console.log('misic,'+scale);
            this.$refs.audio.currentTime=scale*this.$refs.audio.duration;
        },
        /**加载下一首音乐 */
        nextMusic(){
            if(this.currentIndex>=this.music.length-1)this.currentIndex=0;
            else this.currentIndex++;
            console.log('next',this.currentIndex);
             this.$refs.audio.src=this.music[this.currentIndex].src;
        },
        preMusic(){
             if(this.currentIndex<=0)this.currentIndex=this.music.length-1;
             else this.currentIndex--;
              console.log('pre',+this.currentIndex);
            this.$refs.audio.src=this.music[this.currentIndex].src;
        }
    }
}
</script>
<style scoped>
.play-music{
    width: 100%;
    height: 59px;
    background: #212124;
    position: relative;
    z-index: 3;
    bottom: 0;
}
.top{
    width: 15%;
    height: 100%;
    position: absolute;
    left: 0px;
    bottom: 59px;
    display: flex;
    background: #191b1f;
}
.music-top-icon{
    height: 100%;
}
.music-top-icon img{
    height: 100%;
}
.music-top-center{
    width: 100px;
    font-size: 13px;
    position: relative;
    left: 5px;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
}
.music-title{
    position: absolute;
    top: 0px;
}
.music-artist{
    position: absolute;
    bottom: 0px;
}
.paly-music-left{
    display:flex;
    float: left;
    width: 15%;
    height: 100%;
    justify-content: space-around;
    align-items: center;
}
.paly-music-left div{
    cursor: pointer;
}
.paly-music-left .play img{
    width: 55px;
    height: 55px;
}
.play-music-right{
    width: 85%;
    height: 100%;
    float: right;
}
.play-music-right .music-pro{
    width: 70%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
    text-align: center;
}
.music-pro .currentTime,.music-pro .totalTime{
    width: 60px;
}
.music-pro .music-pro-progress{
    flex: 1;
}
.play-music-right .volumn{
    width: 10%;
    height: 100%;
    float: left;
    display: flex;
    align-items: center;
}
.volumn-icon img{
    width: 15px;
    margin-right: 10px;
}
.vol-img{
    width: 21px !important;
}
.play-music-right .icon{
    width: 20%;
    height: 100%;
    float: left;
    line-height: 59px;
}
</style>