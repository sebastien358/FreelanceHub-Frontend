import type {
  ResetPasswordFormInterface,
  UserFormInterface,
  UserInterface,
} from '@/shared/interfaces'
import axios from 'axios'
import { useAuthStore } from '@/stores/authStore.ts'
import to = gsap.to

//const BASE_URL = 'https://api.sebastien-petit.fr'
const BASE_URL = 'http://localhost:8000'

export async function axiosLogin(dataLogin: UserFormInterface): Promise<void> {
  try {
    const { email, password } = dataLogin
    const response = await axios.post(`${BASE_URL}/api/login_check`, {
      username: email,
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Error login : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosEmailExisting(email: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/email-existing`, {
      email
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur email existe : ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosInfoMe(): Promise<UserInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/user/me`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération de l\'utilisateur connecté : ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosRequestPassword(dataEmail: string) {
  try {
    const response = await axios.post(`${BASE_URL}/api/user/request-password`, {
      email: dataEmail
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération de l\'utilisateur connecté : ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosResetPassword(dataResetPassword: ResetPasswordFormInterface, token: string) {
  try {
    const { email, password } = dataResetPassword
    const response = await axios.post(`${BASE_URL}/api/user/reset-password/${token}`, {
      email,
      password
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la modification de moit de passe: ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

const authMiddleWare = (config) => {
  const authStore = useAuthStore()
  const token = authStore.token
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  return config
}

axios.interceptors.request.use(authMiddleWare)
