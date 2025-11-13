import { defineStore } from 'pinia'
import type { TestamonialFormInterface, TestamonialInterface } from '@/shared/interfaces'
import { axiosTestimonialAdd, axiosTestimonialList } from '@/shared/services/testimonial.servive.ts'


interface TestimonialState {
  testamonial: TestamonialInterface[]
}

export const useTestimonialStore = defineStore('testamonial', {
  state: (): TestimonialState => ({
    testamonial: []
  }),
  getters: {
    firstThreePublished(state) {
      return state.testamonial
        .filter(t => t.isPublished)
        .slice(0, 3)
    }
  },
  actions: {
    async getTestimonialList() {
      try {
        const response = await axiosTestimonialList()
        if (response) {
          this.testamonial = Array.isArray(response) ? response : [response]
          console.log(this.testamonial)
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
      }
    },
    async testimonialAdd(dataTestimonial: TestamonialFormInterface): Promise<void> {
      try {
        const formData = new FormData()
        const { name, job, message, image } = dataTestimonial
        formData.append('name', name)
        formData.append('job', job)
        formData.append('message', message)
        formData.append('filename', image)
        const response = await axiosTestimonialAdd(formData)
        this.testamonial.push(response)
        return response
      } catch(e) {
        console.error(e)
      }
    }
  }
})
