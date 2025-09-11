import mongoose,{Schema} from "mongoose";

const memberSchema = new Schema({
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Link to User model
        required:true
    },
    age:{
        type:Number,
        required:true   
    },
    gender:{
        type:String,
        enum:["male", "female", "other"],
        required:true
    },
    contact:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true  
     },
     joinDate:{
        type:Date,
        default:Date.now    
     },
     status:{
        type:String,
        enum:["active", "inactive"],
        default:"active"    
     }
},
{timestamps:true});

export const Member = mongoose.model("Member",memberSchema);
