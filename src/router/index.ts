import { createRouter, createWebHistory } from 'vue-router'
import Freelance from '@/freelance/Freelance.vue'
import Login from '@/freelance/components/auth/Login.vue'
import Contact from '@/freelance/components/contact/Contact.vue'
import Service from '@/freelance/components/service/Service.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', redirect: '/freelance'},
    {path: '/freelance', component: Freelance},
    {path: '/services', component: Service},
    {path: '/contact', component: Contact},
    {path: '/login', component: Login},
  ],
})

export default router
