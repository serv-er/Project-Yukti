import mongoose from "mongoose";

const hackathonSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  eligibilityCriteria: {
    type: String,
    required: true,
  },
  skillsRequired: {
    type: [String],
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: true,
  },
  prizes: {
    type: String,
    required: true,
  },
  /*registrationLink: {
    type: String,
    required: true,
  },*/
  visibility: {
    type: String,
    enum: ["department", "college", "global"],
    default: "global", 
  },
  organizer:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User"
  },
  tags: {
    type: [String], // Array of strings for tags
    required: false, // Tags are optional
  },

}, { timestamps: true });

export const Hackathon = mongoose.model('Hackathon', hackathonSchema);
