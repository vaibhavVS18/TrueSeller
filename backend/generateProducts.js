import axios from "axios";
import fs from "fs";
import mongoose from "mongoose";
import Shop from "./models/shop.model.js";
import dotenv from "dotenv";
dotenv.config();

const MONGO_URI = process.env.MONGO_URI;
await mongoose.connect(MONGO_URI);
console.log("Connected to MongoDB ✅");

const BASE_URL = "https://dummyjson.com/products/category";
const LIMIT_PER_CATEGORY = 1; // ✅ only 1 each round
const LOOPS = 10; // ✅ how many cycles you want (change as you like)

const fetchAndSaveProducts = async () => {
  try {
    const shops = await Shop.find({}, "category _id");
    if (!shops.length) {
      console.log("No shops found in DB.");
      return;
    }

    const allProducts = [];

    for (let round = 1; round <= LOOPS; round++) {
      console.log(`\n🚀 Round ${round}/${LOOPS}`);

      for (const shop of shops) {
        const CATEGORY = shop.category;
        const SHOP_ID = shop._id.toString();

        const res = await axios.get(
          `${BASE_URL}/${CATEGORY}?limit=1&skip=${round - 1}` // ✅ fetch 1 product offset by round
        );

        const product = res.data.products[0];
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
        console.log(`✅ Added 1 ${CATEGORY} product for shop ${SHOP_ID}`);
      }
    }

    fs.writeFileSync("./products.json", JSON.stringify(allProducts, null, 2));
    console.log(`\n🎉 Saved ${allProducts.length} products to products.json`);
  } catch (err) {
    console.error("❌ Error:", err.message);
  } finally {
    mongoose.connection.close();
  }
};

fetchAndSaveProducts();
