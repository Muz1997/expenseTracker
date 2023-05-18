import { Router } from "express";
import Transaction from "../models/Transaction.js";

const router = Router();

router.get("/", async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createAt: -1 });
  res.json({ data: transaction });
});

router.post("/", async (req, res) => {
  const { amount, descritpion, date } = req.body;
  const transaction = new Transaction({
    amount,
    descritpion,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
});

router.delete("/:_id", async (req, res) => {
  const id = req.params._id;
  await Transaction.findOneAndDelete({ _id: id });
  res.json({ message: "success" });
});

router.patch("/:_id", async (req, res) => {
  await Transaction.updateOne({ _id: req.params._id }, { $set: req.body });
  res.json({ message: "success" });
});

export default router;
