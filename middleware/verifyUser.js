// middleware/verifyUser.js
import jwt from "jsonwebtoken";
import User from "../models/user.model.js";
import { errorHandaler } from "../utils/error.js";

export const verifyUser = async (req, res, next) => {
  try {
    // Get token from cookies
    const token = req.cookies.access_token;

    if (!token) {
      return next(errorHandaler(401, "Unauthorized - No token provided"));
    }

    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find user by ID from token
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      return next(errorHandaler(404, "User not found"));
    }

    // Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(errorHandaler(401, "Invalid token"));
    }
    if (error.name === "TokenExpiredError") {
      return next(errorHandaler(401, "Token expired"));
    }
    next(error);
  }
};
