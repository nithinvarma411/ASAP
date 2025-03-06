import { addWebseries } from "../controllers/webSeries.controller.js";
import { Router } from "express";

const router = Router()

router.route("/add-webseries").post(addWebseries)

export default router