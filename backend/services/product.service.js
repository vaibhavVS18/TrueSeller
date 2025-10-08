import productModel from "../models/product.model.js";
import shopModel from "../models/shop.model.js";

export const createProduct = async ({ productData, currUserId }) => {
  if (!productData.shop) {
    throw new Error("All fields (shop) are required");
  }

  // Validate shop and ownership
  const shop = await shopModel.findOne({
    _id: productData.shop,
    owner: currUserId,
  });

  if (!shop) {
    throw new Error("Shop not found or not authorized");
  }

  // Create product
  const product = await productModel.create(productData);

  // Add product to shop's products array
  shop.products.push(product._id);
  await shop.save();

  return product;
};
