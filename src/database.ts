import { TProduct, TPurchases, TUser, DISCO_CATEGORIES } from "./types";

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
        category: DISCO_CATEGORIES.SOLO
    },
    {
        id: "d002",
        name: "Late Registration",
        price: 968,
        category: DISCO_CATEGORIES.SOLO
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


//Labenu: desenvolva uma função para cada funcionalidade (database.ts).
//Labenu: chame cada uma no index.ts e verifique se estão funcionando dando console.log (index.ts).

//cria uma nova pessoa na lista de users:
export const createUser = (id:string, email:string, password:string) => {
    const newUser = {
        id: id,
        email: email,
        password: password
    }
    users.push(newUser);
    console.log("Cadastro realizado com sucesso");
}

//busca todas as pessoas da lista de users:
export const getAllUsers = () => {
    return users;
}

//cria um novo produto na lista de products:
export const createProduct = (id:string, name:string, price:number, category:DISCO_CATEGORIES) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category  
    };
    products.push(newProduct);
    console.log("Produto criado com sucesso");
}

//busca todos os produtos da lista de products:
export const getAllProducts = () => {
    return products;
}

//busca por produtos baseado em um id da lista de products:
export const getProductById = (id:string) => {
    const result = products.find(product => product.id === id);
    return result;
}

//busca por produtos na lista de produtos baseado em um termo procurado:
export const queryProductsByName = (q:string) => {
    const result = products.filter(product => product.name.toLowerCase().includes(q));
    console.log(result);
}

//cria uma nova compra na lista de purchases:
export const createPurchase = (userId:string, productId:string, quantity:number, totalPrice:number) => {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    purchases.push(newPurchase);
    console.log(purchases)
    console.log("Compra realizada com sucesso");
}

//busca todas as compras feitas baseado no id do usuário:
export const getAllPurchasesFromUserId  = (userIdToSearch:string) => {
    const result = purchases.filter(purchase => purchase.userId === userIdToSearch);
    console.log(result);
}