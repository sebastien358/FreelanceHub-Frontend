import { createRouter, createWebHistory } from 'vue-router'
import Freelance from '@/freelance/Freelance.vue'
import Login from '@/freelance/components/auth/Login.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/freelance'},
    {path: '/freelance', component: Freelance},
    {path: '/login', component: Login}
  ],
})

export default router
