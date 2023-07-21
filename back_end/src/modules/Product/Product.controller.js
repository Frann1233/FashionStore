import express from "express";
import productService from "./Product.service.js";
import productMiddleware from "../../middleware/getMiddleware.js"

const router = express.Router();

//Create Product
router.post("/", (req, res) => productService.create(req, res));

//Read Product
router.get("/", productMiddleware);

//Read one Product
router.get("/:id", (req, res) => productService.getOne(req, res));

//Update Product
router.patch("/:id", (req, res) => productService.updateOne(req, res));

//Delete Product
router.delete("/", (req, res) => productService.deleteOne(req, res));

export default router;