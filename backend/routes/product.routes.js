import { Router } from "express";
import { body, param, query } from "express-validator";
import * as productController from "../controllers/product.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// create a new product
router.post(
  "/",
  authMiddleware.authUser,
  body("shop").isMongoId().withMessage("shop must have a valid mongoId"),
  body("name").notEmpty().withMessage("Product name is required"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("stock").optional().isInt({ min: 0 }).withMessage("Stock must be >= 0"),
  productController.createProductController
);


// get all products (optionally filter by category, shop, search)
router.get("/", productController.getAllProductsController);

//  Optional: Search products by name or tags or description or category
router.get("/search",
     query("q").notEmpty().withMessage("Search query is required"),
      productController.searchProductsController
);


// get product by Id
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid product ID"),
  productController.getProductByIdController
);


// update product details
router.put(
  "/:id",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid product ID"),
  productController.updateProductController
);


// delete product
router.delete(
  "/:id",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid product ID"),
  productController.deleteProductController
);

//  Get all products of a specific shop
router.get(
  "/shop/:shopId",
  param("shopId").isMongoId().withMessage("Invalid shop ID"),
  productController.getProductsByShopController
);


// get product by category
router.get(
  "/category/:categoryName",
  productController.getProductsByCategoryController
);



export default router;
