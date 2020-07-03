import Vue from 'vue'
import VueRouter from 'vue-router'

const DiscoverMusic=()=>import('views/discover/DiscoverMusic')

Vue.use(VueRouter)

  const routes = [
    {
      path:'',
      redirect:'/discover'
    },
    {
      path:'/discover',
      component:DiscoverMusic
    }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
