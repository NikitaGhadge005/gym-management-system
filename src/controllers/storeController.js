import { StoreItem } from "../models/storeItem.js";

// Create store item
const createStoreItem = async (req, res) => {
  try {
    const { name, description, price, stock } = req.body;

    if (!name || !price || stock == null) {
      return res.status(400).json({
        success: false,
        message: "Name, Price, and Stock are required fields."
      });
    }

    const newItem = await StoreItem.create({
      name,
      description,
      price,
      stock
    });

    res.status(201).json({
      success: true,
      message: "Store item created successfully",
      data: newItem
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get all store items
const getAllStoreItems = async (req, res) => {
  try {
    const items = await StoreItem.find();
    res.status(200).json({
      success: true,
      count: items.length,
      data: items
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Get single item
const getStoreItemById = async (req, res) => {
  try {
    const item = await StoreItem.findById(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Store item not found"
      });
    }
    res.status(200).json({
      success: true,
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Update store item
const updateStoreItem = async (req, res) => {
  try {
    const updates = req.body;
    const item = await StoreItem.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Store item not found"
      });
    }

    res.status(200).json({
      success: true,
      message: "Store item updated successfully",
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

// Delete store item
const deleteStoreItem = async (req, res) => {
  try {
    const item = await StoreItem.findByIdAndDelete(req.params.id);
    if (!item) {
      return res.status(404).json({
        success: false,
        message: "Store item not found"
      });
    }
    res.status(200).json({
      success: true,
      message: "Store item deleted successfully",
      data: item
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message
    });
  }
};

export {
  createStoreItem,
  getAllStoreItems,
  getStoreItemById,
  updateStoreItem,
  deleteStoreItem
};
