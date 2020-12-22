import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: () => import('../pages/HomePage') // lazy loading for better preformence
  },
  {
    path: '/:item_category/:item_id',
    name: 'Item Page',
    component: () => import('../pages/ItemPage') 
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    return { x: 0, y: 0 }
  }
})

export default router
