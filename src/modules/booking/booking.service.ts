import { pool } from "../../config/db";

const createBooking = async (payload: any) => {
    const { customer_id, vehicle_id, rent_start_date, rent_end_date } = payload;
    
    const vehicleResult = await pool.query(`SELECT vehicle_name, daily_rent_price, availability_status FROM vehicles WHERE id=$1`, [vehicle_id]);
    
    if (vehicleResult.rows.length === 0) {
        throw new Error("Vehicle not found");
    }
    
    const vehicle = vehicleResult.rows[0]
    
    if (vehicle.availability_status !== "available") {
        throw new Error("Vehicle is not available")
    }
    
    const startDate = new Date(rent_start_date);
    const endDate = new Date(rent_end_date);

    const cleanStart = startDate.toISOString().split("T")[0];
    const cleanEnd = endDate.toISOString().split("T")[0];

    const start = new Date(cleanStart as any).getTime();
    const end = new Date(cleanEnd as any).getTime();
    
    const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
    
    if (days <= 0) {
        throw new Error("Invalid rent dates")
    }
    const total_price = days * Number(vehicle.daily_rent_price);
    
    const bookingResult = await pool.query(`INSERT INTO bookings(customer_id, vehicle_id, rent_start_date, rent_end_date, total_price) VALUES($1, $2, $3, $4, $5) RETURNING*`, [customer_id, vehicle_id, rent_start_date, rent_end_date, total_price]);
    const booking = bookingResult.rows[0];

    await pool.query(`UPDATE vehicles SET availability_status='booked' WHERE id=$1`, [vehicle_id])

    return {
        ...booking,
        vehicle: {
            vehicle_name: vehicle.vehicle_name,
            daily_rent_price: vehicle.daily_rent_price,
        }
    }

}

const getAllBooking = async (role: string, userId?: number) => {

    let query = `
    SELECT
    b.id,
    b.customer_id,
    b.vehicle_id,
    TO_CHAR(b.rent_start_date, 'YYY-MM-DD') AS rent_start_date,
    TO_CHAR(b.rent_end_date, 'YYY-MM-DD') AS rent_end_date,
    b.total_price,
    b.status,

    c.name AS customer_name,
    c.email AS customer_email,

    v.vehicle_name,
    v.registration_number,
    v.type

    FROM bookings b
    JOIN users c ON c.id = b.customer_id
    JOIN vehicles v ON v.id = b.vehicle_id
    `;

    if (role === "user") {
        query += `WHERE b.customer_id = ${userId}`;
    }

    query += `ORDER BY b.id DESC`;

    const result = await pool.query(query);
    return result.rows;
}

const updateBookingStatus = async (bookingId: string, status: "cancelled" | "returned", userRole: string) => {
    if (status === "cancelled" && userRole !== "customer") {
        throw new Error("Only customer can cancel booking");
    }
    if (status === "returned" && userRole !== "admin") {
        throw new Error("Only admins can mark as returned");
    }

    const bookingResult = await pool.query(`SELECT * FROM bookings WHERE id=$1`, [bookingId]);

    if (bookingResult.rows.length === 0) {
        throw new Error("Booking no found");
    }

    const booking = bookingResult.rows[0];

    const updatedResult = await pool.query(`UPDATE bookings SET status=$1 WHERE id=$2 RETURNING*`, [status, bookingId]);

    const updated = updatedResult.rows[0];

    let vehicleUpdate = null;

    if (status === "returned") {
        vehicleUpdate = await pool.query(`UPDATE vehicles SET availability_status='available WHERE id=$1 RETURNING availability_status`, [booking.vehicle_id]);
        return {
            ...updated,
            vehicle: vehicleUpdate?.rows[0]
        };
    }
    return updated;

}

export const bookingServices = {
    createBooking,
    getAllBooking,
    updateBookingStatus
}