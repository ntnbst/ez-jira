import { Request, Response } from "express";
import jwt from "jsonwebtoken";
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
    jwt.sign(
      payload,
      process.env.JWT_SECRET || "",
      { expiresIn: 36000 },
      (err: any, token: any) => {
        if (err) {
          throw err;
        }
        res.json({ token });
      },
    );
  } catch (error: any) {
    console.error("error occured", error.message);
  }
};

const loginUser = (req: Request, res: Response) => {
  res.send("login user endpoint");
};

export { registerUser, loginUser };
