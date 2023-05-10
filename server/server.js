import express from "express";
import mongoose from "mongoose";
import cors from "cors";

await mongoose.connect(
  "mongodb+srv://muzamdty:Zenbook1997@expensetracker.s7kx2gp.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB Connection is Successful");
const PORT = 4000;
const app = express();
app.use(cors);

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
