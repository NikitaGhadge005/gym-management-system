import mongoose, { Schema } from "mongoose";

const notificationSchema = new Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // make sure your Member model name matches
      required: true,
    },

    message: {
      type: String,
      required: true,
      trim: true,
    },

    type: {
      type: String,
      enum: ["info", "warning", "alert", "reminder"],
      default: "info",
    },

    // Optional: keep if you want custom notification date
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

export const Notification = mongoose.model("Notification", notificationSchema);
