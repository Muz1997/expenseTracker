import mongoose from "mongoose";
const { Schema } = mongoose;

const transactionSchema = new Schema({
  amount: Number,
  descritpion: String,
  date: { type: Date, default: new Date() },
  createAt: { type: Date, default: Date.now() },
});

export default new mongoose.model("Transaction", transactionSchema);
