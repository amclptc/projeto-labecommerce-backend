import { users, products, purchases, createUser, getAllUsers, getProductById, queryProductsByName, createPurchase, getAllPurchasesFromUserId } from "./database"
import express, { Request, Response } from 'express'
import cors from 'cors'
import { DISCO_CATEGORIES, TUser } from "./types"
import { knex } from "knex"
import { db } from "./database/knex"

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
app.get("/users", async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`SELECT * FROM users;`)
        const result = await db.select("*").from("users");

        res.status(200).send(result); 

    } catch(error: any) {
		console.log(error)

		res.status(400).send(error.message)
    }
})

//Get All Products:
app.get("/products", async (req: Request, res: Response) => {
    try {
        // const result = await db.raw(`SELECT * FROM products;`)
        const result = await db.select("*").from("products");
        res.status(200).send(result);

    } catch (error: any) {
        console.log(error)

		res.status(400).send(error.message)
    }
})

//Search Product by name:
app.get("/product/search", async (req: Request, res: Response) => {
    try {
        const q = req.query.q as string;
        // const result = products.filter(product => product.name.toLowerCase().includes(q))
        
        if(q.length < 1){
            throw new Error("O termo pesquisado deve ter pelo menos 1 caractere.")
        }

        // const result = await db.raw(`
        //     SELECT * FROM products
        //     WHERE name = "${q}";
        //     `)

        const result = await db.select("*").from("products").where({name: q});
        
        res.status(200).send(result)
    
    }catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }

})

//Create User:
app.post("/users", async (req: Request, res: Response) => {
    try {
        const id = req.body.id as string;
        const email = req.body.email as string;
        const password = req.body.password as string;
    
        const newUser: TUser = {
            id,
            email,
            password
        }

        if(id !== undefined){
            if(typeof id !== "string"){
                return res.status(400).send("'id' deve ser uma string");
            }
        }

        if(email !== undefined){
            if(typeof email !== "string"){
                return res.status(400).send("'id' deve ser uma string");
            }
        }

        if(password !== undefined){
            if(typeof password !== "string"){
                return res.status(400).send("'id' deve ser uma string");
            }
        }

        const idExists = users.find((user) => user.id === id)
        if(idExists){
            throw new Error("'id' já cadastrada")
        }

        const emailExists = users.find((user) => user.email === email)
        if(emailExists){
            throw new Error("'email' já cadastrado")
        }

        // users.push(newUser);
        await db.raw(`
            INSERT INTO users (id, email, password)
            VALUES ("${id}", "${email}", "${password}");

        `)

        res.status(201).send("Cadastro realizado com sucesso");
        
    } catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }
})

//Create Product:
app.post("/products", async (req: Request, res: Response) => {
    try {
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
        if(id !== undefined){
            if(typeof id !== "string"){
                return res.status(400).send("'id' deve ser uma string");
            }
        }

        if(name !== undefined){
            if(typeof name !== "string"){
                return res.status(400).send("'name' deve ser uma string");
            }
        }

        if(price !== undefined){
            if(typeof price !== "number"){
                return res.status(400).send("'price' deve ser um number");
            }
        }
//PROBLEMA: NÃO CONSEGUI FAZER A VALIDAÇÃO DE CATEGORY COM ENUM:
        if(category !== undefined){
            if(typeof category !== "string"){
                return res.status(400).send("'category' deve ser uma string");
            }
        }

        const idExists = products.find((product) => product.id === id)
        if(idExists){
            throw new Error("'id' já cadastrada")
        }

        // products.push(newProduct);
        await db.raw(`
            INSERT INTO products(id, name, price, category)
            VALUES ("${id}", "${name}", "${price}", "${category}");
        `)
        
        res.status(201).send("Produto cadastrado com sucesso");
        
    } catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }
})

//Create Purchase:
app.post("/purchases", async(req: Request, res: Response) => {
    try {
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
        if(userId !== undefined){
            if(typeof userId !== "string"){
                return res.status(400).send("'id do usuário' deve ser uma string")
            }
        }

        if(productId !== undefined){
            if(typeof productId !== "string"){
                return res.status(400).send("'id do produto' deve ser uma string")
            }
        }

        if(quantity !== undefined){
            if(typeof quantity !== "number"){
                return res.status(400).send("'quantidade' deve ser um number")
            }
        }

        if(totalPrice !== undefined){
            if(typeof totalPrice !== "number"){
                return res.status(400).send("'preço total' deve ser um number")
            }
        }

        const userExists = users.find((user) => user.id === userId)
        if(!userExists){
            throw new Error("usuário não cadastrado")
        }

        const productExists = products.find((product) => product.id === productId)
        if(!productExists){
            throw new Error("produto não cadastrado")
        }

//PROBLEMA: NÃO CONSEGUI FAZER A VALIDAÇÃO SE A SOMA DA QUANTIDADE E TOTAL DA COMPRA BATEM:
        // purchases.push(newPurchase);
        await db.raw(`
            INSERT INTO purchases(userId, productId, quantity, totalPrice)
            VALUES ("${userId}", "${productId}", "${quantity}", "${totalPrice}");
        `)

        res.status(201).send("Compra realizada com sucesso");

    } catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }
})

