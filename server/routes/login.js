const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { authMiddleware } = require('../middleware/useAuthStore');


// router.post('/send-forgot-otp', async (req, res) => {
//   try {
//     const { email } = req.body;
//     if (!email) return res.status(400).json({ message: "Email is required" });

//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "No account found with this email" });
// const generaterandom = () => {
//   return crypto.randomInt(1000, 10000).toString();
// };
//     const otp = generaterandom();
//     console.log(`🔐 Forgot Password OTP for ${email}: ${otp}`);

//     const mailOptions = {
//       from: `"AizenX Blogs" <${process.env.USER_EMAIL}>`,
//       to: email,
//       subject: "🔐 Reset Your Password - AizenX OTP",
//       html: `
//         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 450px; margin: auto;">
//           <h2 style="color: #dc3545; text-align: center;">Reset Your Password</h2>
//           <p style="font-size: 16px;">Hi there,</p>
//           <p style="font-size: 16px;">We received a request to reset your AizenX password. Use the OTP below to proceed:</p>
//           <div style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px; background: #f8f9fa; border-radius: 5px; margin: 10px 0;">
//             ${otp}
//           </div>
//           <p style="font-size: 16px;">This code is valid for <strong>10 minutes</strong>. Do not share this OTP with anyone.</p>
//           <p>If you didn’t request a password reset, ignore this email and your password will remain unchanged.</p>
//           <hr style="margin: 20px 0;">
//           <div style="text-align: center;">
//             <a href="https://www.instagram.com/jaivardhan7773_/#" target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/2111/2111463.png" style="height: 25px; margin: 0 5px;" /></a>
//             <a href="https://x.com/Jay_Vardhan7773" target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/5969/5969020.png" style="height: 30px; margin: 0 5px;" /></a>
//             <a href="https://www.linkedin.com/in/jaivardhan-singh-rathore-9a0149334" target="_blank"><img src="https://cdn-icons-png.flaticon.com/128/145/145807.png" style="height: 30px; margin: 0 5px;" /></a>
//           </div>
//           <p style="text-align: center; font-size: 14px; color: #888;">© 2025 AizenX Blogs. All rights reserved.</p>
//         </div>
//       `
//     };

//     await OTP.findOneAndUpdate(
//       { email },
//       { email, otp, expiresAt: Date.now() + 10 * 60 * 1000 },
//       { upsert: true, new: true }
//     );

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "OTP sent to email for password reset" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });






// Auth routes
router.post("/login", authController.login);
router.post("/refresh-token", authController.refreshToken);
router.post("/logout", authController.logout);
router.get("/check", authMiddleware, authController.checkAuth);
router.put("/updateUser/:id", authMiddleware, authController.updateUser);

// Admin check route
router.get("/admin/check", authMiddleware, async (req, res) => {
  try {
    res.status(200).json({ message: "Welcome Admin san" });
  } catch (error) {
    console.log("Error in admin check router");
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;