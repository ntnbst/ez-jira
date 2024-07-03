import mongoose, { Document, Schema } from "mongoose";

interface ITask extends Document {
  user: string;
  title: string;
  description: string;
  status: string;
  creteadAt: Date;
}

const TaskSchema: Schema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    default: "To Do",
  },
  status: {
    type: String,
    enum: ["To Do", "In Progress", "Done"],
  },

  createdAt: { type: Date, default: Date.now },
});

const Task = mongoose.model<ITask>("Task", TaskSchema);

export default Task;
