import { validationResult } from "express-validator";
import Product from "../models/product.model.js";
import * as productService from "../services/product.service.js";
import Shop from "../models/shop.model.js";

/**
 * Create a new product
 */
export const createProductController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const productData = req.body;
    const currUserId = req.user._id;
    // console.log(productData);
    const product = await productService.createProduct({productData, currUserId});

    res.status(201).json({ product });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * Get all products
 */
export const getAllProductsController = async (req, res) => {
  try {
    const { category, shop, search } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (shop) filter.shop = shop;

    if (search) {
      const orConditions = [
        { name: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
        { tags: { $regex: search, $options: "i" } },
      ];

      if (!category) {
        orConditions.push({ category: { $regex: search, $options: "i" } });
      }

      filter.$or = orConditions;
    }

    const products = await Product.find(filter).populate("shop", "shopname owner");

    res.status(200).json({ products });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



/**
 * Search products by name or tags
 */
export const searchProductsController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const query = req.query.q;
    if (!query) return res.status(400).json({ message: "Search query is required" });

    const products = await Product.find({
      $or: [
        { name: { $regex: query, $options: "i" } },        
        { description: { $regex: query, $options: "i" } },  
        { category: { $regex: query, $options: "i" } },    
        { tags: { $regex: query, $options: "i" } },       
      ],
    });

    res.status(200).json({ products });
  } catch (err) {
    res.status(400).send(err.message);
  }
};



//  Get product by ID
export const getProductByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const product = await Product.findById(req.params.id).populate("shop", "shopname owner");
    if (!product) return res.status(404).json({ message: "Product not found" });

    res.status(200).json({ product });
  } catch (err) {
    res.status(400).send(err.message);
  }
};

/**
 * Update product (cleaner using findByIdAndUpdate)
 */
export const updateProductController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find shop and check ownership
    const shop = await Shop.findById(product.shop);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    if (shop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Update product with provided fields
    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    res.status(200).json({ product: updatedProduct });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};


// delete product
export const deleteProductController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });

    // Find shop and check ownership
    const shop = await Shop.findById(product.shop);
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    if (shop.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res.status(400).send(err.message);
  }
};


//  Get all products of a shop

export const getProductsByShopController = async (req, res) => {
  // Validate params
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const { shopId } = req.params;
    const page = parseInt(req.query.page) || 1;   // Current page (default 1)
    const limit = parseInt(req.query.limit) || 5; // Number of products per page
    const skip = (page - 1) * limit;

    // Count total products
    const total = await Product.countDocuments({ shop: shopId });

    // Fetch products with pagination
    const products = await Product.find({ shop: shopId })
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }); // latest products first

    res.status(200).json({
      products,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};




/**
 * Get products by category
 */
export const getProductsByCategoryController = async (req, res) => {
  try {
    const products = await Product.find({ category: req.params.categoryName });
    res.status(200).json({ products });
  } catch (err) {
    res.status(400).send(err.message);
  }
};


