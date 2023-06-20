import { Router } from "express";
import Transaction from "../models/Transaction.js";
import passport from "passport";
import * as TransactionController from "../controller/TransactionController.js";

const router = Router();

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  TransactionController.index
);

router.post("/", TransactionController.create);

router.delete("/:_id", TransactionController._delete);

router.patch("/:_id", TransactionController.update);

export default router;
