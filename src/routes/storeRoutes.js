import express from "express";
import { 
  createStoreItem,
  getAllStoreItems,
  getStoreItemById,
  updateStoreItem,
  deleteStoreItem
} from "../controllers/storeController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// All routes protected
router.post("/", protect, createStoreItem);       // Add new item
router.get("/", protect, getAllStoreItems);       // Get all items
router.get("/:id", protect, getStoreItemById);    // Get single item
router.put("/:id", protect, updateStoreItem);     // Update item
router.delete("/:id", protect, deleteStoreItem);  // Delete item

export default router;
