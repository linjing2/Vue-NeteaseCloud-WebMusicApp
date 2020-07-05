<template>
    <div class="test">
        <play-music/>
    </div>
</template>
<script>
import PlayMusic from "components/content/playmusic/PlayMusic"
export default {
    name:'Test',
    components:{
        PlayMusic
    }
}
</script>
<style scoped>
.test{
    width: 100%;
    height: 100%;
    padding: 100px 0;
}
</style>