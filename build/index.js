"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cors_1.default)());
app.listen(3003, () => {
    console.log("Servidor rodando na porta 3003");
});
app.get("/ping", (req, res) => {
    res.send("pong!");
});
app.get("/users", (req, res) => {
    try {
        res.status(200).send(database_1.users);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.get("/products", (req, res) => {
    try {
        res.status(200).send(database_1.products);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.get("/product/search", (req, res) => {
    try {
        const q = req.query.q;
        const result = database_1.products.filter(product => product.name.toLowerCase().includes(q));
        if (q.length < 1) {
            throw new Error("O termo pesquisado deve ter pelo menos 1 caractere.");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.post("/users", (req, res) => {
    try {
        const id = req.body.id;
        const email = req.body.email;
        const password = req.body.password;
        const newUser = {
            id,
            email,
            password
        };
        if (typeof id !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        if (typeof email !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        if (typeof password !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        const idExists = database_1.users.find((user) => user.id === id);
        if (idExists) {
            throw new Error("'id' já cadastrada");
        }
        const emailExists = database_1.users.find((user) => user.email === email);
        if (emailExists) {
            throw new Error("'email' já cadastrado");
        }
        database_1.users.push(newUser);
        res.status(201).send("Cadastro realizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.post("/products", (req, res) => {
    try {
        const id = req.body.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const newProduct = {
            id,
            name,
            price,
            category
        };
        if (typeof id !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        if (typeof name !== "string") {
            return res.status(400).send("'name' deve ser uma string");
        }
        if (typeof price !== "string") {
            return res.status(400).send("'price' deve ser uma string");
        }
        if (typeof category !== "string") {
            return res.status(400).send("'category' deve ser uma string");
        }
        const idExists = database_1.products.find((product) => product.id === id);
        if (idExists) {
            throw new Error("'id' já cadastrada");
        }
        database_1.products.push(newProduct);
        res.status(201).send("Produto cadastrado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.post("/purchases", (req, res) => {
    try {
        const userId = req.body.userId;
        const productId = req.body.productId;
        const quantity = req.body.quantity;
        const totalPrice = req.body.totalPrice;
        const newPurchase = {
            userId,
            productId,
            quantity,
            totalPrice
        };
        if (typeof userId !== "string") {
            return res.status(400).send("'id do usuário' deve ser uma string");
        }
        if (typeof productId !== "string") {
            return res.status(400).send("'id do produto' deve ser uma string");
        }
        if (typeof quantity !== "number") {
            return res.status(400).send("'quantidade' deve ser um number");
        }
        if (typeof totalPrice !== "number") {
            return res.status(400).send("'preço total' deve ser um number");
        }
        const userExists = database_1.users.find((user) => user.id === userId);
        if (!userExists) {
            throw new Error("usuário não cadastrado");
        }
        const productExists = database_1.products.find((product) => product.id === productId);
        if (!productExists) {
            throw new Error("produto não cadastrado");
        }
        database_1.purchases.push(newPurchase);
        res.status(201).send("Compra realizada com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.get("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.products.find(product => product.id === id);
        if (!result) {
            throw new Error("produto não cadastrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.get("/users/:id/purchases", (req, res) => {
    try {
        const id = req.params.id;
        const result = database_1.purchases.filter(purchase => purchase.userId === id);
        if (!result) {
            throw new Error("usuário não cadastrado");
        }
        res.status(200).send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.delete("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const userIndex = database_1.users.findIndex((user) => user.id === id);
        if (userIndex >= 0) {
            database_1.users.splice(userIndex, 1);
        }
        ;
        const result = database_1.users.find(user => user.id === id);
        if (!result) {
            throw new Error("usuário não cadastrado");
        }
        res.status(200).send("User apagado com sucesso!");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.delete("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const productIndex = database_1.products.findIndex((product) => product.id === id);
        if (productIndex >= 0) {
            database_1.products.splice(productIndex, 1);
        }
        const result = database_1.products.find(product => product.id === id);
        if (!result) {
            throw new Error("produto não cadastrado");
        }
        res.status(200).send("Produto apagado com sucesso!");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.put("/users/:id", (req, res) => {
    try {
        const id = req.params.id;
        const email = req.body.email;
        const password = req.body.password;
        const user = database_1.users.find((user) => user.id === id);
        if (!user) {
            throw new Error("usuário não encontrado");
        }
        if (typeof id !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        if (typeof email !== "string") {
            return res.status(400).send("'email' deve ser uma string");
        }
        if (typeof password !== "string") {
            return res.status(400).send("'password' deve ser uma string");
        }
        if (user) {
            user.id = id || user.id;
            user.email = email || user.email;
            user.password = password || user.password;
        }
        res.status(200).send("Cadastro atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
app.put("/products/:id", (req, res) => {
    try {
        const id = req.params.id;
        const name = req.body.name;
        const price = req.body.price;
        const category = req.body.category;
        const product = database_1.products.find((product) => product.id === id);
        if (!product) {
            throw new Error("produto não cadastrado");
        }
        if (typeof id !== "string") {
            return res.status(400).send("'id' deve ser uma string");
        }
        if (typeof name !== "string") {
            return res.status(400).send("'name' deve ser uma string");
        }
        if (typeof price !== "number") {
            return res.status(400).send("'price' deve ser um number");
        }
        if (typeof category !== "string") {
            return res.status(400).send("'category' deve ser uma string");
        }
        if (product) {
            product.id = id || product.id;
            product.name = name || product.name;
            product.price = price || product.price;
            product.category = category || product.category;
        }
        res.status(200).send("Produto atualizado com sucesso");
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
});
//# sourceMappingURL=index.js.map