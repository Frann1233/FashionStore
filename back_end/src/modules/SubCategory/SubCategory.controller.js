import express from "express";
import SubCategoryService from "./SubCategory.service.js";

const router = express.Router();

//Create SubCategory
router.post("/", (req, res) => SubCategoryService.create(req, res));

//Read SubCategory
router.get("/", (req, res) => SubCategoryService.get(req, res));

//Read one SubCategory
router.get("/:id", (req, res) => SubCategoryService.getOne(req, res));

//Update SubCategory
router.patch("/:id", (req, res) => SubCategoryService.updateOne(req, res));

//Delete SubCategory
router.delete("/", (req, res) => SubCategoryService.deleteOne(req, res));

export default router;