<template>
    <div class="test">
        <img :src="item.coverImgUrl" alt="" v-for="(item,index) in res" :key="index">
    </div>
</template>
<script>
import {request} from "@/network/request"
export default {
    name:'Test',
    data(){
        return {
            res:null,
        }
    },
    created(){
        request('/login/cellphone?phone=15660950157&password=fudaosheng06666').then(res=>{
            this.res=res;
            console.log(this.res);
            
        })
    }
}
</script>
<style scoped>
.test img{
    width: 50px;
    
}
</style>