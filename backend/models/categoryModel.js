import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    icon: { type: String, default: "tag" },
    color: { type: String, default: "#6366f1" },
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
