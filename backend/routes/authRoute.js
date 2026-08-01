import express from "express";
import {
  signUp,
  login,
  googleAuth,
  logout,
  forgotPassword,
  resetPassword,
  getCurrentUser,
} from "../controllers/authController.js";
import isAuth from "../middlewares/isAuth.js";

const authRoute = express.Router();

authRoute.post("/signup", signUp);
authRoute.post("/login", login);
authRoute.post("/google", googleAuth);
authRoute.get("/logout", logout);
authRoute.post("/forgot-password", forgotPassword);
authRoute.post("/reset-password", resetPassword);
authRoute.get("/me", isAuth, getCurrentUser);

export default authRoute;
