import express from "express";
import SizeService from "./Size.service.js";

const router = express.Router();

//Create Size
router.post("/", (req, res) => SizeService.create(req, res));

//Read Size
router.get("/", (req, res) => SizeService.get(req, res));

//Read one Size
router.get("/:id", (req, res) => SizeService.getOne(req, res));

//Update Size
router.patch("/:id", (req, res) => SizeService.updateOne(req, res));

//Delete Size
router.delete("/", (req, res) => SizeService.deleteOne(req, res));

export default router;