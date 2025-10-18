import { Router } from "express";
import { body, param } from "express-validator";
import * as wishlistController from "../controllers/wishlist.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Get current user's wishlist
router.get("/", authMiddleware.authUser, wishlistController.getWishlistController);

// Get current user's wishlist with data
router.get("/wishlistdata", authMiddleware.authUser, wishlistController.getWishlistdataController);

// Toggle product in wishlist (add if not exists, remove if exists)
router.post(
  "/toggle",
  authMiddleware.authUser,
  body("productId").isMongoId().withMessage("Invalid product ID"),
  wishlistController.toggleWishlistItemController
);

// Clear wishlist
router.delete("/clear", authMiddleware.authUser, wishlistController.clearWishlistController);

export default router;
