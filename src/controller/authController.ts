import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../models/User";

const registerUser = async (req: Request, res: Response) => {
  const { userName, email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User is already registered. Please Login" });
    }

    user = new User({ userName, email, password });
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };
    signJwt(payload, res, user);
  } catch (error: any) {
    console.error("error occured", error.message);
    res.status(400).json({ message: error.message });
  }
};

const loginUser = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ message: "User does not exist please register!" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const payload = { user: { id: user.id } };
    signJwt(payload, res, user);
  } catch (error) {
    console.error("error", error);
    res.status(500).send("Server error");
  }
};

function signJwt(payload: any, res: Response, user: any) {
  jwt.sign(
    payload,
    process.env.JWT_SECRET || "",
    { expiresIn: "1h" },
    (err: any, token: any) => {
      if (err) throw err;
      res.json({ user, token });
    },
  );
}

export { registerUser, loginUser };
