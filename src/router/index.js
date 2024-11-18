import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Login from '../views/Authentication/Login.vue'

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      // component: () => import('../views/HomeView.vue'),
      component: HomeView,
    },
  ],
})

export default router
router.beforeEach((to, from, next) => {
  // const isAuthenticated = !!localStorage.getItem('user-token'); // or however you store your login state
  const isAuthenticated = true
  if (to.name !== 'login' && !isAuthenticated) next({ name: 'login' })
  else next()
})
