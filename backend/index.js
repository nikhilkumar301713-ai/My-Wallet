
import dotenv from "dotenv";
dotenv.config();

import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDb from "./configs/db.js";
import cloudinaryConnect from "./configs/cloudinary.js";

import authRoute from "./routes/authRoute.js";
import userRoute from "./routes/userRoute.js";
import transactionRoute from "./routes/transactionRoute.js";
import budgetRoute from "./routes/budgetRoute.js";
import goalRoute from "./routes/goalRoute.js";
import reportRoute from "./routes/reportRoute.js";
import aiRoute from "./routes/aiRoute.js";

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "https://my-wallet-5uah.onrender.com",
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());

cloudinaryConnect();

app.get("/", (req, res) => {
  res.send("MyWallet API is running.");
});

app.use("/api/auth", authRoute);
app.use("/api/user", userRoute);
app.use("/api/transactions", transactionRoute);
app.use("/api/budgets", budgetRoute);
app.use("/api/goals", goalRoute);
app.use("/api/reports", reportRoute);
app.use("/api/ai", aiRoute);

app.listen(PORT, () => {
  connectDb();
  console.log(`Server running on port ${PORT}`);
});