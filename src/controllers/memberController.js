import { Member } from "../models/member.js";
// Create member
const addMember = async (req, res) => {
  try {
    const{userId, age, gender, contact, address, name}= req.body;

    const member = await Member.create({
      userId,
      name,
      age,
      gender,
      contact,
      address,
    });

    res.status(201).json({
      success: true,
      message: "Member added successfully",
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,  
        message: "Server Error",
        error: error.message,    
    });
  }
}

//Get all users

const getMembers = async (req, res) => {
  try {
    const members = await Member.find().populate('name', 'name email'); // Populate user details
     res.status(200).json({
      success: true,
      count: members.length,
      data: members,
     });
  } catch (error) {
    res.status(500).json({
      success: false,   
        message: "Server Error",
        error: error.message,
    });
  } 
}

// Get single member by ID

const getMemberById = async (req, res) => {
  try {
    const member = await Member.findById(req.params.id).populate('name', 'name email'); // Populate user details
    if (!member) {
      return res.status(404).json({
        success: false, 
        message: "Member not found",
      });
    }   
    res.status(200).json({
      success: true,
      data: member,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
        message: "Server Error",
        error: error.message,
    });
  }
}
//update member bye ID

const updateMember = async (req,res)=>{
    try {
        const member = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if(!member){
            return res.status(404).json({
                success:false,
                message:"Member not found",
            });    
        }
        res.status(200).json({
            success:true,
            message:"Member updated successfully",
            data:member,    
        })
    } catch (error) {

        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message,    
        })
        
    }
}

//  Delete member by ID

const deleteMember = async (req,res)=>{
    try {
        
        const member = await Member.findByIdAndDelete(req.params.id);
        if(!member){
            return res.status(404).json({   
                success:false,
                message:"Member not found",    
            });    
        }   
        res.status(200).json({
            success:true,
            message:"Member deleted successfully",    
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:"Server Error",
            error:error.message,
        })
    }
}

export {addMember, getMembers, getMemberById, updateMember, deleteMember};