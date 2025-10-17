import { Router } from "express";
import { body, param } from "express-validator";
import * as cartController from "../controllers/cart.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Get current user's cart
router.get("/", authMiddleware.authUser, cartController.getCartController);

// Toggle product in cart (add if not exists, remove if exists)
router.post(
  "/toggle",
  authMiddleware.authUser,
  body("productId").isMongoId().withMessage("Invalid product ID"),
  cartController.toggleCartItemController
);


// Clear cart
router.delete("/clear", authMiddleware.authUser, cartController.clearCartController);

export default router;
