import express from "express";
import ColorService from "./Color.service.js";

const router = express.Router();

//Create Color
router.post("/", (req, res) => ColorService.create(req, res));

//Read Color
router.get("/", (req, res) => ColorService.get(req, res));

//Read one Color
router.get("/:id", (req, res) => ColorService.getOne(req, res));

//Update Color
router.patch("/:id", (req, res) => ColorService.updateOne(req, res));

//Delete Color
router.delete("/", (req, res) => ColorService.deleteOne(req, res));

export default router;