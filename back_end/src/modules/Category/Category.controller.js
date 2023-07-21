import express from "express";
import CategoryService from "./Category.service.js"

const router = express.Router();

//Create Category
router.post("/", (req, res) => CategoryService.create(req, res));

//Read Category
router.get("/", (req, res) => CategoryService.get(req, res));

//Read one Category
router.get("/:id", (req, res) => CategoryService.getOne(req, res));

//Update Category
router.patch("/:id", (req, res) => CategoryService.updateOne(req, res));

//Delete Category
router.delete("/", (req, res) => CategoryService.deleteOne(req, res));

export default router;