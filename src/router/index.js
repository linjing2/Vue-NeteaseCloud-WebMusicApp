import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverMusic=()=>import('views/discover/DiscoverMusic')
const MusicListDetail=()=>import('views/musicListDetail/MusicListDetail')
const DayMusicListDetail=()=>import('views/musicListDetail/DayMusicListDetail')

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/discover'
    },
    {
      path:'/discover',
      component:DiscoverMusic
    },
    {
      path:'/musiclistdetail/:id',
      component:MusicListDetail
    },
    {
      path:'/daymusic',
      component:DayMusicListDetail
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
