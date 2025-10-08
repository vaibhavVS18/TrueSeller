import { validationResult } from "express-validator";
import Shop from "../models/shop.model.js";
import * as shopService from "../services/shop.service.js";


//  Create a new shop
export const createShopController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const shopData = {
        ...req.body,
        owner: req.user._id
    }
    const shop = await shopService.createShop(shopData);

    res.status(201).json({ shop });
  }
   catch (err) {
    res.status(400).send(err.message);
  }
};


//  Get all shops
export const getAllShopsController = async (req, res) => {
  try {
    const {category, city, search} = req.query;
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 12;
    const skip = (page - 1) * limit;

    const filter = {};

    if(category) filter.category = category;
    if(city) filter.city = city;

    if(search){
      const orConditions = [
        {shopname: {$regex: search, $options:"i"}},
        {description: {$regex: search, $options:"i"}},
        {address: {$regex: search, $options: "i"}}
      ];

      if (!category) {
        orConditions.push({ category: { $regex: search, $options: "i" } });
      }

      if (!city) {
        orConditions.push({ city: { $regex: search, $options: "i" } });
      }

      filter.$or = orConditions;
    }

    const total = await Shop.countDocuments(filter);
    const shops = await Shop.find(filter)
            .populate("owner", "username email")
            .skip(skip)
            .limit(limit);

    res.status(200).json({
      shops,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
};


export const getVerifiedShopsController = async (req, res) => {
  try {
    const shops = await Shop.find({ verified: true }).populate(
      "owner",
      "username email"
    ); 
    res.status(200).json({ shops });
  } catch (err) {
    res.status(400).send(err.message);
  }
};



export const getShopByIdController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const shop = await Shop.findById(req.params.id).populate("owner", "username email");
    if (!shop) return res.status(404).json({ message: "Shop not found" });

    res.status(200).json({ shop });
  } catch (err) {
    res.status(400).send(err.message);
  }
};


//  Update shop details

export const updateShopController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updates = req.body;

    const shop = await Shop.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id }, // ensure owner matches
      updates,
      { new: true, runValidators: true } // return updated doc + validate schema
    );

    if (!shop) return res.status(404).json({ message: "Shop not found or not authorized" });

    res.status(200).json({ shop });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



//   Delete shop
export const deleteShopController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const shop = await Shop.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id, // ensures only owner can delete
    });

    if (!shop) return res.status(404).json({ message: "Shop not found or not authorized" });

    res.status(200).json({ message: "Shop deleted successfully" });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};



// Get all shops by a specific owner
export const getShopsByOwnerController = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const shops = await Shop.find({ owner: req.params.ownerId });
    res.status(200).json({ shops });
  } catch (err) {
    res.status(400).send(err.message);
  }
};
