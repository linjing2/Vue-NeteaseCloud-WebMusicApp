<template>
    <div class="search"  @mouseleave="leave()">
        <div class="search-item">
            <form>
                <input type="text" class="mess" @focus="focus()">
            </form>
            <div class="search-icon">
                <img src="~assets/img/content/search.svg" alt="">
            </div>
        </div>
        <hot-search :searchlist="searchlist" v-show="isShow" @del="del"/>
    </div>
</template>
<script>
import HotSearch from './hotSearch'
export default {
    name:'MusicSearch',
    data(){
        return {
            searchlist:['灰熊','十年','游戏一场空'],
            isShow:false
        }
    },
    components:{
        HotSearch
    },
    methods:{
        focus(){
            this.isShow=true;
        },
        leave(){
            this.isShow=false;
        },
        del(){
            this.searchlist=[];
        }
    }
}
</script>
<style scoped>
.search{
    height: 100%;
    width: 230px;
    margin-left: 100px;
    display: inline-block;
    position: relative;
}
.search-item{
        line-height: 54px;
    height: 50%;
    width: 100%;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    background:#fff;
    border-radius: 10px;
}

.mess{
    outline-style: none;
    color: #333;
    line-height: 16px;
    background: transparent;
    position: absolute;
    width: 80%;
    height: 100%;
    padding: 0px 10px;
    border: #f6f6f6;
    border-radius: 10px;
}
.search-icon{
    position: absolute;
    right: 2px;
    top: -2px;
}
</style>