import { Request, Response } from "express";

const registerUser = (req: Request, res: Response) => {
  res.send("register user endpoint");
};

const loginUser = (req: Request, res: Response) => {
  res.send("login user endpoint");
};

export { registerUser, loginUser };
