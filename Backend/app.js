import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";

import userRouter from "./routes/UserRouter.js";
import opportunityRouter from "./routes/opportunityRouter.js";
import { User } from "./models/userSchema.js";
import { connection } from "./databaseConfig/connection.js";
const app =express();
dotenv.config();
app.use(cors({
    origin:true,
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


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const buildPath = path.join(__dirname, "../client/build");

app.use(express.static(buildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(buildPath, "index.html"));
});


export default app