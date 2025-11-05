import express from "express";
import { isAuthenticated, isAuthorized } from "../middlewares/auth.js";
import { 
    postHackathon, 
    getHackathon, 
    postResearch, 
    getResearch, 
    getMyOpportunities 
} from "../controllers/opportunityController.js";

const router = express.Router();

// Faculty routes
router.post("/hackathonOpportunityPost", isAuthenticated, isAuthorized("Faculty"), postHackathon);
router.post("/researchOpportunityPost", isAuthenticated, isAuthorized("Faculty"), postResearch);
router.get("/hackathonOpportunityGet", isAuthenticated, isAuthorized("Faculty"), getHackathon);
router.get("/researchOpportunityGet", isAuthenticated, isAuthorized("Faculty"), getResearch);
router.get("/myOpportunities", isAuthenticated, isAuthorized("Faculty"), getMyOpportunities);

export default router;
