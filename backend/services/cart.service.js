import Cart from "../models/cart.model.js";
import Product from "../models/product.model.js";

// Get cart with total price calculation
export const getCart = async (userId) => {
  let cart = await Cart.findOne({ user: userId }).populate("items.product", "name price images");

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [] });
  }

  const totalPrice = cart.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  
//   console.log(cart);
//   console.log(cart.toObject());
  return { ...cart.toObject(), totalPrice };
};


// Add product to cart
export const addToCart = async (userId, productId, shopId, quantity) => {
  const product = await Product.findById(productId);
  if (!product) throw new Error("Product not found");

  let cart = await Cart.findOne({ user: userId });
  if (!cart) cart = await Cart.create({ user: userId, items: [] });

  const existingItem = cart.items.find(item => item.product.toString() === productId);
  if (existingItem) {
    existingItem.quantity += quantity;
  } else {
    cart.items.push({ product: productId, shop: shopId, quantity });
  }

  await cart.save();
  return getCart(userId); // return updated cart with total
};

// Update quantity of a cart item
export const updateCartItem = async (userId, productId, quantity) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  const item = cart.items.find(item => item.product.toString() === productId);
  if (!item) throw new Error("Product not in cart");

  item.quantity = quantity;
  await cart.save();

  return getCart(userId);
};

// Remove product from cart
export const removeCartItem = async (userId, productId) => {
  const cart = await Cart.findOne({ user: userId });
  if (!cart) throw new Error("Cart not found");

  cart.items = cart.items.filter(item => item.product.toString() !== productId);
  await cart.save();

  return getCart(userId);
};

// Clear cart
export const clearCart = async (userId) => {
  const cart = await Cart.findOne({ user: userId });
  if (cart) {
    cart.items = [];
    await cart.save();
  }
};
