import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Hackathon } from "../models/hackathonSchema.js";
import { Research } from "../models/ResearchSchema.js";
import ErrorHandler from "../middlewares/error.js";
import { sendToken } from "../utils/jwtToken.js";
import jwt from "jsonwebtoken"


export const postHackathon =catchAsyncErrors(async(req,res,next)=>{
   const {title,
    description,
    eligibilityCriteria,
    skillsRequired,
    startDate,
    endDate,
    prizes,
    visibility,
    tags,
    time}=req.body
   if(!title || !description  || !eligibilityCriteria || !skillsRequired || !startDate || !endDate || !prizes ){
    return next(new ErrorHandler("All fields are required",400))
   }

  const organizer=req.user._id
  const hackathonOpportunity =await Hackathon.create({
    title,
    description,
    eligibilityCriteria,
    skillsRequired,
    startDate,
    endDate,
    prizes,
    organizer,
    visibility,
    tags,
    time
  })

  res.status(201).json({
    success:true,
    hackathonOpportunity,
    message:"Hackathon  Posted Successfully",
  })
})

export const postResearch=catchAsyncErrors(async(req,res,next)=>{
  const {title,
   description,
   facultyName,
   qualifications,
   skillsRequired,
   startDate,
   endDate,
   benefits,
   visibility,
   }=req.body
  if(!title || !description  || !facultyName || !qualifications || !skillsRequired || !startDate || !endDate || !benefits){
   return next(new ErrorHandler("All fields are required",400))
  }

 const organizer=req.user._id
 const researchOpportunity =await Research.create({
  title,
  description,
  facultyName,
  qualifications,
  skillsRequired,
  startDate,
  endDate,
  benefits,
  visibility,
   organizer
 })

 res.status(201).json({
   success:true,
   researchOpportunity,
   message:"Research opportunity Posted Successfully",
 })
})
