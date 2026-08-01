import express from "express";
import {
  updateProfile,
  toggleDarkMode,
  changePassword,
  getCategories,
  createCategory,
  deleteCategory,
} from "../controllers/userController.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const userRoute = express.Router();

userRoute.put("/profile", isAuth, upload.single("profileImage"), updateProfile);
userRoute.put("/theme", isAuth, toggleDarkMode);
userRoute.put("/change-password", isAuth, changePassword);

userRoute.get("/categories", isAuth, getCategories);
userRoute.post("/categories", isAuth, createCategory);
userRoute.delete("/categories/:id", isAuth, deleteCategory);

export default userRoute;
