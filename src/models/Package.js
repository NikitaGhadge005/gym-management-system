import mongoose,{Schema} from "mongoose";

const packageSchema = new Schema({
    name:{
        type:String,
        required:true, 
    },
    duration:{
        type:String,
        required:true, 
    },
    price:{
        type:Number,
        required:true,  
    }
},
{timestamps:true});

export const Package = mongoose.model("Package",packageSchema);