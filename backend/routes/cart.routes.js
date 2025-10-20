import { body } from "express-validator";
import express from "express";
import * as cartController from "../controllers/cart.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
import mongoose from "mongoose";

const router = express.Router();

router.get(
  "/cartdata",
  authMiddleware.authUser,
  body("products")
    .isArray({ min: 1 })
    .withMessage("Products must be a non-empty array")
    .custom((products) => {
      for (const id of products) {
        if (!mongoose.Types.ObjectId.isValid(id)) {
          throw new Error(`Invalid product ID: ${id}`);
        }
      }
      return true;
    }),
  cartController.getCartdataController
);



export default router;