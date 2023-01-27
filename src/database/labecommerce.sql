-- Active: 1674815397413@@127.0.0.1@3306

--Labenu: criação da tabela de pessoas usuárias:
CREATE TABLE users(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
);

--Labenu: populando a tabela de pessoas usuárias:
INSERT INTO users (id, email, password)
VALUES 
("u001", "gabigol@flamail.com", "987456321"),
("u002", "arrascaeta@flamail.com", "123654789"),
("u003", "pedro@flamail.com", "queixada09");

--Labenu: criação da tabela de produtos:
CREATE TABLE products(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    name TEXT NOT NULL, 
    price REAL NOT NULL,
    category TEXT NOT NULL
);

--Labenu: populando a tabela de produtos:
INSERT INTO products(id, name, price, category)
VALUES
("d001", "The College Dropout", 4.795, "Solo"),
("d002", "Late Registration", 968, "Solo"),
("d003", "Graduation", 766, "Solo"),
("d004", "808s & Heartbreak", 5.268, "Solo"),
("d005", "My Beautiful Dark Twisted Fantasy", 2.023, "Solo")

--Get All Users
SELECT * FROM users;

--Get All Products
SELECT * FROM products;

--Search Product by name
SELECT * FROM products
WHERE name = x;

--Create User
INSERT INTO users(id, name, price, category)
VALUES (x);

--Create Product
INSERT INTO products(id, name, price, category)
VALUES (X);

--Get Products by id
SELECT * FROM products
WHERE id = x;

--Delete User by id
DELETE FROM users
WHERE id = x;

--Delete Product by id
DELETE FROM products
WHERE id = x;

--Edit User by id
UPDATE users
SET x = "x"
WHERE id = x;

--Edit Product by id
UPDATE products
SET x = "x"
WHERE id = x;

--Get All Users order by email
SELECT * FROM users
ORDER BY email ASC;

--Get All Products order by price
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

--Get All Products
SELECT * FROM products;
