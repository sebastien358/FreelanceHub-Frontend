import { createRouter, createWebHistory } from 'vue-router'
const Freelance = () => import('@/features/freelance/Freelance.vue')
const Login = () => import('@/features/freelance/components/auth/Login.vue')
const Contact = () => import('@/features/freelance/components/contact/Contact.vue')
const Service = () => import('@/features/freelance/components/service/Service.vue')
const Project = () => import('@/features/freelance/components/project/Project.vue')
const NotFound = () => import('@/templates/not-found/NotFound.vue')
const Admin = () => import('@/features/admin/Admin.vue')
const RequestPassword = () => import('@/features/freelance/components/auth/reset-password/RequestPassword.vue')
const ResetPassword = () => import('@/features/freelance/components/auth/reset-password/ResetPassword.vue')
import { useAuthStore } from '@/stores/authStore.ts'
import { ADMIN_ROUTES } from '@/features/admin/router/route.admin.ts'

const routes = [
  { path: '/', redirect: '/freelance' },
  { path: '/freelance', component: Freelance },
  { path: '/service', component: Service },
  { path: '/project', component: Project },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
  {
    path: '/admin',
    component: Admin,
    meta: {
      requiresAuth: true,
      requiresAdmin: true,
      hideHeader: true,
      hideFooter: true
    },
    children: ADMIN_ROUTES
  },
  { path: '/request-password', component: RequestPassword },
  { path: '/reset-password/:token', component: ResetPassword },
  { path: '/:notFound(.*)*', component: NotFound }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0, behavior: 'smooth' }
    }
  }
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  // Route protégée → non connecté
  if (to.meta.requiresAuth && !authStore.isLogged) {
    next({path: '/freelance'})
  }
  // Route admin → connecté mais pas admin
  if (to.meta.requiresAdmin && (!authStore.isLogged || !authStore.roleAdmin)) {
    next({path: '/freelance'})
  }

  next()
})

export default router
