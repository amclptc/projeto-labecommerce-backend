"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllPurchasesFromUserId = exports.createPurchase = exports.queryProductsByName = exports.getProductById = exports.getAllProducts = exports.createProduct = exports.getAllUsers = exports.createUser = exports.purchases = exports.products = exports.users = void 0;
const types_1 = require("./types");
exports.users = [
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
exports.products = [
    {
        id: "d001",
        name: "The College Dropout",
        price: 4.795,
        category: types_1.DISCO_CATEGORIES.SOLO
    },
    {
        id: "d002",
        name: "Late Registration",
        price: 968,
        category: types_1.DISCO_CATEGORIES.SOLO
    }
];
exports.purchases = [
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
const createUser = (id, email, password) => {
    const newUser = {
        id: id,
        email: email,
        password: password
    };
    exports.users.push(newUser);
    console.log("Cadastro realizado com sucesso");
};
exports.createUser = createUser;
const getAllUsers = () => {
    return exports.users;
};
exports.getAllUsers = getAllUsers;
const createProduct = (id, name, price, category) => {
    const newProduct = {
        id: id,
        name: name,
        price: price,
        category: category
    };
    exports.products.push(newProduct);
    console.log("Produto criado com sucesso");
};
exports.createProduct = createProduct;
const getAllProducts = () => {
    return exports.products;
};
exports.getAllProducts = getAllProducts;
const getProductById = (id) => {
    const result = exports.products.find(product => product.id === id);
    return result;
};
exports.getProductById = getProductById;
const queryProductsByName = (q) => {
    const result = exports.products.filter(product => product.name.toLowerCase().includes(q));
    console.log(result);
};
exports.queryProductsByName = queryProductsByName;
const createPurchase = (userId, productId, quantity, totalPrice) => {
    const newPurchase = {
        userId: userId,
        productId: productId,
        quantity: quantity,
        totalPrice: totalPrice
    };
    exports.purchases.push(newPurchase);
    console.log(exports.purchases);
    console.log("Compra realizada com sucesso");
};
exports.createPurchase = createPurchase;
const getAllPurchasesFromUserId = (userIdToSearch) => {
    const result = exports.purchases.filter(purchase => purchase.userId === userIdToSearch);
    console.log(result);
};
exports.getAllPurchasesFromUserId = getAllPurchasesFromUserId;
//# sourceMappingURL=database.js.map