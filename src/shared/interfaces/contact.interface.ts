export interface ContactBaseInterface {
  name: string,
  phoneNumber: string,
  email: string,
  message: string
}

export interface ContactInterface extends ContactBaseInterface {
  id: number,
}

export interface ContactFormInterface extends ContactBaseInterface {
  // rien à ajouter
}
