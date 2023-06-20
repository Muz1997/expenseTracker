import express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionsApi from "./routes/transactionAPI.js";
import AuthApi from "./routes/AuthApi.js";
import UserApi from "./routes/UserApi.js";
import passport from "passport";
import passportConfig from "./config/passport.js";
import * as dotenv from "dotenv";
dotenv.config();
const PORT = 4000;
const app = express();
app.use(cors());
app.use(bodyParser.json());

await connect();

app.use("/transaction", TransactionsApi);
app.use("/auth", AuthApi);
app.use("/user", UserApi);
app.use(passport.initialize());
passportConfig(passport);

app.listen(PORT, () => {
  console.log("Server is running at port 4000");
});
