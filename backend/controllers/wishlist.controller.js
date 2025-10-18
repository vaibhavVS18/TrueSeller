import { validationResult } from "express-validator";
import * as wishlistService from "../services/wishlist.service.js";

// Get current user's wishlist
export const getWishlistController = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlist(req.user._id);
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Get current user's wishlist data
export const getWishlistdataController = async (req, res) => {
  try {
    const wishlist = await wishlistService.getWishlistdata(req.user._id);
    res.status(200).json(wishlist);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Toggle product in wishlist (Add/Remove)
export const toggleWishlistItemController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { productId } = req.body;
    const wishlist = await wishlistService.toggleWishlistItem(req.user._id, productId);
    res.status(200).json(wishlist);
  } catch (err) {
    return res.status(400).json({ message: err.message });
  }
};

// Clear wishlist
export const clearWishlistController = async (req, res) => {
  try {
    await wishlistService.clearWishlist(req.user._id);
    res.status(200).json({ message: "Wishlist cleared successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
