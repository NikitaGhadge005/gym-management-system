import mongoose, { Schema } from "mongoose";

const dietPlanSchema = new Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member",   // ✅ Ensure you have Member model defined
      required: true,
    },

    planDetails: {
      type: String,
      required: true,
      trim: true,       // ✅ optional: removes extra spaces
    },

    details: {
      type: String,
      required: true,
      trim: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",     // ✅ Ensure you have User model defined
      required: true,
    },
  },
  { timestamps: true }
);

export const DietPlan = mongoose.model("DietPlan", dietPlanSchema);
