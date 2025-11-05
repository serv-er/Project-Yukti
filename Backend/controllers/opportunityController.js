import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Hackathon } from "../models/hackathonSchema.js";
import { Research } from "../models/ResearchSchema.js";
import ErrorHandler from "../middlewares/error.js";

// POST Hackathon
export const postHackathon = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    description,
    eligibilityCriteria,
    skillsRequired,
    startDate,
    endDate,
    prizes,
    visibility,
    tags,
    time,
  } = req.body;

  if (!title || !description || !eligibilityCriteria || !skillsRequired || !startDate || !endDate || !prizes) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const organizer = req.user._id;
  const hackathonOpportunity = await Hackathon.create({
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
    time,
  });

  res.status(201).json({
    success: true,
    hackathonOpportunity,
    message: "Hackathon Posted Successfully",
  });
});

// POST Research
export const postResearch = catchAsyncErrors(async (req, res, next) => {
  const {
    title,
    description,
    facultyName,
    qualifications,
    skillsRequired,
    startDate,
    endDate,
    benefits,
    visibility,
  } = req.body;

  if (!title || !description || !facultyName || !qualifications || !skillsRequired || !startDate || !endDate || !benefits) {
    return next(new ErrorHandler("All fields are required", 400));
  }

  const organizer = req.user._id;
  const researchOpportunity = await Research.create({
    title,
    description,
    facultyName,
    qualifications,
    skillsRequired,
    startDate,
    endDate,
    benefits,
    visibility,
    organizer,
  });

  res.status(201).json({
    success: true,
    researchOpportunity,
    message: "Research Opportunity Posted Successfully",
  });
});

// GET All Hackathons
export const getHackathon = catchAsyncErrors(async (req, res, next) => {
  const hackathonOpportunity = await Hackathon.find();
  res.status(200).json({
    success: true,
    hackathonOpportunity,
  });
});

// GET All Research
export const getResearch = catchAsyncErrors(async (req, res, next) => {
  const researchOpportunity = await Research.find();
  res.status(200).json({
    success: true,
    researchOpportunity,
  });
});

// GET My Posted Opportunities (Hackathons + Research)
export const getMyOpportunities = catchAsyncErrors(async (req, res, next) => {
  const organizerId = req.user._id;

  const myHackathons = await Hackathon.find({ organizer: organizerId });
  const myResearches = await Research.find({ organizer: organizerId });

  res.status(200).json({
    success: true,
    opportunities: {
      hackathons: myHackathons,
      researches: myResearches,
    },
  });
});
