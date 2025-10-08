import Order from "../models/order.model.js";
import Shop from "../models/shop.model.js";
import Product from "../models/product.model.js";

// Create a new order
export const createOrder = async (orderData) => {
  // Validate shop
  const shop = await Shop.findById(orderData.shop);
  if (!shop) throw new Error("Shop not found");

  // Validate products & calculate total
  let totalPrice = 0;
  const productsWithPrice = [];

  for (const item of orderData.products) {
    const product = await Product.findById(item.product);
    if (!product) throw new Error(`Product ${item.product} not found`);

    const priceAtPurchase = product.price;
    totalPrice += priceAtPurchase * item.quantity;

    productsWithPrice.push({
      product: product._id,
      quantity: item.quantity,
      priceAtPurchase
    });
  }

  const order = await Order.create({
    customer: orderData.customer,
    shop: orderData.shop,
    products: productsWithPrice,
    totalPrice,
    deliveryAddress: orderData.deliveryAddress,
    deliveryCharge: orderData.deliveryCharge || 0,
    paymentMethod: orderData.paymentMethod || "COD",
    notes: orderData.notes || ""
  });

  return order;
};

// Update order status (only shop owner)
export const updateOrderStatus = async (orderId, userId, newStatus) => {
  const order = await Order.findById(orderId).populate("shop");
  if (!order) throw new Error("Order not found");

  // Check if user is shop owner
  const shop = await Shop.findById(order.shop._id);
  if (!shop || shop.owner.toString() !== userId.toString()) {
    throw new Error("Not authorized");
  }

  order.status = newStatus;
  await order.save();
  return order;
};
