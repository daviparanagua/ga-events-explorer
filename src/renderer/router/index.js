import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: require('@/components/Home').default
    },
    {
      path: '/page',
      name: 'Page',
      component: require('@/components/Page').default
    },
    {
      path: '/cta',
      name: 'CTA',
      component: require('@/components/CTA').default
    }
  ]
})
