import express from "express";
import { loginUser, registerUser } from "../controller/authController";

const Router = express.Router();

Router.post("/register", registerUser);
Router.post("/login", loginUser);

export default Router;
