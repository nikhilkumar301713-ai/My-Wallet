import mongoose from "mongoose";

const goalSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: { type: Number, required: true },
    savedAmount: { type: Number, default: 0 },
    targetDate: { type: Date },
    icon: { type: String, default: "target" },
    status: { type: String, enum: ["active", "completed"], default: "active" },
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
