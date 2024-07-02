import express from "express";
import authRoutes from "./routes/authRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();

app.get("/", (req, res) => {
  console.log("loading....");
  res.send("Hello");
});

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(4000, () => {
  console.log("app is running");
});
