import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import Transaction from "./models/Transaction.js";

await mongoose.connect(
  "mongodb+srv://muzamdty:Zenbook1997@expensetracker.s7kx2gp.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB Connection is Successful");
const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.post("/transaction", async (req, res) => {
  const { amount, description, date } = req.body;
  const transaction = new Transaction({
    amount,
    description,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
});

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
