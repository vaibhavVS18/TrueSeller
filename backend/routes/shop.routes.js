import { Router } from "express";
import { body, param } from "express-validator";
import * as shopController from "../controllers/shop.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";
import Shop from "../models/shop.model.js";

const router = Router();

// Seed multiple shops
router.post("/seed", async (req, res) => {
  try {
    const shops = req.body;

    // Validate input
    if (!Array.isArray(shops) || shops.length === 0) {
      return res.status(400).json({ message: "Invalid or empty shop data." });
    }

    // Optional: clear old shops before seeding
    // await Shop.deleteMany({});

    // Format & validate each shop
    const formattedShops = shops.map((shop) => ({
      ...shop,
      shopname: shop.shopname?.trim(),
      city: shop.city?.trim(),
      address: shop.address?.trim(),
      category: shop.category?.trim() || "General",
      contactEmail: shop.contactEmail?.toLowerCase(),
      contactPhone: String(shop.contactPhone || ""),
      rating:
        typeof shop.rating === "number"
          ? Math.min(Math.max(shop.rating, 0), 5)
          : 4,
      verified: !!shop.verified,
      isActive: shop.isActive !== false, // default true
    }));

    // Insert shops
    const inserted = await Shop.insertMany(formattedShops);

    res.status(201).json({
      message: `${inserted.length} shops inserted successfully.`,
      data: inserted,
    });
  } catch (err) {
    console.error("❌ Error inserting shops:", err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
});

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
