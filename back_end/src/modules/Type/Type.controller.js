import express from "express";
import TypeService from "./Type.service.js";

const router = express.Router();

//Create Type
router.post("/", (req, res) => TypeService.create(req, res));

//Read Type
router.get("/", (req, res) => TypeService.get(req, res));

//Read one Type
router.get("/:id", (req, res) => TypeService.getOne(req, res));

//Update Type
router.patch("/:id", (req, res) => TypeService.updateOne(req, res));

//Delete Type
router.delete("/", (req, res) => TypeService.deleteOne(req, res));

export default router;
