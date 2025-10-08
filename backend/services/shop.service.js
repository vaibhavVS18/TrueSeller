import shopModel from "../models/shop.model.js";

export const createShop = async(shopData)=>{
    if(!shopData.owner || !shopData.shopname){
        throw new Error("All fields are required")
    }

    const shopname = shopData.shopname;
    const existing = await shopModel.findOne({ shopname });
    if (existing) {
      throw new Error("shop name already exists");
    }

    const shop =await shopModel.create(shopData);

    return shop;
}

