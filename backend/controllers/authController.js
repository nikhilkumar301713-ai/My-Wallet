import bcrypt from "bcryptjs";
import User from "../models/userModel.js";
import Category from "../models/categoryModel.js";
import { genToken, verifyToken } from "../configs/token.js";
import { sendMail, otpMailTemplate } from "../configs/Mail.js";

const DEFAULT_CATEGORIES = [
  { name: "Salary", type: "income", color: "#22c55e", icon: "briefcase" },
  { name: "Freelance", type: "income", color: "#06b6d4", icon: "laptop" },
  { name: "Investments", type: "income", color: "#8b5cf6", icon: "trending-up" },
  { name: "Food & Dining", type: "expense", color: "#f97316", icon: "utensils" },
  { name: "Transportation", type: "expense", color: "#eab308", icon: "car" },
  { name: "Shopping", type: "expense", color: "#ec4899", icon: "shopping-bag" },
  { name: "Bills & Utilities", type: "expense", color: "#ef4444", icon: "file-text" },
  { name: "Entertainment", type: "expense", color: "#6366f1", icon: "film" },
  { name: "Healthcare", type: "expense", color: "#14b8a6", icon: "heart" },
  { name: "Other", type: "expense", color: "#64748b", icon: "more-horizontal" },
];

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required." });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "Email already registered." });
    }
    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hashedPassword });

    await Category.insertMany(
      DEFAULT_CATEGORIES.map((c) => ({ ...c, user: user._id, isDefault: true }))
    );

    const token = genToken(user._id);
    res.cookie("token", token, cookieOptions);

    const { password: _pw, ...userData } = user._doc;
    res.status(201).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ message: "Sign up failed.", error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user || !user.password) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password." });
    }
    const token = genToken(user._id);
    res.cookie("token", token, cookieOptions);

    const { password: _pw, ...userData } = user._doc;
    res.status(200).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ message: "Login failed.", error: error.message });
  }
};

export const googleAuth = async (req, res) => {
  try {
    const { name, email, googleId, profileImage } = req.body;
    if (!email || !googleId) {
      return res.status(400).json({ message: "Google authentication data missing." });
    }
    let user = await User.findOne({ email });
    if (!user) {
      user = await User.create({
        name,
        email,
        googleId,
        profileImage,
        authProvider: "google",
      });
      await Category.insertMany(
        DEFAULT_CATEGORIES.map((c) => ({ ...c, user: user._id, isDefault: true }))
      );
    }
    const token = genToken(user._id);
    res.cookie("token", token, cookieOptions);

    const { password: _pw, ...userData } = user._doc;
    res.status(200).json({ user: userData, token });
  } catch (error) {
    res.status(500).json({ message: "Google authentication failed.", error: error.message });
  }
};

export const logout = async (req, res) => {
  res.status(200).json({ message: "Logged out successfully." });
};

export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "No account found with this email." });
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    user.resetOtp = otp;
    user.resetOtpExpiry = Date.now() + 10 * 60 * 1000;
    await user.save();

    await sendMail({
      to: email,
      subject: "MyWallet - Password Reset OTP",
      html: otpMailTemplate(otp),
    });

    res.status(200).json({ message: "OTP sent to your email." });
  } catch (error) {
    res.status(500).json({ message: "Failed to send OTP.", error: error.message });
  }
};

export const resetPassword = async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const user = await User.findOne({ email });
    if (!user || user.resetOtp !== otp || user.resetOtpExpiry < Date.now()) {
      return res.status(400).json({ message: "Invalid or expired OTP." });
    }
    user.password = await bcrypt.hash(newPassword, 10);
    user.resetOtp = undefined;
    user.resetOtpExpiry = undefined;
    await user.save();
    res.status(200).json({ message: "Password reset successful. Please log in." });
  } catch (error) {
    res.status(500).json({ message: "Failed to reset password.", error: error.message });
  }
};

export const getCurrentUser = async (req, res) => {
  res.status(200).json({ user: req.user });
};
