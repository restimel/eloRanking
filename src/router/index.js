import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import AddPlayer from '@/components/AddPlayer'
import AddMatch from '@/components/AddMatch'
import Ranking from '@/components/Ranking'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/addPlayer',
      name: 'addPlayer',
      component: AddPlayer
    },
    {
      path: '/addMatch',
      name: 'addMatch',
      component: AddMatch
    },
    {
      path: '/rank',
      name: 'ranking',
      component: Ranking
    }
  ]
})
