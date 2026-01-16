const jwt = require("jsonwebtoken");
const User = require("../models/auth");
const RefreshToken = require("../models/refreshToken");
const { generateAccessToken, setAccessTokenCookie } = require("../utils/cookies");

const authMiddleware = async (req, res, next) => {
  try {
    let token = req.cookies.accessToken;

    // If no access token, try to refresh using refresh token
    if (!token) {
      const refreshToken = req.cookies.refreshToken;
      
      if (!refreshToken) {
        return res.status(401).json({ message: "No token provided" });
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
      
      req.user = user;
      return next();
    }

    // Verify access token
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      
      // Find user from DB
      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach user to request
      req.user = user;
      next();
    } catch (tokenError) {
      // Access token expired, try to refresh
      if (tokenError.name === 'TokenExpiredError') {
        const refreshToken = req.cookies.refreshToken;
        
        if (!refreshToken) {
          return res.status(401).json({ message: "Access token expired and no refresh token provided" });
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
        
        req.user = user;
        return next();
      }
      
      // Other token errors
      return res.status(401).json({ message: "Invalid token" });
    }
  } catch (error) {
    console.error("Error in authMiddleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

const eeditorMiddleware = async(req ,res ,next) => {
  try {
    const user = req.user;
        if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

   
    if (!user.isEditor) {
      return res.status(403).json({ message: "Access denied. Editors only." });
    }

    next()
  } catch (error) {
    console.error("Error in editormiddleware:", error);
    res.status(500).json({ message: "Internal server error at new editor middleware" });
  }
}

const aadminMiddleware = async (req, res, next) => {
  try {
    // Make sure user is already authenticated
    const user = req.user;
    if (!user) {
      return res.status(401).json({ message: "Not authenticated" });
    }

    // Check if user is admin
    if (!user.isAdmin) {
      return res.status(403).json({ message: "Access denied. Admins only." });
    }

    // User is admin, proceed
    next();
  } catch (error) {
    console.error("Error in adminMiddleware:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  authMiddleware,
  eeditorMiddleware,
  aadminMiddleware
};


