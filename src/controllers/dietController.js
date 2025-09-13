import { DietPlan } from "../models/dietPlan.js";

// Create diet plan
const createDietPlan = async (req, res) => {
  try {
    const { memberId, planDetails, details } = req.body;

    if (!memberId || !planDetails || !details) {
      return res.status(400).json({
        success: false,
        message: "Member ID, Plan Details, and Details are required fields.",
      });
    }

    const newDietPlan = await DietPlan.create({
      memberId,
      planDetails,
      details,
      createdBy: req.user._id, // ✅ from logged-in admin (protect middleware)
    });

    res.status(201).json({
      success: true,
      message: "Diet plan created successfully",
      data: newDietPlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get all diet plans
const getAllDietPlans = async (req, res) => {
  try {
    const plans = await DietPlan.find()
      .populate("memberId", "userId age gender")
      .populate("createdBy", "name email");

    res.status(200).json({
      success: true,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Get diet plans by member
const getDietPlansByMember = async (req, res) => {
  try {
    const plans = await DietPlan.find({ memberId: req.params.memberId }).populate(
      "createdBy",
      "name email"
    );

    res.status(200).json({
      success: true,
      message: `Diet plans for member ${req.params.memberId}`,
      count: plans.length,
      data: plans,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// Delete diet plan
const deleteDietPlan = async (req, res) => {
  try {
    const plan = await DietPlan.findByIdAndDelete(req.params.id);

    if (!plan) {
      return res.status(404).json({
        success: false,
        message: "Diet plan not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Diet plan deleted successfully",
      data: plan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export { createDietPlan, getAllDietPlans, getDietPlansByMember, deleteDietPlan };
