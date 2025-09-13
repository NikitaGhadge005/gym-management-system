import express from "express";
import { 
  createNotification,
  getAllNotifications,
  getNotificationsByMember,
  deleteNotification,
} from "../controllers/notificationController.js";   // ✅ ensure .js extension
import { protect } from "../middleware/authMiddleware.js";   // ✅ ensure .js extension

const router = express.Router();

// ✅ All routes protected
router.post("/", protect, createNotification);                      // Create notification
router.get("/", protect, getAllNotifications);                      // Get all notifications
router.get("/member/:memberId", protect, getNotificationsByMember); // Get notifications by member
router.delete("/:id", protect, deleteNotification);                 // Delete notification

export default router;
