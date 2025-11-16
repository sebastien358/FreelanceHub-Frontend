import axios from 'axios'
import type { TestamonialFormInterface, TestamonialInterface } from '@/shared/interfaces'

const BASE_URL = import.meta.env.VITE_APP_API_URL as string;

export async function axiosTestimonialAdminList(limit: number, offset: number): Promise<TestamonialInterface[] | TestamonialInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/testimonial/list`, {
      params: {
        limit,
        offset
      }
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération des avis utilisateurs : ${response.status}`)
    }
  } catch(e) {
    console.log(e)
    throw e
  }
}

export async function axiosSearchTestimonial(term: string): Promise<TestamonialInterface[] | TestamonialInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/testimonial/search`, {
      params: {
        search: term,
      },
    })
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération des avis utilisateurs : ${response.status}`)
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function axiosTestimonialId(id: number): Promise<TestamonialInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/testimonial/${id}`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération d\'un avis utilisateur : ${response.status}`)
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

export async function axiosToggleTestimonial(id: number): Promise<TestamonialInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/admin/testimonial/${id}/toggle`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération d\'un avis utilisateur : ${response.status}`)
    }
  } catch (e) {
    console.log(e)
    throw e
  }
}

