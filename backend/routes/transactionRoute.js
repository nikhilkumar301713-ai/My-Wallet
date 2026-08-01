import express from "express";
import {
  createTransaction,
  getTransactions,
  updateTransaction,
  deleteTransaction,
  getSummary,
} from "../controllers/transactionController.js";
import isAuth from "../middlewares/isAuth.js";

const transactionRoute = express.Router();

transactionRoute.post("/", isAuth, createTransaction);
transactionRoute.get("/", isAuth, getTransactions);
transactionRoute.get("/summary", isAuth, getSummary);
transactionRoute.put("/:id", isAuth, updateTransaction);
transactionRoute.delete("/:id", isAuth, deleteTransaction);

export default transactionRoute;
