import express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/transactionAPI.js";

const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

await connect();

app.use(" ", TransactionsApi);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
