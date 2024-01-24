const express = require('express');
const router = express.Router();
const User = require('../models/UserSchema');
const Lawyer = require('../models/LawyerSchema');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const { getToken } = require('../utils/helpers');
const MailSender = require('../utils/MailSender');
const app = express();
const OTP = require("../models/OTPSchema");
const otpGenerator = require("otp-generator");

//send otp
router.post("/generateOTP", async (req, res) => {
    try {
        const { email } = req.body;
        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            });
        }
        //generate otp

        var otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false,
        });
        // console.log("OTP generated: ", otp);

        //check unique otp or not

        let result = await OTP.findOne({ otp: otp });
        while (result) {
            otp = otpGenerator.generate(6, {
                upperCaseAlphabets: false,
                lowerCaseAlphabets: false,
                specialChars: false,
            });
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayLoad = { email, otp };

        //create an entry in db for otp
        const otpBody = await OTP.create(otpPayLoad);
        console.log(otpBody);

        //return response successfully
        res.status(200).json({
            success: true,
            message: "OTP send successfully",
            data: otpBody
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});

router.post("/verifyOTP", async (req, res) => {
    try {
        const { email, otp } = req.body;
        //find most recent otp for the user
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        // console.log(recentOtp[0].otp);

        //validate otp
        // If OTP is valid, send a success response
        res.status(200).json({
            success: true,
            message: "OTP verified successfully",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: err.message,
        });
    }
});

router.post('/register', async (req, res) => {
    // Extracting user details from the request body
    const { email, password, name, role, photo, gender } = req.body;
    // console.log(otp);
    try {
        // Check if user with the same email already exists
        const existingUser = role === 'user' ? await User.findOne({ email }) : await Lawyer.findOne({ email });

        if (existingUser) {
            return res.status(403).json({ error: "A user with this email already exists" });
        }

        // Hash the password using bcrypt
        const hashPass = await bcrypt.hash(password, 10);

        // Create a new user based on the role
        let user;
        if (role === 'user') {
            user = new User({ name, email, password: hashPass, gender, role, photo });
        } else if (role === 'lawyer') {
            user = new Lawyer({ name, email, password: hashPass, gender, role, photo });
        }
        // console.log(user);
        // Save the user to the database
        await user.save();

        // Prepare user data to return in the response
        const userToReturn = { ...user.toJSON() };
        // Remove the password from the response for security reasons
        delete userToReturn.password;

        res.status(200).json({ user: userToReturn, success: true });

    } catch (err) {
        console.error(err);
        res.status(500).json({ success: false, error: "Internal server error" });
    }
});

// Login endpoint
router.post('/login', [
    body('email').isEmail(),
    body('password').isLength({ min: 5 }).withMessage('should contain min 5 char'),
], async (req, res) => {

    const result = validationResult(req);

    if (!result.isEmpty()) {
        return res.status(400).json({ err: result.array() });
    }

    try {
        let email = req.body.email;
        let userData = null;
        const user = await User.findOne({ email });
        const lawyer = await Lawyer.findOne({ email });
        if (user) {
            userData = user;
        }
        else if (lawyer) {
            userData = lawyer;
        }

        if (!userData) {
            return res.status(400).json({ err: 'Email not found! Enter correct email' });
        }

        // Compare the provided password with the hashed password stored in the database
        const isValidPass = await bcrypt.compare(req.body.password, userData.password);

        // If the password is not valid, return a 403 status with an error message
        if (!isValidPass) {
            return res.status(400).json({ err: 'Enter valid Credentials' });
        }

        const jwtPayload = {
            id: userData._id,
            role: userData.role,
        };
        const token = await getToken(userData.email, jwtPayload);

        // Prepare user data to return in the response
        const userToReturn = { ...userData.toJSON() };
        // Remove the password from the response for security reasons
        delete userToReturn.password;
        return res.status(200).json({ data: userToReturn, token: token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: 'Internal server error' });
    }
});

module.exports = router;
