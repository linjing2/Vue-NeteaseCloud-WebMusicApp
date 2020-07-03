<template>
    <div class="newSongs">
        <div class="item"></div>
    </div>
</template>
<script>
export default {
    name:'newSongs',
    props:{
        songList:{
            type:Array,
            default(){
                return []
            }
        }
    }
}
</script>
<style scoped>
</style>