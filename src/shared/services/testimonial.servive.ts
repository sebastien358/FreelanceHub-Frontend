import type { TestamonialFormInterface, TestamonialInterface } from '@/shared/interfaces'
import axios from 'axios'

//const BASE_URL = 'https://api.sebastien-petit.fr'
const BASE_URL = 'http://localhost:8000'

export async function axiosTestimonialList(): Promise<TestamonialInterface[] | TestamonialInterface> {
  try {
    const response = await axios.get(`${BASE_URL}/api/testimonial/list`)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de la récupération des avis utilisateurs : ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}

export async function axiosTestimonialAdd(formData: TestamonialFormInterface): Promise<void> {
  try {
    const response = await axios.post(`${BASE_URL}/api/testimonial/add`, formData)
    if (response.status >= 200 && response.status < 300) {
      return response.data
    } else {
      throw new Error(`Erreur de l'ajout d'un avis : ${response.status}`)
    }
  } catch(e) {
    console.error(e)
    throw e
  }
}
