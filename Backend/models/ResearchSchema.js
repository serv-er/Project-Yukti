import mongoose from "mongoose";

const researchSchema = new mongoose.Schema({
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    facultyName: {
      type: String,
      required: true,
    },
    qualifications: {
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
    benefits: {
      type: String,
    },
    visibility: {
      type: String,
      enum: ["department", "college", "global"],
      default: "global", 
    },
   organizer:{
       type:mongoose.Schema.Types.ObjectId,
       ref:"User"
     },
  }, { timestamps: true });
  
export const Research= mongoose.model('Research', researchSchema);
  