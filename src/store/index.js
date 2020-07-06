import Vue from 'vue'
import Vuex from 'vuex'
import {_getSongList} from 'network/user/userVerify'

Vue.use(Vuex)

const state={
  isShowLogin:false,
  user:null,//保存用户信息
  SongList:null,//用户歌单
  recommendResouce:null,//每日推荐歌单
  uid:null,
  cookie:'',
  playlist:[]
};
export default new Vuex.Store({
  state,
  mutations:{
    addPlayList(state,list){
      state.playlist=list
      console.log(state.playlist);
      
    },
    /**登陆界面显示与隐藏 */
    showLogin(state){
      state.isShowLogin=true;
    },
    hiddenLogin(state){
      state.isShowLogin=false;
    },
    /**保存用户信息 */
    addUser(state,obj){
      state.user=obj;
      state.uid=state.user.profile.userId;
      state.cookie=obj.cookie;
      
      _getSongList(state.uid).then(res=>{
        state.SongList=res.data.playlist; 
      });
    }
  },
  getters:{
    getShowLogin(state){
      return state.isShowLogin;
    } 
  },
  actions: {
  },
  modules: {
  }
})
