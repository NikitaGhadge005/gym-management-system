import express from "express";
import { 
  createDietPlan, 
  getAllDietPlans, 
  getDietPlansByMember, 
  deleteDietPlan
} from "../controllers/dietController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.post("/", protect, createDietPlan);                  // Create diet plan
router.get("/", protect, getAllDietPlans);                  // Get all plans
router.get("/member/:memberId", protect, getDietPlansByMember); // Get plans by member
router.delete("/:id", protect, deleteDietPlan);             // Delete plan

export default router;
