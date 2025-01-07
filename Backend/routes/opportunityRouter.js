import express from "express"
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js"
import { postHackathon } from "../controllers/opportunityController.js" 
import { postResearch } from "../controllers/opportunityController.js"

const router=express.Router()

router.post("/hackathonOpportunityPost",isAuthenticated,isAuthorized("Faculty"),postHackathon)

router.post("/researchOpportunityPost",isAuthenticated,isAuthorized("Faculty"),postResearch)

export default router;