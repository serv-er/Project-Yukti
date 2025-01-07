import express from "express"
import dotenv from "dotenv"
import userRouter from "./routes/UserRouter.js"
import { User } from "./models/userSchema.js";
import cors from "cors"
import cookieParser from "cookie-parser"
import { connection } from "./databaseConfig/connection.js"
import opportunityRouter from "./routes/opportunityRouter.js"

const app =express();
dotenv.config();
app.use(cors({
    origin:[process.env.FRONTEND_URL],
    methods:["GET","POST","DELETE","PUT"],
    credentials:true,

})
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use("/api/v1/user",userRouter)
app.use("/api/v1/opportunity",opportunityRouter)

connection();
User.deleteMany({ emailDomain: null })
.then(() => {
  console.log("Successfully cleaned up documents with null emailDomain");
})
.catch((err) => {
  console.error("Error during cleanup:", err);
});

export default app