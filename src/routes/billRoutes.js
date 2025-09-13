import express from 'express';
import {  
  createBill, 
  getAllBills, 
  getBillsByMember, 
  updateBillStatus, 
  deleteBill 
} from '../controllers/billController.js';
import { protect } from '../middleware/authMiddleware.js'; 

const router = express.Router();

// All routes protected
router.post("/", protect, createBill);                   // Create new bill
router.get("/", protect, getAllBills);                   // Get all bills
router.get("/member/:memberId", protect, getBillsByMember); // Get bills by specific member
router.put("/:id", protect, updateBillStatus);           // Update bill
router.delete("/:id", protect, deleteBill);              // Delete bill

export default router;
