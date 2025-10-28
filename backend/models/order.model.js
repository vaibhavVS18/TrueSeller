import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: { type: Number, default: 1 },
        priceAtPurchase: { type: Number, required: true }, // important for historical accuracy
        shop: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Shop",
          required: true,
        },
      },
    ],
    totalPrice: {
      type: Number,
      required: true,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
    deliveryCharge: {
      type: Number,
      default: 0,
    },
    paymentMethod: {
      type: String,
      enum: ["COD", "Online"],
      default: "COD",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed", "refunded"],
      default: "pending",
    },
    status: {
      type: String,
      enum: [
        "ordered",
        "shipped",        // handed to courier
        "out-for-delivery",
        "delivered",
        "cancelled",
      ],
      default: "ordered",
    },
    notes: {
      type: String, // customer notes like "Leave at doorstep"
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
