import { defineStore } from 'pinia'
import type { ResetPasswordFormInterface, UserFormInterface } from '@/shared/interfaces'
import { axiosEmailExisting, axiosInfoMe, axiosLogin, axiosRequestPassword, axiosResetPassword } from '@/shared/services/auth.service.ts'
import axios from 'axios'

const TOKEN = 'token'
const ROLES = 'roles'
const ROLE_ADMIN = 'ROLE_ADMIN'

interface authState {
  token: string,
  isLogged: boolean,
  role: string[]
}

export const useAuthStore = defineStore('auth', {
  state: (): authState => ({
    token: localStorage.getItem(TOKEN),
    isLogged: !!localStorage.getItem(TOKEN),
    role: JSON.parse(localStorage.getItem(ROLES) ?? '[]')
  }),
  actions: {
    async login(dataLogin: UserFormInterface): Promise<void> {
      try {
        const response = await axiosLogin(dataLogin)
        localStorage.setItem(TOKEN, response.token)
        this.token = response.token
        this.isLogged = true
        await this.infoMe()
        return response
      } catch(e) {
        console.error(e)
      }
    },
    async infoMe(): Promise<void> {
      try {
        const response = await axiosInfoMe()
        localStorage.setItem(ROLES, JSON.stringify(response.user.roles))
        this.role = response.user.roles
      } catch(e) {
        console.error(e)
        this.logout()
      }
    },
    async verifyEmail(email: string): Promise<void> {
      try {
        return await axiosEmailExisting(email)
      } catch(e) {
        console.error(e)
      }
    },
    async requestPassword(dataEmail: string): Promise<void> {
      try {
        return await axiosRequestPassword(dataEmail)
      } catch(e) {
        console.error(e)
      }
    },
    async resetPassword(dataResetPassword: ResetPasswordFormInterface, token: string): Promise<void> {
      try {
        return await axiosResetPassword(dataResetPassword, token)
      } catch(e) {
        console.error(e)
      }
    },
    roleAdmin(): boolean {
      return this.role.includes(ROLE_ADMIN)
    },
    logout(): void {
      this.token = ''
      this.role = []
      this.isLogged = false
      localStorage.removeItem(TOKEN)
      localStorage.removeItem(ROLES)
    }
  }
})
