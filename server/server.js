import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import stripe from "stripe";
import mysql from "mysql2";
dotenv.config();
const app = express();

const connection = await mysql.createConnection(process.env.DATABASE_URL);

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));

const str = stripe(process.env.SECRET_KEY);

//function that takes item as param, read the database and look up the price based on id
let getPrice = async (item) => {
  let [row] = await connection.promise().query("SELECT price FROM products WHERE id = ?", [item.id]);
  return row[0].price;
};

let getLineItems = async (req) => {
  let lineItems = [];
  for (let item of req.body.items) {
    let price = await getPrice(item);
    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.name,
          images: [item.product],
        },
        unit_amount: price * 100,
      },
      quantity: item.quantity,
    });
  }
  return lineItems;
};

app.post("/checkout", async (req, res, next) => {
  try {
    const session = await str.checkout.sessions.create({
      line_items: await getLineItems(req),
      mode: "payment",
      success_url: "http://localhost:4200/success",
      cancel_url: "http://localhost:4200/cart",
    });
    res.status(200).json(session);
  } catch (error) {
    next(error);
  }
});

app.listen(4242, () => console.log("Running on port 4242"));
