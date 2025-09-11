import express from 'express';
import {addMember, getMembers, getMemberById, updateMember, deleteMember } from '../controllers/memberController.js';
import { protect } from '../middleware/authMiddleware.js';


const router = express.Router();


// All routes protected
router.post("/", protect, addMember);        // Add member
router.get("/", protect, getMembers);        // Get all members
router.get("/:id", protect, getMemberById);  // Get single member
router.put("/:id", protect, updateMember);   // Update member
router.delete("/:id", protect, deleteMember);// Delete member

export default router;