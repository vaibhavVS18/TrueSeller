import axios from "axios";
import fs from "fs";
import mongoose from "mongoose";
import Shop from "./models/shop.model.js";
import Product from "./models/product.model.js"; // ✅ Product model
import dotenv from "dotenv";
dotenv.config();

// Connect Mongo
const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
console.log("✅ Connected to MongoDB");

const BASE_URL = "https://dummyjson.com/products/category";
const LOOPS = 10; // cycles — 1 product per category per cycle

const fetchAndSaveProducts = async () => {
  try {
    const shops = await Shop.find({}, "category _id");
    if (!shops.length) {
      console.log("⚠️ No shops found.");
      return;
    }

    const allProducts = [];

    for (let round = 1; round <= LOOPS; round++) {
      console.log(`\n🚀 Round ${round}/${LOOPS}`);

      for (const shop of shops) {
        const CATEGORY = shop.category;
        const SHOP_ID = shop._id.toString();

        const res = await axios.get(
          `${BASE_URL}/${CATEGORY}?limit=1&skip=${round - 1}`
        );

        const product = res.data.products?.[0];
        if (!product) continue;

        const formattedProduct = {
          shop: SHOP_ID,
          name: product.title,
          description: product.description,
          price: product.price,
          stock: product.stock || 0,
          images: product.images?.length ? product.images : [product.thumbnail],
          category: product.category,
          tags: [product.brand, product.category].filter(Boolean),
          rating: product.rating || 0,
          isActive: true,
        };

        allProducts.push(formattedProduct);
        console.log(`✅ Added product from ${CATEGORY} for Shop ${SHOP_ID}`);
      }
    }

    // ✅ Save to JSON file
    fs.writeFileSync("./products.json", JSON.stringify(allProducts, null, 2));
    console.log(`📁 Saved ${allProducts.length} to products.json`);

    // ✅ Insert into MongoDB
    await Product.insertMany(allProducts);
    console.log(`🟢 Inserted ${allProducts.length} products into database`);

  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndSaveProducts();
