//Labenu: utilize um enum para definir pelo menos 3 categorias.
export enum DISCO_CATEGORIES {
    SOLO = "Solo",
    COLLABORATIVE = "Colaborativo",
    MIXTAPES = "Mixtapes"
}

//Labenu: crie tipagens para cada uma das entidades.
export type TUser = {
    id: string,
    email: string,
    password: string
}

export type TProduct = {
    id: string,
    name: string,
    price: number,
    category: DISCO_CATEGORIES
}

export type TPurchases = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}
