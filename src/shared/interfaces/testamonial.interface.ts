export interface TestamonialBaseInterface {
  name: string
  job: string
  image: string
  message: string
}

export interface TestamonialInterface extends TestamonialBaseInterface {
  id: number
}

export interface TestamonialFormInterface extends TestamonialBaseInterface {
  // rien à ajouter
}
