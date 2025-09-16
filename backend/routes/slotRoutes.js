import express from "express";
import { createSlot, getSlots, updateSlot, deleteSlot } from "../controllers/slotController.js";

const router = express.Router();

router.get("/", getSlots);
router.post("/", createSlot);
router.put("/:id", updateSlot);
router.delete("/:id", deleteSlot);

export default router;
