import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../middlewares/error.js";


export const register = catchAsyncErrors(async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password || !role) {
      return next(new ErrorHandler("All fields are required", 400));
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
    });

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user,
    });
  } catch (error) {
    next(error);
  }
});
export const login =catchAsyncErrors(async (req,res,next)=>{
    const {email,password}=req.body
    console.log(email,password);
    if(!email || !password){
        return next(new ErrorHandler("Please enter all fields",400));

    }
    const user=await User.findOne({email});
    console.log(user);
    if(!user){
        return next(new ErrorHandler("User does not exist",400));
    }
    const isPasswordMatch= (user.password===password);
    if(!isPasswordMatch){
        return next(new ErrorHandler("password is not matching",400))
    }
    res.status(201).json({
        success: true,
        message: "User login successfully",
        user,
      });

})