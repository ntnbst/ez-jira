import { Request, Response } from "express";
import User from "../models/User";

const getAllUsers = async (req: Request, res: Response) => {
  const users = await User.find({});
  res.json(users);
};

export default getAllUsers;
