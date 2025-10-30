import { createRouter, createWebHistory } from 'vue-router'
import Freelance from '@/freelance/Freelance.vue'
import Login from '@/freelance/components/auth/Login.vue'
import Contact from '@/freelance/components/contact/Contact.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/freelance'},
    {path: '/freelance', component: Freelance},
    {path: '/login', component: Login},
    {path: '/contact', component: Contact}
  ],
})

export default router
