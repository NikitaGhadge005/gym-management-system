import { Bill } from "../models/bill.js";

// Create a new bill
const createBill = async (req, res) => {
  try {
    const { memberId, packageId, amount, paymentDate, status } = req.body;

    if (!memberId || !packageId || !amount) {
      return res.status(400).json({ message: "Member ID, Package ID, and Amount are required." });
    }

    const newBill = new Bill({ memberId, packageId, amount, paymentDate, status });
    await newBill.save();

    res.status(201).json(newBill);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all bills
const getAllBills = async (req, res) => {
  try {
    const bills = await Bill.find()
      .populate("memberId", "userId age gender contact")
      .populate("packageId", "name duration price");

    res.status(200).json({
      success: true,
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get bills for a specific member
const getBillsByMember = async (req, res) => {
  try {
    const bills = await Bill.find({ memberId: req.params.memberId })
      .populate("packageId", "name duration price");

    res.status(200).json({
      success: true,
      message: `Bills for member ${req.params.memberId}`,
      count: bills.length,
      data: bills,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Update bill status
const updateBillStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bill = await Bill.findByIdAndUpdate(req.params.id, { status }, { new: true });

    if (!bill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bill status updated successfully",
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// Delete bill by ID
const deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findByIdAndDelete(req.params.id);

    if (!bill) {
      return res.status(404).json({ success: false, message: "Bill not found" });
    }

    res.status(200).json({
      success: true,
      message: "Bill deleted successfully",
      data: bill,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export { createBill, getAllBills, getBillsByMember, updateBillStatus, deleteBill };
