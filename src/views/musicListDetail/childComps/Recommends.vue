<template>
  <div class="recommend">
    <div class="desc">
      <div class="language">
        <textarea name id cols="30" rows="10"></textarea>
      </div>
      <div class="sub">评论</div>
    </div>

    <div class="content">
        <p>精彩评论</p>
        <div class="item" v-for="(item,index) in recommends" :key="index">
            <div class="icon"><img :src="item.user.avatarUrl" alt=""></div>
            <div class="mess">
                <div class="top"><span>{{item.user.nickname}}：</span>{{item.content}}</div>
                <div class="bottom">{{_formatDate(item.time)}}</div>
            </div>
        </div>
    </div>
  </div>
</template>
<script>
import {formatDate} from "assets/common/tool"
export default {
  name: "Recommends",
  props:{
      recommends:{
          type:Array,
          default(){
              return []
          }
      }
  },
  methods:{
      _formatDate(data){
          return formatDate(new Date(data),'yyyy年MM月dd日 hh:mm:ss')
      }
  }
};
</script>
<style scoped>
.recommend {
  width: 100%;
  padding: 20px 0 10px 0;
}
.recommend .desc {
  padding: 10px;
  height: 105px;
  background: #1c1e23;
}
.recommend .desc .language {
  height: 60px;
}
.desc .language textarea {
  width: 100%;
  height: 100%;
  padding-left: 10px;
  outline-style: none;
  background: #2b2c31;
  color: #fff;
  border: none;
}
.sub{
    float: right;
    margin-top: 5px;
    cursor: pointer;
}
.recommend .content{
    width: 100%;
    font-size: 13px;
}
.recommend .content p{
    padding-top: 30px;
     border: 1px solid #23262c;
}
.item{
    padding: 10px 0 10px 30px;
     border: 1px solid #23262c;
     display: flex;
     position: relative;
}
.icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 15px;
}
.icon img{
    width: 100%;
    border-radius: 50%;
}
.top span{
    color: #2e6bb0;
}
.bottom{
    position: absolute;
    bottom: 9px;
}
</style>