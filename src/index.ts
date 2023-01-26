import { users, products, purchases, createUser, getAllUsers, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { DISCO_CATEGORIES, TUser } from "./types"



//Labenu: coloque um console.log só para verificar se tudo funcionou.
// console.log("Tudo funcionando!")

//Labenu: vá para o index.ts e importe as constantes users, products e purchases.
//Labenu: coloque um console.log para cada e rode a aplicação com o script de start para ver se deu tudo certo!

// -----------------CONSOLE.LOG DOS ARRAYS-------------
// console.log(users);
// console.log(products);
// console.log(purchases);
// -----------------CONSOLE.LOG DOS ARRAYS-------------

//Labenu: desenvolva uma função para cada funcionalidade (database.ts).
//Labenu: chame cada uma no index.ts e verifique se estão funcionando dando console.log (index.ts).

// ----------------- TESTES DAS FUNÇÕES ------------------------------
// createUser("u003", "pedro@flamail.com", "40028922");
// console.log(users);
// getAllUsers();
// getProductById("d001");
// queryProductsByName("the");
// createPurchase("u001", "d001", 2, 9.590);
// getAllPurchasesFromUserId("u002")
// ----------------- TESTES DAS FUNÇÕES ------------------------------


const app = express()

//amclptc: configurar o middleware que garante que as respostas estejam sempre em json:
app.use(express.json())

//amclptc: configurar o middleware que habilita o CORS:
app.use(cors());

//amclptc: fazer o servidor escutar alguma porta da máquina e sinalizar que a aplicação está pronta:
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});

//Labenu: crie um endpoint de teste.
app.get("/ping", (req: Request, res: Response) => {
    res.send("pong!");
});

//Labenu: crie endpoints para automatizar a manipulação dos dados do arquivo database.ts.
//Get All Users:
app.get("/users", (req: Request, res: Response) => {
    res.status(200).send(users);
})

//Get All Products:
app.get("/products", (req: Request, res: Response) => {
    res.status(200).send(products);
})

//Search Product by name:
app.get("/product/search", (req: Request, res: Response) => {
    const q = req.query.q as string;
    const result = products.filter(product => product.name.toLowerCase().includes(q))
    res.status(200).send(result)
})

//Create User:
app.post("/users",(req: Request, res: Response) => {
    const id = req.body.id as string;
    const email = req.body.email as string;
    const password = req.body.password as string;

    const newUser: TUser = {
        id,
        email,
        password
    }

    users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
})

//Create Product:
app.post("/products",(req: Request, res: Response) => {
    const id = req.body.id as string;
    const name = req.body.name as string;
    const price = req.body.price as number;
    const category = req.body.category as DISCO_CATEGORIES;

    const newProduct = {
        id,
        name,
        price,
        category
    }

    products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
})

//Create Purchase:
app.post("/purchases",(req: Request, res: Response) => {
    const userId = req.body.userId as string;
    const productId = req.body.productId as string;
    const quantity = req.body.quantity as number;
    const totalPrice = req.body.totalPrice as number;

    const newPurchase = {
        userId,
        productId,
        quantity,
        totalPrice
    }

    purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
})


