import { createProductsTableSQL, dropProductsTableSQL, insertProductsSQL } from "./sql.js";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import fetch from "node-fetch";
dotenv.config();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

const loadAndSaveData = async () => {
  try {
    await connection.query(dropProductsTableSQL);
    console.log("***dropped products table***");

    await connection.query(createProductsTableSQL);
    console.log("***created products table***");

    const data = await fetch("https://fakestoreapi.com/products").then((res) => res.json());

    let products = getProductsDataToSave(data);

    await connection.query(insertProductsSQL, [products]);
    console.log("***products saved***");
  } catch (error) {
    console.log(error);
  }
};

const getProductsDataToSave = (data) => {
  const products = data.map((product) => {
    const { id, title, price, category, description, image } = product;
    return [id, title, price, category, description, image];
  });
  return products;
};

await loadAndSaveData();
process.exit(0);
