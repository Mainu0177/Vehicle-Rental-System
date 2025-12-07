import express from "express";
import { userControllers } from "./user.controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post("/signup", userControllers.createUser);
router.get("/", auth("admin"), userControllers.getAllUsers);
router.get("/:id", auth("admin", "user"), userControllers.getSingleUser);
router.put("/:id", auth("admin", "user"), userControllers.updateUser);
router.delete("/:id", auth("admin"), userControllers.deleteUser);

export const userRoutes = router