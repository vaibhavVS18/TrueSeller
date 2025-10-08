import { validationResult } from "express-validator";
import Order from "../models/order.model.js";
import Cart from "../models/cart.model.js";
import * as orderService from "../services/order.service.js";

// Create a new order
export const createOrderController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const orderData = {
      ...req.body,
      customer: req.user._id
    };

    const order = await orderService.createOrder(orderData);
    res.status(201).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get orders for logged-in customer
export const getMyOrdersController = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("products.product", "name price")
      .populate("shop", "shopname owner");

    res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get orders for a shop (owner only)
export const getOrdersByShopController = async (req, res) => {
  try {
    const shopId = req.params.shopId;

    // Ensure requester owns this shop
    const orders = await Order.find({ shop: shopId })
      .populate("products.product", "name price")
      .populate("customer", "username email");

    res.status(200).json({ orders });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get single order by ID
export const getOrderByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const order = await Order.findById(req.params.id)
      .populate("products.product", "name price")
      .populate("shop", "shopname owner")
      .populate("customer", "username email");

    if (!order) return res.status(404).json({ message: "Order not found" });

    // Ensure only customer or shop owner can view
    if (order.customer.toString() !== req.user._id.toString() &&
        order.shop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update order status (shop owner)
export const updateOrderStatusController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const order = await orderService.updateOrderStatus(req.params.id, req.user._id, req.body.status);
    res.status(200).json({ order });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
