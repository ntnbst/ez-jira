import express from "express";
import getAllUsers from "../controller/userController";

const Router = express.Router();

Router.get("/", getAllUsers);

export default Router;
