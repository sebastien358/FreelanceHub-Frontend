import { defineStore } from 'pinia'
import type { TestamonialInterface } from '@/shared/interfaces'
import { axiosSearchTestimonial, axiosTestimonialAdminList, axiosTestimonialId, axiosToggleTestimonial } from '@/shared/services/admin/testimonialAdmin.ts'

interface TestimonialState {
  testamonial: TestamonialInterface[]
  limit: number,
  offset: number,
  isEndReached: boolean
}

export const useTestimonialAdminStore = defineStore('testamonialAdmin', {
  state: (): TestimonialState => ({
    testamonial: [],
    limit: 4,
    offset: 0,
    isEndReached: false
  }),
  actions: {
    async getTestimonialList(append: false) {
      try {
        const response = await axiosTestimonialAdminList(this.limit, this.offset)
        if (response) {
          const testimonials = Array.isArray(response) ? response : [response]
          this.testamonial = append ? [...this.testamonial, ...testimonials] : testimonials
          if (response.length < this.limit) {
            this.isEndReached = true
          }
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    },
    async getTestimonialId(id: number) {
      try {
        return await axiosTestimonialId(id)
      } catch(e) {
        console.error(e)
      }
    },
    async searchTestimonial(term: string) {
      try {
        const response = await axiosSearchTestimonial(term)
        if (response) {
          this.testamonial = response
        } else {
          this.testamonial = []
        }
      } catch(e) {
        console.error(e)
      }
    },
    async toggleTestimonial(id: string) {
      try {
        const result = await axiosToggleTestimonial(id)
        return result
      } catch(e) {
        console.error(e)
      }
    },
    async lazyLoadTestimonial() {
      try {
        this.offset += this.limit
        await this.getTestimonialList(true)
        return true
      } catch(e) {
        console.error(e)
      }
    }
  }
})
