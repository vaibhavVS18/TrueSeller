import axios from "axios";
import fs from "fs";
import mongoose from "mongoose";
import Shop from "./models/shop.model.js";
import dotenv from "dotenv";
dotenv.config();

// 🔗 Connect to MongoDB
const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB");

const BASE_URL = "https://dummyjson.com/products/category";
const LIMIT = 10;

const fetchAndSaveProducts = async () => {
  try {
    const shops = await Shop.find({}, "category _id"); // fetch all shops with category + _id
    if (!shops.length) {
      console.log("⚠️ No shops found in DB.");
      return;
    }

    const allProducts = [];

    // loop through each shop and its category
    for (const shop of shops) {
      const CATEGORY = shop.category;
      const SHOP_ID = shop._id.toString();

      console.log(`📦 Fetching ${CATEGORY} products for shop ${SHOP_ID}...`);

      const res = await axios.get(`${BASE_URL}/${CATEGORY}?limit=${LIMIT}`);
      const products = res.data.products.map((p) => ({
        shop: SHOP_ID,
        name: p.title,
        description: p.description,
        price: p.price,
        stock: p.stock || 0,
        images: p.images?.length ? p.images : [p.thumbnail],
        category: p.category,
        tags: [p.brand, p.category].filter(Boolean),
        rating: p.rating || 0,
        isActive: true,
      }));

      allProducts.push(...products);
      console.log(`✅ Added ${products.length} products for ${CATEGORY}`);
    }

    fs.writeFileSync("./products.json", JSON.stringify(allProducts, null, 2));
    console.log(`🎉 Saved ${allProducts.length} total products to products.json`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndSaveProducts();
