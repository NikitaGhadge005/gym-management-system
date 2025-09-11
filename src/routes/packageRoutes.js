import express from "express";
import { addPackage, getAllPackages, getPackageById, updatePackage, deletePackage } from "../controllers/packageController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.post("/", protect, addPackage);          // Create package
router.get("/", protect, getAllPackages);          // Get all packages
router.get("/:id", protect, getPackageById);    // Get single package
router.put("/:id", protect, updatePackage);     // Update package
router.delete("/:id", protect, deletePackage);  // Delete package

export default router;