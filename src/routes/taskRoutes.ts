import express from "express";
import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask,
} from "../controller/taskController";
import authMiddleware from "../middleware/authMiddleware";

const Router = express.Router();

// /api/tasks
Router.post("/", authMiddleware, createTask);
Router.get("/", authMiddleware, getAllTasks);
Router.put("/:id", authMiddleware, updateTask);
Router.delete("/:id", authMiddleware, deleteTask);

export default Router;
