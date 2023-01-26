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
    category: string
}

export type TPurchases = {
    userId: string,
    productId: string,
    quantity: number,
    totalPrice: number
}

