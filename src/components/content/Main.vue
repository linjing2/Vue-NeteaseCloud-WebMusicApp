<template>
    <div class="main">
        <login class="login"/>
        <test/>
    </div>
</template>
<script>
import Test from 'views/test'
import Login from './user/Login'
export default {
    name:'Main',
    components:{
        Login,
        Test
    }
}
</script>
<style scoped>
.main{
  width: calc(100% - 15%);
  height: calc(100% - 54px - 59px);
  background: yellow;
  margin-left: 15%;
  position:relative;
}
.login{
    position:absolute;
    left:0;
    right:0;
    margin: auto;
}
</style>