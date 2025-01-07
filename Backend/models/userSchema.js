import mongoose from "mongoose";
import validator from "validator";

// Define an array of valid college domains
const validCollegeDomains = ['kiet.edu', 'iitk.ac.in', 'school.edu']; // Add more domains as needed

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  emailDomain: {
    type: String,
  },
  role: {
    type: String,
    required: true,
    enum: ["Student", "Faculty", "Employer"],
  },
  password: {
    type: String,
    required: true,
    minlength: [8, "Password must be at least 8 characters long"],
  },
  college: {
    type: String,
  },
  companyName: {
    type: String,
  },
  isStudentEmployer: {
    type: Boolean,
    default: false,
  },
}, {
  timestamps: true,
});

// Pre-save hook to extract email domain and validate
userSchema.pre('save', function(next) {
    if(this.role==="Student" || this.role==="Faculty"){
        if (this.isModified('email') || this.isNew) {
            const emailDomain = this.email.split('@')[1]; // Extract domain from email
        
            // Check if the domain is in the list of valid college domains
            if (!validCollegeDomains.includes(emailDomain)) {
              return next(new Error('Invalid college domain'));
            }
        
            // If valid, set the emailDomain field
            this.emailDomain = emailDomain;
          }
    }
 
  next();
});

export const User = mongoose.model("User", userSchema);
