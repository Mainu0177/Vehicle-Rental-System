
import { Request, Response } from "express"
import { bookingServices } from "./booking.service";
import { IUserToken } from "../../middleware/auth";

const createBooking = async (req: Request, res: Response) => {
    try {
        const result = await bookingServices.createBooking(req.body);
        res.status(201).json({
            success: true,
            message: "Booking created successfully",
            data: result
        })
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
};

const getAllBooking = async (req: Request & {user?:IUserToken}, res: Response) => {
    try {
        const { role, id } = req.user!;
        const bookings = await bookingServices.getAllBooking(role, id);

        if (role === "admin") {
            const formatted = bookings.map(b => ({
                id: b.id,
                customer_id: b.customer_id,
                vehicle_id: b.vehicle_id,
                rent_start_date: b.rent_start_date,
                rent_end_date: b.rent_end_date,
                total_price: b.total_price,
                status: b.status,
                customer: {
                    name: b.customer_name,
                    email: b.customer_email,
                },
                vehicle: {
                    vehicle_name: b.vehicle_name,
                    registration_number: b.registration_number
                }
            }));
            return res.status(201).json({
                success: true,
                message: "Bookings retrieved successfully",
                data: formatted
            });
        }

        const formattedCustomer = bookings.map(b => ({
            id: b.id,
            vehicle_id: b.vehicle_id,
            rent_start_date: b.rent_start_date,
            rent_end_date: b.rent_end_date,
            total_price: b.total_price,
            status: b.status,
            vehicle: {
                vehicle_name: b.vehicle_name,
                registration_number: b.registration_number,
                type: b.type,
            }
        }))
        return res.status(201).json({
                success: true,
                message: "Your bookings retrieved successfully",
                data: formattedCustomer
            });
    } catch (error: any) {
        res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

const updateBookingStatus = async (req: Request & {user?: any}, res: Response) => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        if (!["cancelled", "returned"].includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status. Allowed: cancelled, returned"
            });
        }

        const result = await bookingServices.updateBookingStatus(id as string, status, req.user!.role);

        return res.status(200).json({
            success: true,
            message: status === "cancelled" ? "Booking cancelled successfully" : "Booking marked as returned. vehicle is now available",
            data: result
        })
    } catch (error:any) {
        
    }
}

export const bookingControllers = {
    createBooking,
    getAllBooking,
    updateBookingStatus
}