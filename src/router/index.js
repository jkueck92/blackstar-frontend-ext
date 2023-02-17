// Composables
import { createRouter, createWebHistory } from 'vue-router'

import { useAuthStore, useAlertStore } from '@/stores'

import usersRoutes from './users.routes'
import authRoutes from './auth.routes'

import { Layout } from '@/layouts/app'
import operationsRoutes from './operations.routes'
import postsRoutes from './posts.routes'

export const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  linkActiveClass: 'active',
  // routes,
  routes: [
    { 
      path: '/', 
      component: Layout,
      children: [
        {
          path: '',
          name: 'Home',
          component: () => import('@/views/Home.vue'),
        }
      ]
    },
    { ...authRoutes },
    { ...usersRoutes },
    { ...operationsRoutes },
    { ...postsRoutes },
    // catch all redirect to home page
    { 
      path: '/:pathMatch(.*)*', 
      redirect: '/' 
    }
  ]
})

router.beforeEach(async (to) => {
  // clear alert on route change
  const alertStore = useAlertStore()
  alertStore.clear()

  // redirect to login page if not logged in and trying to access a restricted page 
  const publicPages = ['/auth/login', '/auth/register']
  const authRequired = !publicPages.includes(to.path)
  const authStore = useAuthStore()

  if (authRequired && !authStore.user) {
      authStore.returnUrl = to.fullPath
      return '/auth/login'
  }
})

export default router