import { TProduct, TPurchases, TUser } from "./types";

//Labenu: no database.ts, crie e exporte a constante users e tipe-a como um array do type respectivo criado.
//Labenu: crie pelo menos 2 objetos nesse array.
export const users: TUser[] = [
    {
        id: "u001",
        email: "gabigol@flamail.com",
        password: "987456321"
    },
    {
        id: "u002",
        email: "arrascaeta@flamail.com",
        password: "123654789"
    }
];


//Labenu: no database.ts, crie e exporte a constante products e tipe-a como um array do type respectivo criado.
//Labenu: crie pelo menos 2 objetos nesse array.
export const products: TProduct[] = [
    {
        id: "d001",
        name: "The College Dropout",
        price: 4.795,
        category: "solo"
    },
    {
        id: "d002",
        name: "Late Registration",
        price: 968,
        category: "solo"
    }
];


//Labenu: no database.ts, crie e exporte a constante purchases e tipe-a como um array do type respectivo criado.
//Labenu: crie pelo menos 2 objetos nesse array.
export const purchases: TPurchases[] = [
    {
        userId: "u001",
        productId: "d001",
        quantity: 1,
        totalPrice: 4.795
    },
    {
        userId: "u002",
        productId: "d002",
        quantity: 2,
        totalPrice: 1.936
    }
];