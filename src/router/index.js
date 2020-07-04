import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverMusic=()=>import('views/discover/DiscoverMusic')
const MusicListDetail=()=>import('views/musicListDetail/MusicListDetail')

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
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
