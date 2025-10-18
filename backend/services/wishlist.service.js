import Wishlist from "../models/wishlist.model.js";
import Product from "../models/product.model.js";

// Get wishlist
export const getWishlist = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }

  const products = wishlist.toObject().products;
  return { products };
};

// Get wishlist data
export const getWishlistdata = async (userId) => {
  let wishlist = await Wishlist.findOne({ user: userId })
    .populate({
      path: "products",
      select: "name price images category shop",
      populate: { path: "shop", select: "shopname" },
    });

  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }

  return { products: wishlist.products || [] };
};

// Add or remove product from wishlist
export const toggleWishlistItem = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let wishlist = await Wishlist.findOne({ user: userId });
  if (!wishlist) {
    wishlist = await Wishlist.create({ user: userId, products: [] });
  }

  // Check if product already in wishlist
  const productIndex = wishlist.products.findIndex(
    (id) => id.toString() === productId
  );

  if (productIndex > -1) {
    wishlist.products.splice(productIndex, 1);
  } else {
    wishlist.products.push(productId);
  }

  await wishlist.save();
  return wishlist;
};

// Clear wishlist
export const clearWishlist = async (userId) => {
  const wishlist = await Wishlist.findOne({ user: userId });
  if (wishlist) {
    wishlist.products = [];
    await wishlist.save();
  }
};
