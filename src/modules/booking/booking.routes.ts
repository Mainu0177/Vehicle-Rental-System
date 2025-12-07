import express from 'express';
import { bookingControllers } from './booking.controller';
import auth from '../../middleware/auth';


const router = express.Router();

router.post("/", bookingControllers.createBooking);
router.get("/", auth("admin"), bookingControllers.getAllBooking);
router.put("/:id", auth("admin"), bookingControllers.updateBookingStatus)

export const bookingRoutes = router;