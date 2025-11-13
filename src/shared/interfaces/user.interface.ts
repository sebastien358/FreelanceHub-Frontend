export interface UserBaseInterface {
  email: string,
  password: string,
}

export interface UserInterface extends UserBaseInterface {
  id: number,
  roles: string
}

export interface UserFormInterface extends UserBaseInterface {
  // rien à ajouter
}
