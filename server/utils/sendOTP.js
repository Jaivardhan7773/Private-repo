const express = require("express");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
require("dotenv").config();
const OTP = require("../models/otpSchema");

const app = express();
app.use(express.json());


const generaterandom = () => {
  return   crypto.randomInt(1000 , 10000).toString();
};
// console.log(generaterandom());


const transporter = nodemailer.createTransport({
    service : "gmail" ,
    auth :{
        user :  process.env.USER_EMAIL , 
        pass :  process.env.USER_PASS ,
    } ,
});




app.post('/send-otp' , async  (req ,res) => {
    // try {
      
    // const { email } = req.body ;
    // if(!email) {
    //      res.status(400).json({message : "email is required"});
    //      return
    // }
    // let otp = generaterandom()
    // console.log(`Sending OTP to: ${email}`);
    // console.log(`Generated OTP: ${otp}`);
    // const mailOptions = {
    //     from: `"AizenX Blogs" <${process.env.USER_EMAIL}>`, 
    //     to: email,
    //     subject: "🔐 Your AizenX OTP Code - Secure Your Account",
    //     html: `
    //         <div style="font-family: Arial, sans-serif; padding: 20px; border: 1px solid #ddd; border-radius: 8px; max-width: 450px; margin: auto;">
    //             <h2 style="color: #007bff; text-align: center;">AizenX Verification Code</h2>
    //             <p style="font-size: 16px;">Hello,</p>
    //             <p style="font-size: 16px;">
    //                 Your one-time password (OTP) for AizenX registration/login is:
    //             </p>
    //             <div style="text-align: center; font-size: 24px; font-weight: bold; padding: 10px; background: #f3f3f3; border-radius: 5px; margin: 10px 0;">
    //                 ${otp}
    //             </div>
    //             <p style="font-size: 16px;">
    //                 This OTP is valid for <strong>10 minutes</strong>. Please do not share it with anyone for security reasons.
    //             </p>
    //             <p style="font-size: 16px;">If you did not request this OTP, please ignore this email.</p>
    //             <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
    //             <p style="text-align: center; font-size: 14px; color: #555;">© 2025 AizenX Blogs. All rights reserved.</p>
    //         </div>
    //     `,
    // };
    // let otpp = await OTP.findOneAndUpdate({email} , {email , otp} , {upsert : true , new : true});
    // console.log(otpp);
    // // otpp.save()
    // await transporter.sendMail(mailOptions);
    // res.send({message : "otp sent successfully"});
    
    // } 
    // catch (error) {
    //    return res.status(500).send({message : "sever crashed"}) 
    // }


})



module.exports = app; 