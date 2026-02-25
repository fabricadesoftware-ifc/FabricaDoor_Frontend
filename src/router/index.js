import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import DashBoardView from '../views/DashBoardView.vue'
import ProfileView from '../views/ProfileView.vue'
import SupportView from '../views/SupportView.vue'
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
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashBoardView,
      meta: {
        requiresAuth: true,
        requiresAdmin: true
      }
    },
    {
      path: '/profile',
      name: 'profile',
      component: ProfileView,
      meta: {
        requiresAuth: true
      }
    },
    {
      path: '/support',
      name: 'support',
      component: SupportView
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const store = useAuthStore()

  if (to.meta.requiresAuth && !store.authUser.isLogged) {
    return next('/login')
  }

  if (to.meta.requiresAdmin) {
    try {
      const response = await api.get('auth/verify', {
        headers: {
          Authorization: `Bearer ${store.authUser.token}`
        }
      })

      const isAdmin = response.data.data?.isSuper

      if (isAdmin) {
        return next()
      } else {
        return next('/profile')
      }
    } catch (error) {
      console.error(error)
      store.logout()
      return next('/login')
    }
  }

  if (to.matched.length === 0) {
    return next('/login')
  }

  return next()
})

export default router
