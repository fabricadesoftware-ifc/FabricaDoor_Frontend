import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import { useAuthStore } from '@/stores'
import api from '@/plugin/axios'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: () => import('../views/DashBoardView.vue'),
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('../views/ProfileView.vue'),
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/test',
      name: 'test',
      component: () => import('../views/TestView.vue')
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.authUser.isLogged) {
    next('/login')
  } else if (to.meta.requiresAdmin) {

    const response = await api.get('auth/verify', {
      headers: {
        Authorization: `Bearer ${store.authUser.token}`
      }
    })

    if (response.data.data) {
      next()
    } else {
      store.logout()
      next('/login')
    }
  } else if (to.matched.length === 0) {
    next('/login')
  } else {
    next()
  }
})

export default router
