import mongoose from "mongoose";

const shopSchema = new mongoose.Schema(
  {
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    shopname: {
      type: String,
      required: true,
      unique: true, // ensure shop names are unique
      trim: true, 
    },
    city: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    logo: {
      type: String, // store image URL or file path
      default: "/default-shop.png",
    },
    category: {
      type: String, // e.g., "Clothing", "Electronics"
      default: "General",
    },
    contactEmail: {
      type: String,
    },
    contactPhone: {
      required: true,
      type: String,
    },
    products: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
    ],
    verified: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: Boolean,
      default: true, // soft-disable shop if owner is inactive
    },
    rating: {
      type: Number,
      default: 4,
      min: 0,
      max: 5,
    },
  },
  { timestamps: true }
);

const Shop = mongoose.model("Shop", shopSchema);
export default Shop;
