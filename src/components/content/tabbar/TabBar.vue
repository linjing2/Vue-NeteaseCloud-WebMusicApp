<template>
  <div class="tabbar">
    <div class="logo">
      <img src="~assets/img/content/logo.svg" alt />
      <div class="title">小符音乐</div>
    </div>

    <music-search/>
    <div class="content">
        <div class="login">
        <div class="profile">
            <img src="" alt="">
        </div>
        <div>未登录</div>
    </div>
    <div class="right">
      <div>
        <a href="#" title="最小化"><img src="~assets/img/content/min.svg" alt="最小化" /></a>
      </div>
      <div>
        <a href="#" title="还原"><img src="~assets/img/content/reset.svg" alt="还原" /></a>
      </div>
      <div>
        <a href="#" title="退出"><img src="~assets/img/content/x.svg" alt="退出" /></a>
      </div>
    </div>
    </div>
  </div>
</template>
<script>
import MusicSearch from "../search/MusicSearch"
export default {
  name: "TabBar",
  components:{
      MusicSearch
  }
};
</script>
<style scoped>
.tabbar {
  height: 54px;
  width: 100%;
  border: 1px solid #fff;
  background-color:#202023;
}
.logo {
  height: 100%;
  width: 150px;
  line-height: 100%;
  display: flex;
  float: left;
  align-items: center;
}
.content{
    float: right;
     height: 100%;
}
.login{
    height: 100%;
    float: left;
    margin-right: 50px;
    display: flex;
    align-items: center;
}
.profile{
    width: 28px;
    height: 28px;
    border-radius: 50%;
    background-color: #fff;
    margin-right: 10px;
}
.logo img {
  margin: 0px 10px 0px 10px;
  height: 60%;
}
.right {
  height: 100%;
  display: flex;
  align-items: center;
}
.right div{
    flex: 1;
    margin-right: 15px;
     opacity: .6;
}
.right div:hover{
    opacity: 1;
}
.right div img{
    width: 22px;
}
</style>