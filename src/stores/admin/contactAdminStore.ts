import { defineStore } from 'pinia'
import type {  ContactInterface } from '@/shared/interfaces'
import { axiosContactDelete, axiosContactId, axiosContactList, axiosContactSearch } from '@/shared/services/contact.service.ts'

interface ContactState {
  contact: ContactInterface[]
  limit: number,
  offset: number,
  isEndReached: boolean
}

export const useContactAdminStore = defineStore('contactAdmin', {
  state: (): ContactState => ({
    contact: [],
    limit: 4,
    offset: 0,
    isEndReached: false
  }),
  actions: {
    async adminContactList(append: false): Promise<void> {
      try {
        const response = await axiosContactList(this.limit, this.offset)
        if (response) {
          const contacts = Array.isArray(response) ? response : [response]
          this.contact = append ? [...this.contact, ...contacts] : contacts
          if (response.length < this.limit) {
            this.isEndReached = true
          }
        } else {
          console.log('La response est vide')
        }
      } catch(e) {
        console.error(e)
        throw e
      }
    },
    async searchContact(term: string) {
      try {
        const response = await axiosContactSearch(term)
        if (response) {
          this.contact = response
        } else {
          this.contact = []
        }
      } catch(e) {
        console.error(e)
        throw e
      }
    },
    async loadContacts() {
      try {
        this.offset += this.limit
        await this.adminContactList(true)
        return true
      } catch(e) {
        console.error(e)
      }
    },
    async adminContactId(id: number): Promise<void> {
      try {
        return await axiosContactId(id)
      } catch(e) {
        console.error(e)
        throw e
      }
    },
    async resetContact(): Promise<void> {
      try {
        this.offset = 0
        this.isEndReached = false
        await this.adminContactList(false)
      } catch(e) {
        console.error(e)
        throw e
      }
    },
    async deleteContactId(id: string) {
      try {
        const response = await axiosContactDelete(id)
        this.contact = this.contact.filter(c => c.id !== id)
        return response
      } catch(e) {
        console.error(e)
        throw e
      }
    }
  }
})
