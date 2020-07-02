<template>
    <div class="search">
        <div class="search-item">
            <form>
                <input type="text" class="mess">
            </form>
            <div class="search-icon">
                <img src="~assets/img/content/search.svg" alt="">
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name:'MusicSearch'
}
</script>
<style scoped>
.search{
    height: 100%;
    width: 230px;
    line-height: 54px;
    margin-left: 100px;
    display: inline-block;
    position: relative;
}
.search-item{
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