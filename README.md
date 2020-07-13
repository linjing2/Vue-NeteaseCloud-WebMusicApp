### 小符音乐-高仿网易云音乐

 **前言**

肝代码不易，本项目还是比较能拿的出手的，若是在网上发表请标明出处，另外跪求Star。 

 **项目简介** 

本项目后端接口是Github大神Binaryify的开源项目（项目地址：[https://github.com/Binaryify/NeteaseCloudMusicApi](http://)），接口文档直接在百度搜索“网易云音乐API”作者是Binaryify。

本项目前端均是本人独立自主开发，所用技术栈：Vue全家桶+better-scroll。

 **项目准备：** 

后端API安装：[https://binaryify.github.io/NeteaseCloudMusicApi/#/?id=%e5%ae%89%e8%a3%85](http://)

![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/093904_5acf461a_7602838.png "屏幕截图.png")

 **项目知识点介绍：Mixin** 

![输入图片说明](https://images.gitee.com/uploads/images/2020/0713/094104_d9a27d78_7602838.png "屏幕截图.png")

了解详细Mixin请去vue官网。

 **项目优点** 

个人觉得本项目最大的优点在于如何触发音乐播放器。一般触发音乐播放器有三种方法，$emit、vuex、$bus。

1.$emit：缺点：音乐播放器和要播放的音乐所在组件必须有父子关系，而明显在一个音乐app中这是不现实的。

2.vuex：利用vuex的话可以先将要播放的音乐放在vuex中(假设放在state的musiclist中)，然后在音乐播放器组件生命周期函数中监听musiclist的状态，当音乐列表不为空时播放音乐.

缺点:(1)会存在musiclist不为空但是监听到的是空的现象,个人感觉是页面渲染先后问题。（2）修改musiclist都要通过mutations比较麻烦.

3.$bus，本项目采用的就是$bus。使用$bus这样不论音乐播放器和要播放的音乐所在组件是何种关系，都可以监听到要播放的音乐。

 **项目中触发播放音乐的函数** ：


```
import { _getMusicUrl, _getLyric } from "network/detail"
import { playList } from "components/content/playmusic/playList";
export const indexMixin = {
    methods: {
        PlayMusic(index = 0) {
            let path = this.$route.path;
            let musiclist;
            if (this.musiclist.length >= 200) {
                musiclist = this.musiclist.slice(0, 199);
            }
            else musiclist = this.musiclist;
            let url = null,
                lyric = null,
                currentLength = 0;
            let playlist = [];
            for (let i = 0, length = musiclist.length; i < length; i++) {
                let getUrl = _getMusicUrl(musiclist[i].id).then(res => {
                    url = res.data.data[0].url;
                    return url;
                });
                let getLyric = _getLyric(musiclist[i].id).then(res => {
                    lyric = res.data.tlyric.lyric;
                    return lyric;
                });
                Promise.all([getUrl, getLyric])
                    .then(results => {
                        let song = new playList(i, musiclist[i], results[0], results[1]);
                        playlist.push(song);
                        currentLength++;
                        /**每次完成两个网络请求都判断是否满足要求，满足才发送事件 */

                        if (i == musiclist.length - 1) {

                            this.$bus.$emit("playMusic", playlist, index, path);
                        }
                    })
                    .catch(err => {
                        this.$Message.warning('数据加载中，请稍等');
                    });
            }
        },
    }
}
```

之所以
# fds_music

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
