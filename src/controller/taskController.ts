import { Request, Response } from "express";
// import User from "../models/User";
import Task from "../models/Task";

export async function createTask(req: Request, res: Response) {
  try {
    let newTask = new Task({
      user: req.user.id,
      title: req.body.title,
      description: req.body.description,
      status: "To Do",
    });

    const task = await newTask.save();
    res.json(task);
  } catch (error) {
    console.log("error in create task", error);
    res.status(500).send("sever error");
  }
}

export async function deleteTask(req: Request, res: Response) {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!!" });
    }
    if (task?.user.toString() !== req?.user?.id) {
      return res
        .status(401)
        .json({ message: "Not Authorized, Not your task pal!" });
    }
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task removed" });
  } catch (error) {
    res.status(500).send("Server error");
  }
}

export async function updateTask(req: Request, res: Response) {
  try {
    const { title, description, status } = req.body;
    let task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ message: "Task not found!!" });
    }
    console.log("task is ", task.user);
    console.log("user is ", req.user.id);
    if (task?.user.toString() !== req.user.id) {
      return res
        .status(401)
        .json({ message: "Not Authorized, Not your task pal!" });
    }
    task = await Task.findByIdAndUpdate(
      req.params.id,
      {
        $set: { title, description, status },
      },
      { new: true },
    );
    res.json(task);
  } catch (error) {
    console.error("error occured", error);
    res.status(500).send("Server error");
  }
}

export async function getAllTasks(req: Request, res: Response) {
  try {
    //only targetting the tasks which has logged in user's id
    const tasks = await Task.find({ user: req.user.id }).sort({
      createdAt: -1,
    });
    res.json(tasks);
  } catch (error) {
    console.error("Something went wrong!", error);
    res.status(500).send("Server Error");
  }
}
