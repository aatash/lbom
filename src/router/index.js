import Vue from 'vue'
import Router from 'vue-router'
import Magic from 'components/Magic'
import Bit from 'components/Bit'
import Share from 'components/Share'
import About from 'components/About'

Vue.use(Router)

export default new Router({
  mode: 'history',
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { x: 0, y: 0 }
    }
  },
  routes: [
    {
      path: '/',
      name: 'Magic',
      component: Magic,
      props: true
    },
    {
      path: '/about',
      name: 'About',
      component: About
    },
    {
      path: '/magic/:bit',
      name: 'Bit',
      component: Bit,
      props: true
    },
    {
      path: '/share',
      name: 'Share',
      component: Share,
      props: true
    }
  ]
})
