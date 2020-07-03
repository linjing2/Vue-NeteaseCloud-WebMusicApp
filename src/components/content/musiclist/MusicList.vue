<template>
    <div class="musiclist">
        <div class="list-item" v-for="(item,index) in personList" :key="index">
            <img :src="item.picUrl" alt="" @load="imgLoad">
            <div class="title">{{item.name}}</div>
            <div class="count">
                <div><img src="~assets/img/content/erji.svg" alt="">{{item.playCount}}</div>
            </div>
        </div>
    </div>
</template>
<script>
import {imgLoadMixin} from 'assets/common/mixin'
export default {
    name:'MusicList',
    props:{
        personList:{
            type:Array,
            default(){
                return []
            }
        }
    },
    mixins:[imgLoadMixin],
    methods:{
        imgLoad(){
            /**类似于防抖函数功能*/
           if(this.imgCount==this.personList.length)this.$emit('imgLoad');
           this.imgCount++;
        }
    }
}
</script>
<style scoped>
.musiclist{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}
.musiclist .list-item{
    position: relative;
    width: 150px;
    padding-bottom:10px ;
    font-size: 13px;
}
.list-item img{
    width: 100%;
}
.count{
    width: 100%;
    height: 20px;
    line-height: 20px;
    text-align: right;
    background:linear-gradient(to right,rgba(0,0,0,0),rgba(0,0,0,.4));
    position: absolute;
    top: 0px;
    right: 0;
}
.count img{
    display: inline-block;
    height: 10px;
    width: 10px;
}
</style>