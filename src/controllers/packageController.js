
import {Package} from "../models/Package.js";

//create package

const addPackage = async (req, res) => {
    try {

        const { name, duration, price } = req.body;
        const newPackage = await Package.create({
            name,
            duration,   
            price
        });
        res.status(201).json({  
            success: true,
            message: "Package created successfully",
            data: newPackage
        });
        
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

// get all packeges

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.find();
        res.status(200).json({
            success: true,
            count: packages.length,
            data: packages
        });
    } catch (error) {

        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
        
    }
}

// get Single package by ID

const getPackageById = async (req, res) => {
    try {
        const gymPackage = await Package.findById(req.params.id);
        if (!gymPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }
        res.status(200).json({
            success: true,
            data: gymPackage,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

// update package by ID

const updatePackage  = async (req, res) => {
    try {
        const gymPackage = await Package.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!gymPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });
        }
        res.status(200).json({
            success: true,
            message: "Package updated successfully",
            data: gymPackage,
        });
    } catch (error) {
        res.status(500).json({  
            success: false,
            message: "Server Error",
            error: error.message,
        });
    }
}

// Delete package

const deletePackage = async (req, res) => {
    try {
        const gymPackage = await Package.findByIdAndDelete(req.params.id);
        if (!gymPackage) {
            return res.status(404).json({
                success: false,
                message: "Package not found",
            });

        }
        res.status(200).json({
            success: true,
            message: "Package deleted successfully",
        }); 
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Server Error",
            error: error.message,
        }); 
    }
}

export { addPackage, getAllPackages, getPackageById, updatePackage, deletePackage };

