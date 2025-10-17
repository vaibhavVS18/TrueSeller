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

// toggle product in cart (Add/Remove)
export const toggleCartItemController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { productId } = req.body;
    const cart = await cartService.toggleCartItem(req.user._id, productId);
    res.status(200).json(cart);
  } catch (err) {
    return res.status(400).json({ message: err.message });
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
