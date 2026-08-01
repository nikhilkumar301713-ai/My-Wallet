import express from "express";
import {
  createGoal,
  getGoals,
  contributeToGoal,
  updateGoal,
  deleteGoal,
} from "../controllers/goalController.js";
import isAuth from "../middlewares/isAuth.js";

const goalRoute = express.Router();

goalRoute.post("/", isAuth, createGoal);
goalRoute.get("/", isAuth, getGoals);
goalRoute.put("/:id/contribute", isAuth, contributeToGoal);
goalRoute.put("/:id", isAuth, updateGoal);
goalRoute.delete("/:id", isAuth, deleteGoal);

export default goalRoute;
