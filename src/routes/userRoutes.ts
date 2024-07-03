import express from "express";
import getAllUsers from "../controller/userController";
import authMiddleware from "../middleware/authMiddleware";

const Router = express.Router();

Router.get("/", authMiddleware, getAllUsers);

export default Router;
