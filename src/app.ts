import express, { Request, Response } from "express";
import initDB from "./config/db";
import { userRoutes } from "./modules/user/user.routes";
import { authRoutes } from "./modules/auth/auth.routes";
import { vehicleRoutes } from "./modules/vehicle/vehicle.routes";
import { bookingRoutes } from "./modules/booking/booking.routes";
import logger from "./middleware/logger";

const app = express();

app.use(express.json())

initDB();


app.use("/api/v1/users", userRoutes);

app.use("/api/v1/auth", userRoutes);

app.use("/api/v1/auth", authRoutes);

app.use("/api/v1/vehicles", vehicleRoutes);

app.use("/api/v1/bookings", bookingRoutes);

app.get('/', (req:Request, res:Response) => {
    res.send('Mainuddin Khan!')
})

export default app;
