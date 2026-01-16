const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const RefreshToken = require("../models/refreshToken");
const { generateAccessToken, setAccessTokenCookie } = require("../utils/cookies");

const adminMiddleware = async (req, res, next) => {
  try {
    // First check if user is already authenticated by authMiddleware
    if (req.user) {
      // User is already authenticated, just check if admin
      if (!req.user.isAdmin) {
        return res.status(403).json({ message: "Access Denied: Admins only" });
      }
      return next();
    }

    // If not authenticated, try to authenticate
    let token = req.cookies.accessToken;

    if (!token) {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
      if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
        return res.status(401).json({ message: "Invalid or expired refresh token" });
      }

      const user = await User.findById(tokenDoc.userId).select("-password");
      if (!user) {
        await RefreshToken.deleteOne({ token: refreshToken });
        return res.status(404).json({ message: "User not found" });
      }

      const newAccessToken = generateAccessToken(user._id);
      setAccessTokenCookie(res, newAccessToken);
      
      req.user = user;
    } else {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
      } catch (tokenError) {
        if (tokenError.name === 'TokenExpiredError') {
          const refreshToken = req.cookies.refreshToken;
          
          if (!refreshToken) {
            return res.status(401).json({ message: "Access token expired and no refresh token provided" });
          }

          const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
          if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
            return res.status(401).json({ message: "Invalid or expired refresh token" });
          }

          const user = await User.findById(tokenDoc.userId).select("-password");
          if (!user) {
            await RefreshToken.deleteOne({ token: refreshToken });
            return res.status(404).json({ message: "User not found" });
          }

          const newAccessToken = generateAccessToken(user._id);
          setAccessTokenCookie(res, newAccessToken);
          
          req.user = user;
        } else {
          return res.status(401).json({ message: "Invalid token" });
        }
      }
    }

    // Check if user is admin
    if (!req.user.isAdmin) {
      return res.status(403).json({ message: "Access Denied: Admins only" });
    }

    next(); 
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = adminMiddleware;
