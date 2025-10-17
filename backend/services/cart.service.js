import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get cart with total price calculation
export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId });

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }
  
//   console.log(cart);
//   console.log(cart.toObject());
  const products = cart.toObject().products;
  return {products};
};


//   add or remove in cart
export const toggleCartItem = async (userId, productId) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = await Cart.create({ user: userId, products: [] });
  }

  // Check if product already in cart
  const productIndex = cart.products.findIndex(
    (id) => id.toString() === productId
  );

  if (productIndex > -1) {
    cart.products.splice(productIndex, 1);
  } else {
    cart.products.push(productId);
  }

  await cart.save();
  return cart;
};

// Clear cart
export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.products = [];
    await cart.save();
  }
};
