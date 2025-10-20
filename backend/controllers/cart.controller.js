import { validationResult } from "express-validator";
import * as cartService from "../services/cart.service.js";

export const getCartdataController = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { products } = req.body;

    const cartdata = await cartService.getCartdata(req.user._id, products);

    res.status(200).json(cartdata);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};
