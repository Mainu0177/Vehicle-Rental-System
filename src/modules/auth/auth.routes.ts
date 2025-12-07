import express from "express";
import { authControllers } from "./auth.controller";

const router = express.Router()

router.post("/signin", authControllers.userLogin);


export const authRoutes = router;