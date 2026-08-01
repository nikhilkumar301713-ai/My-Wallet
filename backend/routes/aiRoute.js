import express from "express";
import { getAiInsights, askAi } from "../controllers/aiController.js";
import isAuth from "../middlewares/isAuth.js";

const aiRoute = express.Router();

aiRoute.post("/insights", isAuth, getAiInsights);
aiRoute.post("/ask", isAuth, askAi);

export default aiRoute;
