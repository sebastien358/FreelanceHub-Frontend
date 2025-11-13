import { defineStore } from 'pinia'
import type { ContactFormInterface, ContactInterface } from '@/shared/interfaces'
import { axiosContactAdd } from '@/shared/services/contact.service.ts'

interface ContactState {
  contact: ContactInterface[]
}

export const useContactStore = defineStore('contact', {
  state: (): ContactState => ({
    contact: []
  }),
  actions: {
    async contactAdd(dataContact: ContactFormInterface): Promise<void> {
      try {
        const response = await axiosContactAdd(dataContact)
        this.contact.push(response)
        return response
      } catch(e) {
        console.error(e)
      }
    }
  }
})
