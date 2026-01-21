import express from "express";
import destinationRoutes from "../endpoint/destination/destination.route";
import userRoutes from "../endpoint/user/user.route";

const router = express.Router();

router.use("/destinations", destinationRoutes);
router.use("/auth", userRoutes);

export default router;
