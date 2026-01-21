import express from "express";
import * as userCtrl from "./user.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.post("/register", userCtrl.signup);
router.post("/login", userCtrl.login);

router.get("/profile", auth, userCtrl.getProfile);
router.put("/profile/avatar", auth, userCtrl.updateAvatar);

router.post("/subscriptions", auth, userCtrl.addSubscription);
router.delete("/subscriptions/:id", auth, userCtrl.removeSubscription);

export default router;
