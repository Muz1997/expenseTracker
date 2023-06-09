import User from "../models/User.js";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
export const register = async (req, res) => {
  // get all data from the form
  const { firstName, lastName, email, password } = req.body;

  //check if the use exists with email or not
  const userExist = await User.findOne({ email: email });

  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
  if (userExist) {
    res.status(406).json({ message: "User already exist" });
    return;
  }
  const user = await User({
    firstName,
    lastName,
    email,
    password: hashedPassword,
  });
  await user.save();

  res.status(201).json({ message: "User is created" });
};
export const login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: email });
  if (user) {
    const matched = bcrypt.compare(password, user.password);
    if (!matched) {
      res
        .status(406)
        .json({ message: "Either the password is wrong or email." });
      return;
    }
    //Create JWT Token
    const payload = {
      username: email,
      _id: user._id,
    };
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.json({ message: "successfuly logged in ", token, user });
  } else {
    res.status(406).json({ message: "No User Exist with this email." });
    return;
  }
};
