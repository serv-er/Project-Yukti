import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";


export const register = catchAsyncErrors(async (req, res, next) => {
    try {
        const { name, email, password, role,companyName,college} = req.body;

        if (!name || !email || !password || !role) {
            return next(new ErrorHandler("All fields are required", 400));
        }
        if (role === "Student" && !college) {
            return next(new ErrorHandler("College is required for students", 400));
        }

        if (role === "Employer" && !companyName) {
            return next(new ErrorHandler("Company name is required for employers", 400));
        }
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(new ErrorHandler("User already exists", 400));
        }

        const user = await User.create({
            name,
            email,
            password,
            role,
            companyName: role === "Employer" ? companyName : undefined,
            college: role === "Student" ? college : undefined,
        });

        sendToken(user, 201, res, "User registered successfully");
    } catch (error) {
        next(error);
    }
});
export const login = catchAsyncErrors(async (req, res, next) => {
    const { email, password } = req.body
    console.log(email, password);
    if (!email || !password) {
        return next(new ErrorHandler("Please enter all fields", 400));

    }
    const user = await User.findOne({ email });
    console.log(user);
    if (!user) {
        return next(new ErrorHandler("User does not exist", 400));
    }
    const isPasswordMatch = (user.password === password);
    if (!isPasswordMatch) {
        return next(new ErrorHandler("password is not matching", 400))
    }
    sendToken(user, 200, res, "User login successfully");

})

export const logout = catchAsyncErrors(async (req, res, next) => {
    res.status(200).cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).json({
        success: true,
        message: "Logged out successfully"
    })
})

export const googleLogin = catchAsyncErrors(async (req, res, next) => {
    const { name, email, googlePhotoUrl } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_kEY);
            const { password, ...rest } = user._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest)
        }
        else{
           const generatedPassword=Math.round().toString(36).slice(-8)+Math.round().toString(36).slice(-8)
           const hashedPassword=await bcrypt.hash(generatedPassword,10);
           const newUser=await User.create({
            username:name.toLowerCase().split(" ").join("")+Math.round().toString(9).slice(-4),
            email,
            profilePicture:googlePhotoUrl,
            password:hashedPassword,
           })
           await newUser.save();
           const token = jwt.sign({ id: newUser._id }, 
            process.env.JWT_SECRET_kEY);
            const { password, ...rest } = newUser._doc;
            res.status(200).cookie("access_token", token, {
                httpOnly: true,
            }).json(rest)
        }
    }
    catch (error) {
    next(error);
    }
})