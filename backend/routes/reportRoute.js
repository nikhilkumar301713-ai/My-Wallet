import express from "express";
import {
  getTrend,
  convertCurrency,
  getExportData,
} from "../controllers/reportController.js";
import isAuth from "../middlewares/isAuth.js";

const reportRoute = express.Router();

reportRoute.get("/trend", isAuth, getTrend);
reportRoute.get("/currency-convert", isAuth, convertCurrency);
reportRoute.get("/export", isAuth, getExportData);

export default reportRoute;
