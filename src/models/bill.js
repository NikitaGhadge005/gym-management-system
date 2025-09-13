import mongoose, { Schema } from 'mongoose';

const billSchema = new Schema(
  {
    memberId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Member", // Link to Member model
      required: true,
    },

    packageId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Package", // Link to Package model
      required: true,
    },

    amount: {
      type: Number,
      required: true,
    },

    paymentDate: {
      type: Date,
      default: Date.now,
    },

    status: {
      type: String,
      enum: ["paid", "pending"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const Bill = mongoose.model("Bill", billSchema);
