export type User = {
    id: number
    name: string
    register: string
    password: string
    email: string
    role: Role
  }

export  type Role = {
    id: number
    name: string
}

export type Item = {
    id: number
    name: string
    code: string
    state: boolean
    category: string
    color: string
    size: string
    desc: string
    date_created: Date
    date_revovered: Date | null
    user_found: User 
    user_recovered: User | null 
    photo: Blob;
}  

export type Booking = {
    id: number;
    state: boolean; 
    code: string; 
    date_booked: Date;
    date_concluded: Date | null; 
    item: Item; 
    user_booked: User; 
};


export interface ApplicationError {
    error: {
      name: string,
      message: string,
    }
  }

export const categories = ["Documento", "Acessório", "Utensílio", "Eletrônico", "Cartão de Crédito", "Desenho", "Papelaria"]
export const colors = ["Branco", "Preto", "Colorido", "Azul", "Vermelho", "Verde", "Amarelo", "Rosa"]
export const sizes = ["P", "M", "G"]