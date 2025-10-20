import Product from "../models/product.model.js";


export const getCartdata = async (productIds) => {
  const cartdata = await Product.find({ _id: { $in: productIds } })
    .select("name price images category shop")
    .populate("shop", "shopname");

  return { cartdata };
};
