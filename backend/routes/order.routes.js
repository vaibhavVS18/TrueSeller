import { Router } from "express";
import { body, param } from "express-validator";
import * as orderController from "../controllers/order.controller.js";
import * as authMiddleware from "../middleware/auth.middleware.js";

const router = Router();

// Create a new order
router.post(
  "/",
  authMiddleware.authUser,
  body("shop").isMongoId().withMessage("Invalid shop ID"),
  body("products").isArray({ min: 1 }).withMessage("Products array is required"),
  body("products.*.product").isMongoId().withMessage("Invalid product ID"),
  body("products.*.quantity").isInt({ min: 1 }).withMessage("Quantity must be at least 1"),
  body("deliveryAddress").notEmpty().withMessage("Delivery address is required"),
  body("paymentMethod")
    .optional()
    .isIn(["COD", "Online"])
    .withMessage("Payment method must be COD or Online"),
  orderController.createOrderController
);

// Get all orders for a customer
router.get("/my-orders", authMiddleware.authUser, orderController.getMyOrdersController);

// Get all orders for a shop (shop owner)
router.get("/shop/:shopId",
  authMiddleware.authUser,
  param("shopId").isMongoId().withMessage("Invalid shop ID"),
  orderController.getOrdersByShopController
);

// Get order by ID
router.get("/:id",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid order ID"),
  orderController.getOrderByIdController
);

// Update order status (shop owner)
router.put("/:id/status",
  authMiddleware.authUser,
  param("id").isMongoId().withMessage("Invalid order ID"),
  body("status").isIn([
    "pending", "processing", "shipped", "out-for-delivery", "delivered", "cancelled"
  ]).withMessage("Invalid status"),
  orderController.updateOrderStatusController
);

export default router;
