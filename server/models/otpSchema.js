const mongoose = require("mongoose");
const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    otp: {
        type: String,
        required: true
    },
    expiresAt:
    {
        type: Date,
        required: true,
        default: () => Date.now() + 10 * 60 * 1000
    },
    createdAt:
     {
         type: Date,
          default: Date.now 
        },
    failedAttempts:
    {
        type: Number,
        required: true,
        default: 0
    },
    lockUntil:
    {
        type: Date
    }
});
const OTP = mongoose.model("otp", otpSchema);
module.exports = OTP;