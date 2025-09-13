import mongoose from "mongoose";

const { Schema } = mongoose;

const storeItemSchema = new Schema({
    name: {
        type: String,
        required: true, 
    },
    description: {
        type: String,
    },
    price: { 
        type: Number,
        required: true,
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    category: {
        type: String,
        enum: ["protein", "vitamins", "equipment", "other"],
        default: "other"
    }
}, { timestamps: true });

export const StoreItem = mongoose.model("StoreItem", storeItemSchema);
