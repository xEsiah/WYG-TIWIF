import express from "express";
import * as destCtrl from "./destination.controller";
import { auth } from "../../middleware/auth";

const router = express.Router();

router.get("/last", auth, destCtrl.getLastDestination);

router.get("/", auth, destCtrl.getDestinations);
router.post("/", auth, destCtrl.createDestination);

router.get("/:id", auth, destCtrl.getOneDestination);
router.put("/:id", auth, destCtrl.updateDestination);
router.delete("/:id", auth, destCtrl.removeDestination);

export default router;
