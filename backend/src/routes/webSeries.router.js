import express from "express";
import { addWebSeries, getAllWebSeries, updateWebSeries, deleteWebSeries } from "../controllers/webSeries.controller.js";

const router = express.Router();

router.post("/add-webseries", addWebSeries); 
router.get("/get-webseries", getAllWebSeries);
router.put("/update-webseries/:id", updateWebSeries);
router.delete("/delete-webseries/:id", deleteWebSeries);

export default router;
