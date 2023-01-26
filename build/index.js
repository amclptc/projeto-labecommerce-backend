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
    res.status(200).send(database_1.users);
});
app.get("/products", (req, res) => {
    res.status(200).send(database_1.products);
});
app.get("/product/search", (req, res) => {
    const q = req.query.q;
    const result = database_1.products.filter(product => product.name.toLowerCase().includes(q));
    res.status(200).send(result);
});
app.post("/users", (req, res) => {
    const id = req.body.id;
    const email = req.body.email;
    const password = req.body.password;
    const newUser = {
        id,
        email,
        password
    };
    database_1.users.push(newUser);
    res.status(201).send("Cadastro realizado com sucesso");
});
app.post("/products", (req, res) => {
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
    database_1.products.push(newProduct);
    res.status(201).send("Produto cadastrado com sucesso");
});
app.post("/purchases", (req, res) => {
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
    database_1.purchases.push(newPurchase);
    res.status(201).send("Compra realizada com sucesso");
});
app.get("/products/:id", (req, res) => {
    const id = req.params.id;
    const result = database_1.products.find(product => product.id === id);
    res.status(200).send(result);
});
app.get("/users/:id/purchases", (req, res) => {
    const id = req.params.id;
    const result = database_1.purchases.filter(purchase => purchase.userId === id);
    res.status(200).send(result);
});
app.delete("/users/:id", (req, res) => {
    const id = req.params.id;
    const userIndex = database_1.users.findIndex((user) => user.id === id);
    if (userIndex >= 0) {
        database_1.users.splice(userIndex, 1);
    }
    ;
    res.status(200).send("User apagado com sucesso!");
    console.log(id);
});
app.delete("/products/:id", (req, res) => {
    const id = req.params.id;
    const productIndex = database_1.products.findIndex((product) => product.id === id);
    if (productIndex >= 0) {
        database_1.products.splice(productIndex, 1);
    }
    res.status(200).send("Produto apagado com sucesso!");
    console.log(id);
});
app.put("/users/:id", (req, res) => {
    const id = req.params.id;
    const email = req.body.email;
    const password = req.body.password;
    const user = database_1.users.find((user) => user.id === id);
    if (user) {
        user.id = id || user.id;
        user.email = email || user.email;
        user.password = password || user.password;
    }
    res.status(200).send("Cadastro atualizado com sucesso");
});
app.put("/products/:id", (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const price = req.body.price;
    const category = req.body.category;
    const product = database_1.products.find((product) => product.id === id);
    if (product) {
        product.id = id || product.id;
        product.name = name || product.name;
        product.price = price || product.price;
        product.category = category || product.category;
    }
    res.status(200).send("Produto atualizado com sucesso");
});
//# sourceMappingURL=index.js.map