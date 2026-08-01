import mongoose from "mongoose";

const budgetSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    limitAmount: { type: Number, required: true },
    month: { type: Number, required: true }, // 1-12
    year: { type: Number, required: true },
  },
  { timestamps: true }
);

budgetSchema.index({ user: 1, category: 1, month: 1, year: 1 }, { unique: true });

export default mongoose.model("Budget", budgetSchema);
