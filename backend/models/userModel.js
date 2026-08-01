import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String }, // not required for OAuth users
    profileImage: { type: String, default: "" },
    authProvider: { type: String, enum: ["local", "google"], default: "local" },
    googleId: { type: String },
    currency: { type: String, default: "USD" }, // preferred display currency
    darkMode: { type: Boolean, default: false },
    resetOtp: { type: String },
    resetOtpExpiry: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
