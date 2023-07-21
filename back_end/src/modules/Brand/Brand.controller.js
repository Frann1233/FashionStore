import express from "express";
import BrandService from "./Brand.service.js"

const router = express.Router();

//Create Brand
router.post("/", (req, res) => BrandService.create(req, res));

//Read Brand
router.get("/", (req, res) => BrandService.get(req, res));

//Read one Brand
router.get("/:id", (req, res) => BrandService.getOne(req, res));

//Update Brand
router.patch("/:id", (req, res) => BrandService.updateOne(req, res));

//Delete Brand
router.delete("/", (req, res) => BrandService.deleteOne(req, res));

export default router;