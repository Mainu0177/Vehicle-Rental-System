import { Request, Response } from "express"
import { userServices } from "./user.service"


const createUser = async(req: Request, res: Response) => {
    try {
        const result = await userServices.createUser(req.body)
        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result.rows[0]
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const getAllUsers = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getAllUsers()

        res.status(200).json({
            success: true,
            message: "User retrieved successfully",
            data: result
        })
    } catch (error:any) {
        res.status(500).json({
            success: false,
            message: error.message,
            details: error
        })
    }
}
const getSingleUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.getSingleUser(req.params.id as string)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: []
            });
        } else{
            res.status(200).json({
                success: true,
                message: "Find the single user successfully",
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

const updateUser = async (req: Request, res: Response) => {
    const { name, email, phone, role } = req.body;
    try {
        const result = await userServices.updateUser(name, email, phone, role, req.params.id!)

        if (result.rows.length === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: []
            });
        } else{
            res.status(200).json({
                success: true,
                message: "User update successfully",
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
const deleteUser = async (req: Request, res: Response) => {
    try {
        const result = await userServices.deleteUser(req.params.id!)
        if (result.rowCount === 0) {
            res.status(404).json({
                success: false,
                message: "User not found",
                data: []
            });
        } else{
            res.status(200).json({
                success: true,
                message: "User deleted successfully",
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

export const userControllers = {
    createUser,
    getAllUsers,
    getSingleUser,
    updateUser,
    deleteUser
}