import express from "express";
import protectRoute from "../Middleware/protectRoute.js";
import { getUsersForSideBar } from "../Controllers/user.controller.js";

const router = express.Router()

router.get("/",protectRoute,getUsersForSideBar)

export default router