import { createRouter, createWebHistory } from 'vue-router'
import Freelance from '@/freelance/Freelance.vue'
import Login from '@/freelance/components/auth/Login.vue'
import Contact from '@/freelance/components/contact/Contact.vue'
import Service from '@/freelance/components/service/Service.vue'
import Project from '@/freelance/components/project/Project.vue'
import NotFound from '@/templates/not-found/NotFound.vue'

const routes = [
  { path: '/', redirect: '/freelance' },
  { path: '/freelance', component: Freelance },
  { path: '/service', component: Service },
  { path: '/project', component: Project },
  { path: '/contact', component: Contact },
  { path: '/login', component: Login },
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

export default router
