import type { ContactFormInterface, ContactInterface } from '@/shared/interfaces'
import axios from 'axios'

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

export async function axiosContactAdd(dataContact: ContactFormInterface): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}/api/contact/add`, dataContact)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur d'envoi d'un message : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosContactList(limit: number, offset: number): Promise<ContactInterface[] | ContactInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/contacts`, {
      params: {
        limit,
        offset
      }
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération des messages : ${response.status}`)
    }
    return response.data
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosContactId(id: number): Promise<ContactInterface[] | ContactInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/contact/${id}`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération des messages : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosContactSearch(term: string): Promise<ContactInterface[] | ContactInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/contacts/search`, {
      params: {
        search: term
      }
    })
    return response.data
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosContactDelete(id: string): Promise<ContactInterface[] | ContactInterface> {
  try {
    const response = await axios.delete(`${BASE_URL}/api/admin/contact/delete/${id}`)
    if (response.status === 200) {
      return response.data
    } else {
      throw new Error(`Erreur serveur: ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}
