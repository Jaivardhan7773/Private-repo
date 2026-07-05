const jwt = require("jsonwebtoken");
const crypto = require("crypto");

// Generate access token (short-lived)
const generateAccessToken = (userId) => {
    return jwt.sign({ userId }, process.env.JWT_SECRET, {
        expiresIn: process.env.ACCESS_TOKEN_EXPIRY || "15m"
    });
};

// Generate refresh token (long-lived, random string)
const generateRefreshToken = () => {
    return crypto.randomBytes(64).toString('hex');
};

// Set access token in cookie
const setAccessTokenCookie = (res, token) => {
    const maxAge = 15 * 60 * 1000; // 15 minutes
    res.cookie("accessToken", token, {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development"
    });
};

// Set refresh token in cookie
const setRefreshTokenCookie = (res, token) => {
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    res.cookie("refreshToken", token, {
        maxAge: maxAge,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development"
    });
};

// Clear both tokens
const clearTokens = (res) => {
    res.cookie("accessToken", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development"
    });
    res.cookie("refreshToken", "", {
        maxAge: 0,
        httpOnly: true,
        sameSite: process.env.NODE_ENV === "development" ? "lax" : "none",
        secure: process.env.NODE_ENV !== "development"
    });
};

// Generate and set both tokens
const generateTokens = async (userId, res, RefreshToken) => {
    const accessToken = generateAccessToken(userId);
    const refreshToken = generateRefreshToken();
    
    // Calculate expiry (7 days from now)
    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    
    // Store refresh token in database
    await RefreshToken.findOneAndUpdate(
        { userId },
        {
            userId,
            token: refreshToken,
            expiresAt
        },
        { upsert: true, new: true }
    );
    
    // Set cookies
    setAccessTokenCookie(res, accessToken);
    setRefreshTokenCookie(res, refreshToken);
    
    return { accessToken, refreshToken };
};

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    setAccessTokenCookie,
    setRefreshTokenCookie,
    clearTokens,
    generateTokens
};