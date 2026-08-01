import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    type: { type: String, enum: ["income", "expense"], required: true },
    amount: { type: Number, required: true },
    currency: { type: String, default: "USD" },
    category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
    note: { type: String, default: "" },
    date: { type: Date, default: Date.now },
    paymentMethod: { type: String, default: "cash" },
  },
  { timestamps: true }
);

transactionSchema.index({ user: 1, date: -1 });
transactionSchema.index({ user: 1, category: 1 });

export default mongoose.model("Transaction", transactionSchema);
