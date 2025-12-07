import { Request, Response } from "express"
import { vehicleServices } from "./vehicle.service"

const createVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.createVehicle(req.body)
        res.status(201).json({
            success: true,
            message: "Vehicle created successfully",
            data: result.rows[0]
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getAllVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getAllVehicle()

        if (!result || result.rows.length === 0) {
            return res.status(200).json({
                success: true,
                message: "No vehicles found",
                data: []
            })
        }
        
        res.status(200).json({
            success: true,
            message: "Vehicles retrieved successfully",
            data: result.rows
        })
        
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}
const getSingleVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.getSingleVehicle(req.params.id as string)
        
        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "vehicle not found",
                data: []
            });

        } else{
            res.status(200).json({
                success: true,
                message: "Vehicle retrieved successfully",
                data: result.rows[0]
            });
        }
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}

const updateVehicle = async (req: Request, res: Response) => {
    const { vehicle_name, type, registration_number, daily_rent_price, availability_status } = req.body;
    try {
        const result = await vehicleServices.updateVehicle(vehicle_name, type, registration_number, daily_rent_price, availability_status, req.params.id!)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: []
            });
        } else{
            res.status(200).json({
                success: true,
                message: "Vehicle updated successfully",
                data: result.rows[0]
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}
const deleteVehicle = async (req: Request, res: Response) => {
    try {
        const result = await vehicleServices.deleteVehicle(req.params.id!)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "Vehicle not found",
                data: []
            });
        } else{
            res.status(200).json({
                success: true,
                message: "Vehicle deleted successfully",
                data: result.rows[0],
            });
        }
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}


export const vehicleControllers = {
    createVehicle,
    getAllVehicle,
    getSingleVehicle,
    updateVehicle,
    deleteVehicle
}