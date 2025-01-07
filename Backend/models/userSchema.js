import mongoose from "mongoose";
import validator from "validator";
import jwt from "jsonwebtoken";

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
  profilePicture:{
     type:String,
      default:"https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
  }
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

userSchema.methods.getJWTToken=function(){
    return jwt.sign({id:this._id},process.env.JWT_SECRET_kEY,{
         expiresIn:process.env.JWT_EXPIRE
    })
}

export const User = mongoose.model("User", userSchema);
