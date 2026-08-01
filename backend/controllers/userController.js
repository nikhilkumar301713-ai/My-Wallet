import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import { uploadToCloudinary } from "../configs/cloudinary.js";

export const updateProfile = async (req, res) => {
  try {
    const { name, currency } = req.body;
    const updates = {};
    if (name) updates.name = name;
    if (currency) updates.currency = currency;

    if (req.file) {
      const result = await uploadToCloudinary(req.file.path, "mywallet/profiles");
      updates.profileImage = result.secure_url;
    }

    const user = await User.findByIdAndUpdate(req.userId, updates, { new: true }).select(
      "-password"
    );
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update profile.", error: error.message });
  }
};

export const toggleDarkMode = async (req, res) => {
  try {
    const { darkMode } = req.body;
    const user = await User.findByIdAndUpdate(
      req.userId,
      { darkMode },
      { new: true }
    ).select("-password");
    res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ message: "Failed to update theme.", error: error.message });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);
    if (!user.password) {
      return res.status(400).json({ message: "This account uses Google sign-in." });
    }
    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Current password is incorrect." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();
    res.status(200).json({ message: "Password changed successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to change password.", error: error.message });
  }
};

// ----- Categories -----

export const getCategories = async (req, res) => {
  try {
    const { type } = req.query;
    const filter = { user: req.userId };
    if (type) filter.type = type;
    const categories = await Category.find(filter).sort({ name: 1 });
    res.status(200).json({ categories });
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch categories.", error: error.message });
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, type, icon, color } = req.body;
    const category = await Category.create({
      user: req.userId,
      name,
      type,
      icon,
      color,
    });
    res.status(201).json({ category });
  } catch (error) {
    res.status(500).json({ message: "Failed to create category.", error: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({ _id: req.params.id, user: req.userId });
    if (!category) return res.status(404).json({ message: "Category not found." });
    if (category.isDefault) {
      return res.status(400).json({ message: "Cannot delete a default category." });
    }
    await category.deleteOne();
    res.status(200).json({ message: "Category deleted." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete category.", error: error.message });
  }
};
