import { Router } from "express";
import { body, param } from "express-validator";
import * as shopController from "../controllers/shop.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

//  Create a new shop
router.post(
  "/",
  authMiddleware.authUser,
  body("shopname").notEmpty().withMessage("Shop name is required"),
  body("address").notEmpty().withMessage("Address is required"),
    body("contactEmail")
      .optional()
      .isEmail()
      .withMessage("Contact email must be valid"),

    body("contactPhone")
      .notEmpty()
      .withMessage("Contact phone is required")
      .isString()
      .withMessage("Contact phone must be a string")
      .isLength({ min: 8, max: 15 })
      .withMessage("Contact phone must be 8–15 characters"),  
  shopController.createShopController
);


//  Get all shops
router.get("/", shopController.getAllShopsController);


//  Get all verified shops
router.get("/verified", shopController.getVerifiedShopsController);

//  Get all shops for a specific owner
router.get(
  "/owner/:ownerId",
  param("ownerId").isMongoId().withMessage("Invalid user ID"),
  shopController.getShopsByOwnerController
);


// Get shop by id
router.get(
  "/:id",
  param("id").isMongoId().withMessage("Invalid shop ID"),
  shopController.getShopByIdController
);

// update shop by owner
router.put(
  "/:id",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid shop ID"),
  body("shopname").optional().notEmpty().withMessage("Shop name cannot be empty"),
  body("address").optional().notEmpty().withMessage("Address cannot be empty"),
  shopController.updateShopController
);

// delete shop by owner
router.delete(
  "/:id",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid shop ID"),
  shopController.deleteShopController
);


export default router;
