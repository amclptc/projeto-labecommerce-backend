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
WHERE name = "The College Dropout";

--Create User
INSERT INTO users(id, email, password)
VALUES ("u004", "evertonribeiro@flamail.com", "calvo7");

--Create Product
INSERT INTO products(id, name, price, category)
VALUES ("d006", "Yeezus", 781, "Solo");

--Get Products by id
SELECT * FROM products
WHERE id = "d006"

--Delete User by id
DELETE FROM users
WHERE id = "u004";

--Delete Product by id
DELETE FROM products
WHERE id = "d006";

--Edit User by id
UPDATE users
SET password = "calvo07"
WHERE id = "u004";

--Edit Product by id
UPDATE products
SET price = 782
WHERE id = "d006";

--Get All Users order by email
SELECT * FROM users
ORDER BY email ASC;

--Get All Products order by price
SELECT * FROM products
ORDER BY price ASC
LIMIT 20
OFFSET 0;

--Get All Products 
SELECT * FROM products
WHERE price > 500 AND price < 1.000
ORDER BY price DESC;

--Labenu: criação da tabela purchases:
CREATE TABLE purchases(
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    total_price REAL NOT NULL,
    paid INTEGER NOT NULL, 
    delivered_at TEXT,
    buyer_id TEXT UNIQUE NOT NULL,
    FOREIGN KEY (buyer_id) REFERENCES users(id)
);

DROP TABLE purchases;

INSERT INTO purchases(id, total_price, paid, delivered_at, buyer_id)
VALUES
("p001", 1000, 0, "2023-05-25 00:02:00", "u001"),
("p002", 500, 0, "2023-05-25 00:02:00", "u001"),
("p003", 123, 0, "2023-05-25 00:02:00", "u002"),
("p004", 1223, 0, "2023-05-25 00:02:00", "u002"),
("p005", 1323, 0, "2023-05-25 00:02:00", "u003"),
("p006", 11123, 0, "2023-05-25 00:02:00", "u003");

SELECT * FROM purchases
INNER JOIN users
ON purchases.buyer_id = users.id;

