import express from 'express';
import { vehicleControllers } from './vehicle.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.post("/", auth("admin"), vehicleControllers.createVehicle);
router.get("/", vehicleControllers.getAllVehicle);
router.get("/:id", vehicleControllers.getSingleVehicle);
router.put("/:id", auth("admin", "customer"), vehicleControllers.updateVehicle)
router.delete("/:id", auth("admin"), vehicleControllers.deleteVehicle)


export const vehicleRoutes = router;