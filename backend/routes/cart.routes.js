import { Router } from "express";
import { body, param } from "express-validator";
import * as cartController from "../controllers/cart.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Get current user's cart
router.get("/", authMiddleware.authUser, cartController.getCartController);

// Add product to cart
router.post(
  "/add",
  authMiddleware.authUser,
  body("product").isMongoId().withMessage("Invalid product ID"),
  body("shop").isMongoId().withMessage("Invalid shop ID"),
  body("quantity").optional().isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  cartController.addToCartController
);

// Update quantity of a cart item
router.put(
  "/update/:productId",
  authMiddleware.authUser,
  param("productId").isMongoId().withMessage("Invalid product ID"),
  body("quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  cartController.updateCartItemController
);


// Remove product from cart
router.delete(
  "/remove/:productId",
  authMiddleware.authUser,
  param("productId").isMongoId().withMessage("Invalid product ID"),
  cartController.removeCartItemController
);

// Clear cart
router.delete("/clear", authMiddleware.authUser, cartController.clearCartController);

export default router;
