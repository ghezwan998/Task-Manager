// models/task.model.js
import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: String,
    status: {
      type: String,
      enum: ["incompleted", "completed"],
      default: "incompleted",
    },
    type: {
      type: String,
      enum: ["daily", "weekly", "monthly"],
      default: null,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);
