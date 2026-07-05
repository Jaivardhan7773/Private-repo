const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const RefreshToken = require("../models/refreshToken");
const { generateAccessToken, setAccessTokenCookie } = require("../utils/cookies");

const userAuthMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    // If no access token, try to refresh using refresh token
    if (!token) {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
      }

      // Find refresh token in database
      const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
      if (!tokenDoc || tokenDoc.expiresAt < new Date()) {
        return res.status(401).json({ message: "Invalid or expired refresh token" });
      }

      // Verify user still exists
      const user = await User.findById(tokenDoc.userId).select("-password");
      if (!user) {
        await RefreshToken.deleteOne({ token: refreshToken });
        return res.status(404).json({ message: "User not found" });
      }

      // Generate new access token
      const newAccessToken = generateAccessToken(user._id);
      setAccessTokenCookie(res, newAccessToken);
      
      token = newAccessToken;
      req.user = user;
    } else {
      // Verify access token
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId).select("-password");
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        req.user = user;
      } catch (tokenError) {
        // Access token expired, try to refresh
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

    // Check if user can only edit their own profile
    if (req.user._id.toString() !== req.params.id) {
      return res.status(403).json({ message: "Access Denied: You can only edit your own profile" });
    }

    next(); 
  } catch (error) {
    console.error("Error in userAuthMiddleware:", error);
    res.status(401).json({ message: "Invalid or expired token" });
  }
};

module.exports = userAuthMiddleware;