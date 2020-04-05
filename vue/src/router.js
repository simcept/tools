import Vue from 'vue'
import Router from 'vue-router'
import apps from './data/apps'

Vue.use(Router)

const TITLE_DEFAULT = 'SimpleTools'
const DESCRIPTION_DEFAULT = 'Simple tools for developers.'

const router = new Router({
  base: process.env.BASE_URL,
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home.vue')
    },
    {
      path: '/about',
      name: 'about',
      component: () => import('./views/About.vue'),
      meta: {
        title: 'About'
      }
    },

    // Applications
    ...apps
  ]
})

router.afterEach((to) => {
  // Use next tick to handle router history correctly
  // see: https://github.com/vuejs/vue-router/issues/914#issuecomment-384477609
  Vue.nextTick(() => {
    document.title = to.meta.title
      ? to.meta.title + ' | ' + TITLE_DEFAULT
      : TITLE_DEFAULT

    const desc = document.head.querySelector('meta[name="description"]')
    desc.content = to.meta.description || DESCRIPTION_DEFAULT
  })
})

export default router