//Labenu: continuar criando endpoints para automatizar a manipulação dos dados.
//Get Products by id:
app.get("/products/:id", async(req: Request, res: Response) => {
    try {
        const id = req.params.id as string
        // const result = products.find(product => product.id === id);

        // if(!result){
        //     res.statusCode = 404
        //     throw new Error("produto não cadastrado")
        // }

        const result = await db.raw(`
            SELECT * FROM products
            WHERE id = "${id}"
        `)
        res.status(200).send(result);



    } catch (error: any) {
        console.log(error)
		res.send(error.message)
    }

});

//Get User Purchases by User id:
app.get("/users/:id/purchases", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        // const result = purchases.filter(purchase => purchase.userId === id);

        if(!id){
            res.statusCode = 404
            throw new Error("usuário não cadastrado")
        }

        const result = await db.raw(`
            SELECT * FROM users
            WHERE userId = "${id}"
        `)

        res.status(200).send(result);
    } catch (error: any) {
        console.log(error)
		res.send(error.message)
    }
});


//Labenu: praticar o método DELETE, criando endpoints para automatizar a manipulação dos dados.
//Delete User by id:
app.delete("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const userIndex = users.findIndex((user) => user.id === id);

        if(userIndex >= 0) {
            users.splice(userIndex, 1)
        };

        const result = users.find(user => user.id === id);
        if(!result){
            throw new Error("usuário não cadastrado")
        }

        res.status(200).send("usuário deletado com sucesso!")

    } catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }
});

//Delete Product by id:
app.delete("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const productIndex = products.findIndex((product) => product.id === id);

        if(productIndex >= 0){
            products.splice(productIndex, 1)
        }

        const result = products.find(product => product.id === id);
        if(!result){
            throw new Error("produto não cadastrado")
        }

        res.status(200).send("Produto apagado com sucesso!")
        
    } catch (error: any) {
        console.log(error)
		res.status(400).send(error.message)
    }
    }
);


//Labenu: praticar o método PUT, criando endpoints para automatizar a manipulação dos dados.
//Edit User by id:
app.put("/users/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id as string | undefined;
        const email = req.body.email as string | undefined;
        const password = req.body.password as string | undefined;
    
        const user = users.find((user) => user.id === id)
    
        if(!user){
            res.statusCode = 404
            throw new Error("usuário não encontrado")
        }
        if(id !== undefined){
            if(typeof id !== "string"){
                return res.status(400).send("'id' deve ser uma string")
            }
        }

        if(email !== undefined){
            if(typeof email !== "string"){
                return res.status(400).send("'email' deve ser uma string")
            }
        }

        if(password !== undefined){
            if(typeof password !== "string"){
                return res.status(400).send("'password' deve ser uma string")
            }
        }

        if(user) {
            user.id = id || user.id;
            user.email = email || user.email;
            user.password = password || user.password;
        }
    
        res.status(200).send("Cadastro atualizado com sucesso")
        
    } catch (error: any) {
        console.log(error)
		res.send(error.message)
    }
})

////Edit Product by id:
app.put("/products/:id", (req: Request, res: Response) => {
    try {
        const id = req.params.id as string | undefined;
        const name = req.body.name as string | undefined;
        const price = req.body.price as number | undefined;
        const category = req.body.category as DISCO_CATEGORIES | undefined;
        
        const product = products.find((product) => product.id === id);
        
        if(!product){
            res.statusCode = 404
            throw new Error("produto não cadastrado")
        }

        if(id !== undefined){
            if(typeof id !== "string"){
                return res.status(400).send("'id' deve ser uma string");
            }
        }

        if(name !== undefined){
            if(typeof name !== "string"){
                return res.status(400).send("'name' deve ser uma string");
            }
        }

        if(price !== undefined){
            if(typeof price !== "number"){
                return res.status(400).send("'price' deve ser um number")
            }
        }

        if(category !== undefined){
            if(typeof category !== "string"){
                return res.status(400).send("'category' deve ser uma string")
            }
        }

        if(product){
            product.id = id || product.id;
            product.name = name || product.name;
            product.price = price || product.price;
            product.category = category || product.category;
        }
    
        res.status(200).send("Produto atualizado com sucesso");

    } catch (error: any) {
        console.log(error)
		res.send(error.message)
    }
});

//Get Purchase by Id:
app.get("/purchases/:id", async (req: Request, res: Response) => {
    try {
        const id = req.params.id as string;
        const result = await db.select("*").from("purchases").where({id: id});

        res.status(200).send(result);
    } catch (error: any) {
        console.log(error)
		res.send(error.message)
    }
})
