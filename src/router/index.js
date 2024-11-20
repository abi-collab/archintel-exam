import { createRouter, createWebHistory } from 'vue-router'
import Login from '../views/Authentication/Login.vue'
import HomeView from '../views/HomeView.vue'

import { userLoginStore } from '@/stores/login'
// const isAuthenticated = !!loginStore.authToken

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
    },
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/:id',
      name: 'article',
      component: () => import('../views/ArticleView/index.vue'),
    },
    {
      path: '/companies',
      name: 'companies',
      component: () => import('../views/Companies/index.vue'),
    },
    {
      path: '/users',
      name: 'users',
      component: () => import('../views/Users/index.vue'),
    },
  ],
})

export default router
router.beforeEach((to, from, next) => {
  const loginStore = userLoginStore()
  // const isAuthenticated = !!localStorage.getItem('user-token') // or however you store your login state
  const isAuthenticated = loginStore.authToken
  // console.log('isAuthenticated', isAuthenticated)

  if (to.name !== 'login' && !isAuthenticated) {
    next({ name: 'login' })
  } else {
    next()
  }
})
