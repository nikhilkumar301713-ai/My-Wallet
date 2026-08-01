import express from "express";
import { createBudget, getBudgets, deleteBudget } from "../controllers/budgetController.js";
import isAuth from "../middlewares/isAuth.js";

const budgetRoute = express.Router();

budgetRoute.post("/", isAuth, createBudget);
budgetRoute.get("/", isAuth, getBudgets);
budgetRoute.delete("/:id", isAuth, deleteBudget);

export default budgetRoute;
