const User = require('../models/auth');
const RefreshToken = require('../models/refreshToken');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { generateTokens, clearTokens, setAccessTokenCookie, setRefreshTokenCookie } = require('../utils/cookies');
const OTP = require('../models/otpSchema');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const saltRounds = 8;

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER_EMAIL,
    pass: process.env.USER_PASS,
  },
});

const generaterandom = () => {
  return crypto.randomInt(1000, 10000).toString();
};

// Send OTP for signup
exports.sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "email is required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email or number already registered." });
    }

    let otp = generaterandom();
    console.log(`Sending OTP to: ${email}`);
    console.log(`Generated OTP: ${otp}`);
    
    const mailOptions = {
      from: `"AizenX Blogs" <${process.env.USER_EMAIL}>`,
      to: email,
      subject: "🔐 Your AizenX OTP Code - Secure Your Account",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 450px; margin: auto;">
          <h2 style="color: #007bff; text-align: center;">AizenX Verification Code</h2>
          <p style="font-size: 16px;">Hello,</p>
          <p style="font-size: 16px;">
            Your one-time password (OTP) for AizenX registration/login is:
          </p>
          <div style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px; background: #f3f3f3; border-radius: 5px; margin: 10px 0;">
            ${otp}
          </div>
          <p style="font-size: 16px;">
            This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone for security reasons.
          </p>
          <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
          <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
          <div style="text-align: center; margin-top: 15px;">
            <a href="https://www.instagram.com/jaivardhan7773_/#"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/5968/5968764.png" alt="Facebook" style="margin: 0 5px; height: 25px; width: 25px;" /></a>
            <a  href="https://www.instagram.com/jaivardhan7773_/#"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" alt="Instagram" style="margin: 0 5px; height: 25px; width: 25px;" /></a>
            <a  href="https://x.com/Jay_Vardhan7773"  target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" alt="X" style="margin: 0 5px; height: 30px; width: 30px;" /></a>
            <a href="https://www.linkedin.com/in/jaivardhan-singh-rathore-9a0149334" target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" alt="LinkedIn" style="margin: 0 5px; height: 30px; width: 30px;" /></a>
          </div>
          <p style="text-align: center; font-size: 14px; color: #555; margin-top: 10px;">© 2025 AizenX Blogs. All rights reserved.</p>
        </div>
      `,
    };
    
    await OTP.findOneAndUpdate(
      { email },
      { email, otp, expiresAt: Date.now() + 10 * 60 * 1000 },
      { upsert: true, new: true }
    );
    
    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: "otp sent successfully" });
  } catch (error) {
    console.error("Send OTP Error:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

// Signup
exports.signup = async (req, res) => {
  try {
    const { name, email, password, phone, gender, otp } = req.body;
    const MAX_FAILED_ATTEMPTS = 5;
    const LOCK_TIME = 24 * 60 * 60 * 1000;

    if (!name || !email || !password || !phone || !gender) {
      return res.status(400).json({ message: "All fields are required." });
    }
    
    if (name.length < 6 || name.length > 10) {
      return res.status(400).json({ message: "Name must be between 6 and 10 characters long." });
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format." });
    }

    if (password.length < 6) {
      return res.status(400).json({ message: "Password must be at least 6 characters long." });
    }
    
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits." });
    }

    const existingUser = await User.findOne({
      $or: [{ email }, { phone }]
    });
    if (existingUser) {
      return res.status(400).json({ message: "Email or number already registered." });
    }

    let otpobj = await OTP.findOne({ email });
    if (!otpobj) {
      return res.status(400).json({ message: "OTP not found. Request a new one." });
    }

    if (otpobj.lockUntil && otpobj.lockUntil > Date.now()) {
      return res.status(429).json({ message: "Too many failed attempts. Try again after 24 hours." });
    }

    if (otpobj.otp !== otp) {
      otpobj.failedAttempts += 1;
      if (otpobj.failedAttempts >= MAX_FAILED_ATTEMPTS) {
        otpobj.lockUntil = new Date(Date.now() + LOCK_TIME);
      }
      await otpobj.save();
      return res.status(400).json({ message: "Incorrect OTP. Try again." });
    }
    
    await OTP.findOneAndDelete({ email });
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      phone,
      gender,
    });

    await newUser.save();
    
    // Generate tokens
    await generateTokens(newUser._id, res, RefreshToken);
    
    res.status(201).json({
      message: "User registered successfully.",
      _id: newUser._id
    });
  } catch (error) {
    console.error("Signup Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Login
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "User not found." });
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials." });
    }
    
    // Generate tokens
    await generateTokens(user._id, res, RefreshToken);
    
    res.status(200).json({
      message: "Login successful",
      _id: user._id
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Refresh token endpoint
exports.refreshToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    if (!refreshToken) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    // Find refresh token in database
    const tokenDoc = await RefreshToken.findOne({ token: refreshToken });
    if (!tokenDoc) {
      clearTokens(res);
      return res.status(401).json({ message: "Invalid refresh token" });
    }

    // Check if token is expired
    if (tokenDoc.expiresAt < new Date()) {
      await RefreshToken.deleteOne({ token: refreshToken });
      clearTokens(res);
      return res.status(401).json({ message: "Refresh token expired" });
    }

    // Verify user still exists
    const user = await User.findById(tokenDoc.userId);
    if (!user) {
      await RefreshToken.deleteOne({ token: refreshToken });
      clearTokens(res);
      return res.status(404).json({ message: "User not found" });
    }

    // Generate new access token
    const { generateAccessToken } = require('../utils/cookies');
    const newAccessToken = generateAccessToken(user._id);
    setAccessTokenCookie(res, newAccessToken);

    res.status(200).json({ message: "Token refreshed successfully" });
  } catch (error) {
    console.error("Refresh Token Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Logout
exports.logout = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;
    
    // Delete refresh token from database
    if (refreshToken) {
      await RefreshToken.deleteOne({ token: refreshToken });
    }
    
    // Clear cookies
    clearTokens(res);
    
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Logout Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Check auth status
exports.checkAuth = async (req, res) => {
  try {
    res.status(200).json(req.user);
  } catch (error) {
    console.error("Error in /check route:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update user profile
exports.updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, phone, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      id,
      { name, phone, gender },
      { new: true }
    ).select("-password");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Update User Error:", error);
    res.status(500).json({ message: "Failed to update user", error: error.message });
  }
};

