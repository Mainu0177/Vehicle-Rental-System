import express from 'express';
import { vehicleControllers } from './vehicle.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post("/", auth(), vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getAllVehicle);
router.get("/:id", vehicleControllers.getSingleVehicle);
router.put("/:id", auth(), vehicleControllers.updateVehicle)
router.delete("/:id", auth(), vehicleControllers.deleteVehicle)


export const vehicleRoutes = router;