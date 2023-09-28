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
router.delete("/:id", (req, res) => productService.deleteOne(req, res));

//Get Products in subCategory
// router.get("/category/:categoryId/subCategory/:subCategoryId", (req, res) => productService.getManyByCategorySubCategory(req, res));

router.get("/subCategory/:subCategoryId", (req, res) => productService.getProductsBySubCategory(req, res));

// router.get("/browse/:sex/:category/:categoryId/:subCategoryId", (req, res) => productService.getProductsBySubCategory(req, res));

router.get("/sizes/:categoryId/:subCategoryId", (req, res) => productService.getProductSizes(req, res));

router.get("/colors/:categoryId/:subCategoryId", (req, res) => productService.getImageColorNames(req, res));



export default router;