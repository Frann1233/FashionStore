import express from "express";
import SeasonService from "./Season.service.js";

const router = express.Router();

//Create Season
router.post("/", (req, res) => SeasonService.create(req, res));

//Read Season
router.get("/", (req, res) => SeasonService.get(req, res));

//Read one Season
router.get("/:id", (req, res) => SeasonService.getOne(req, res));

//Update Season
router.patch("/:id", (req, res) => SeasonService.updateOne(req, res));

//Delete Season
router.delete("/", (req, res) => SeasonService.deleteOne(req, res));

export default router;