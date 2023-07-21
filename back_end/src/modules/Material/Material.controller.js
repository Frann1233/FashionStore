import express from "express";
import MaterialService from "./Material.service.js";

const router = express.Router();

//Create Material
router.post("/", (req, res) => MaterialService.create(req, res));

//Read Material
router.get("/", (req, res) => MaterialService.get(req, res));

//Read one Material
router.get("/:id", (req, res) => MaterialService.getOne(req, res));

//Update Material
router.patch("/:id", (req, res) => MaterialService.updateOne(req, res));

//Delete Material
router.delete("/", (req, res) => MaterialService.deleteOne(req, res));

export default router;