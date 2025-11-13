import type { RouteRecordRaw } from 'vue-router'
const ContactList  = () => import('@/features/admin/views/contact/ContactList.vue')
const ContactDetails = () => import('@/features/admin/views/contact/ContactDetails.vue')
const TestimonialList = () => import('@/features/admin/views/testamonial/TestamonialList.vue')
const TestimonialDetails = () => import('@/features/admin/views/testamonial/TestamonialDetails.vue')

export const ADMIN_ROUTES: RouteRecordRaw[] = [
  { path: '', redirect: '/contact-list' },
  { path: '/contact-list', name: 'contact-list', component: ContactList },
  { path: '/contact-details/:id', name: 'contactId', component: ContactDetails},
  { path: '/testimonial-list', name: 'testimonial-list', component: TestimonialList },
  { path: '/testimonial-details/:id', name: 'testimonialId', component: TestimonialDetails }
]
