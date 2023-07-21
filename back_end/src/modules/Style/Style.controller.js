import express from "express";
import StyleService from "./Style.service.js";

const router = express.Router();

//Create Style
router.post("/", (req, res) => StyleService.create(req, res));

//Read Style
router.get("/", (req, res) => StyleService.get(req, res));

//Read one Style
router.get("/:id", (req, res) => StyleService.getOne(req, res));

//Update Style
router.patch("/:id", (req, res) => StyleService.updateOne(req, res));

//Delete Style
router.delete("/", (req, res) => StyleService.deleteOne(req, res));

export default router;