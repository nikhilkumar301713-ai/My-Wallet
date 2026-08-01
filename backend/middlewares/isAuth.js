import { verifyToken } from "../configs/token.js";
import User from "../models/userModel.js";

const isAuth = async (req, res, next) => {
  try {
    const token = req.cookies?.token || req.headers?.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Unauthorized. Please login." });
    }
    const decoded = verifyToken(token);
    const user = await User.findById(decoded.userId).select("-password");
    if (!user) {
      return res.status(401).json({ message: "User not found." });
    }
    req.user = user;
    req.userId = user._id;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token." });
  }
};

export default isAuth;
