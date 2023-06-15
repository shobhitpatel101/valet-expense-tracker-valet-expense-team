const express = require("express");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const authenticateToken = require("../MiddleWares/Authorization");
const router = express.Router();
const bcrypt = require("bcrypt");
const axios = require("axios")
dotenv.config();

//Import of models
const userSchema = require("../models/userSchema.js");

//Login API
router.post("/login", async (req, res) => {
  try {
    const Userdata = {
      email: req.body.email,
      //password: req.body.password
    };

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    await userSchema
      .findOne({ email: { $eq: req.body.email } })
      .then(async (data) => {
        if (data.length != 0) {
          const match = await bcrypt.compare(req.body.password, data.password);

          if (match) {
            let user = {
              time: Date(),
              email: req.body.email,
              userId: data["_id"],
            };
            const token = jwt.sign(user, jwtSecretKey, { expiresIn: "24h" });
            res.status(200).json({
              Status: true,
              "Bearer Token": token,
              Message: "User Successfully logged In !",
              "Users Details": data[0],
            });
          } else {
            res.status(200).json({
              Status: false,
              Message: "User Not registered / Incorrect Password!",
            });
          }
        } else {
          res.status(200).json({
            Status: false,
            Message: "User Not registered / Incorrect Password!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ Status: false, Error: err.Message });
      });
  } catch (err) {
    res.status(500).json({ Status: false, Error: err.Message });
  }
});

//SignUp API
router.post("/signup", async (req, res) => {
  try {
    const userSchemaData = new userSchema({
      //userId: req.body.userId,
      userName: req.body.userName,
      password: req.body.password,
      email: req.body.email,
      createTimeStamp: Date.now(),
    });

    let jwtSecretKey = process.env.JWT_SECRET_KEY;

    // Hash the password
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    userSchemaData.password = hashedPassword;

    await userSchema
      .findOne({ email: { $eq: req.body.email } })
      .then((data) => {
        //console.log(data)
        if (data == null) {
          userSchemaData.save().then((data) => {
            let user = {
              time: Date(),
              email: req.body.email,
              userId: data["_id"],
            };

            const token = jwt.sign(user, jwtSecretKey, { expiresIn: "1h" });

            res.status(200).json({
              Status: true,
              "Bearer Token": token,
              Message: "User Successfully logged In !",
              "Users Details": data,
            });
          });
        } else {
          res.status(200).json({
            Status: false,
            Message: "User already registered with the given email!",
          });
        }
      })
      .catch((err) => {
        res.status(500).json({ Status: false, Error: err.message });
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ Status: false, Error: err.message });
  }
});



router.get("/validateToken", authenticateToken, (req, res) => {
  try {
    return res.status(200).json({ Status: true, Message: "Token Verified" });
  } catch (err) {
    res.status(500).json({ Status: false, Message: "Invalid Token!" });
  }
});

// Generate a random OTP
function generateOTP() {
  const otp = Math.floor(100000 + Math.random() * 900000);
  return otp.toString();
}



// Forgot Password API endpoint
router.post("/forgot-password", async (req, res) => {
  const { email } = req.body;

  try {
    // Check if the user exists with the provided email
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({ Message: "User not found" });
    }
    const otp = generateOTP();
    user.passwordResetOTP = otp;
    await user.save();
    res.status(200).json({Status:true, Message: "OTP email sent successfully", data:otp });
  } catch (err) {
    res.status(500).json({Status:true, Message: "Failed to send OTP email" });
  }
});

// Verify OTP API endpoint
router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;
  try {
    // Find the user with the provided email
    const user = await userSchema.findOne({ email });
    if (!user) {
      return res.status(404).json({Status:false, Message: "User not found" });
    }

    // Compare the OTP with the stored OTP
    if (otp !== user.passwordResetOTP.toString()) {
      return res.status(400).json({Status:false, Message: "Invalid OTP" });
    }
    user.passwordResetOTP = "";
    await user.save()
    res.status(200).json({Status:true, Message: "Otp verified successfully" });
  } catch (err) {
    res.status(500).json({Status:false, Message: "Failed to verify otp" });
  }
});

module.exports = router;
