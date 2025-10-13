import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { errorHandaler } from "./../utils/error.js";
import jwt from "jsonwebtoken";
export const signup = async (req, res, next) => {
  try {
    const { userName, email, password } = req.body;
    const hashedPassword = bcrypt.hashSync(password, 10);
    const newUser = new User({ userName, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      message: "User Created Successfully",
      user: newUser,
    });
  } catch (error) {
    // console.error("Signup error:", error);
    // res.status(500).json({ message: "Server error", error: error.message });
    next(error);
  }
};

export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    const validuser = await User.findOne({ email });
    if (!validuser) return next(errorHandaler(404, "user not found"));
    const validPassword = bcrypt.compareSync(password, validuser.password);
    if (!validPassword) return next(errorHandaler(401, "Wrong Crendtail"));
    const token = jwt.sign({ id: validuser._id }, process.env.JWT_SECRET);
    const { password: pass, ...rest } = validuser._doc;
    res
      .cookie("access_token", token, { httpOnly: true })
      .status(200)
      .json(rest);
  } catch (error) {
    next(error);
  }
};
