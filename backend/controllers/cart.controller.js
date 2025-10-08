import { validationResult } from "express-validator";
import * as cartService from "../services/cart.service.js";

// Get current user's cart
export const getCartController = async (req, res) => {
  try {
    const cart = await cartService.getCart(req.user._id);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Add product to cart
export const addToCartController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { product, shop, quantity } = req.body;
    const cart = await cartService.addToCart(req.user._id, product, shop, quantity || 1);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Update quantity of a cart item
export const updateCartItemController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { productId } = req.params;
    const { quantity } = req.body;
    const cart = await cartService.updateCartItem(req.user._id, productId, quantity);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Remove product from cart
export const removeCartItemController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { productId } = req.params;
    const cart = await cartService.removeCartItem(req.user._id, productId);
    res.status(200).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Clear cart
export const clearCartController = async (req, res) => {
  try {
    await cartService.clearCart(req.user._id);
    res.status(200).json({ message: "Cart cleared successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
