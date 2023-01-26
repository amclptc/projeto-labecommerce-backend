"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.purchases = exports.products = exports.users = void 0;
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
        category: "solo"
    },
    {
        id: "d002",
        name: "Late Registration",
        price: 968,
        category: "solo"
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
//# sourceMappingURL=database.js.map