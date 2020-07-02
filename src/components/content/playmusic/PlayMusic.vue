<template>
    <div class="play">
        <div class="top"></div>
    </div>
</template>
<script>
export default {
    name:'PlayMusic'
}
</script>
<style scoped>
.play{
    height: 59px;
    background:red;
    position: relative;
}
.top{
    width: 15%;
    height: 59px;
    position: absolute;
    bottom: 59px;
    left: 0;
    background: green;
}
</style>