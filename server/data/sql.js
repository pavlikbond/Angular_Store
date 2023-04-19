export const dropProductsTableSQL = "DROP TABLE IF EXISTS products";
export const insertProductsSQL = "INSERT INTO products (id, title, price, category, description, image) VALUES ?";

export const createProductsTableSQL = `CREATE TABLE products (
    id int(9) unsigned NOT NULL,
    title varchar(255) NOT NULL,
    price decimal(10,2) NOT NULL,
    category varchar(255) NOT NULL,
    description varchar(1000) NOT NULL,
    image varchar(255) NOT NULL,
    PRIMARY KEY (id)
)`;
