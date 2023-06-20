import Transaction from "../models/Transaction.js";
export const index = async (req, res) => {
  const transaction = await Transaction.find({}).sort({ createAt: -1 });
  res.json({ data: transaction });
};

export const create = async (req, res) => {
  const { amount, descritpion, date } = req.body;
  const transaction = new Transaction({
    amount,
    descritpion,
    date,
  });
  await transaction.save();
  res.json({ message: "Success" });
};

export const _delete = async (req, res) => {
  const id = req.params._id;
  await Transaction.findOneAndDelete({ _id: id });
  res.json({ message: "success" });
};

export const update = async (req, res) => {
  await Transaction.updateOne({ _id: req.params._id }, { $set: req.body });
  res.json({ message: "success" });
};
