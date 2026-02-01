import Item from "../models/item.model";
import Shop from "../models/shop.model";
import uploadToCloudinary from "../utils/cloudinary";

export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodtype } = req.body;
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.user._id });
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }
    const item = await Item.create({name,
      category,
      price,
      foodtype,
      image,
      shop: shop._id});
      
  return res.status(201).json(item);

  } catch (error) {
     res.status(500).json({ message: "add item error", error: error.message });
  }
};


//edit item controller
export const editItem = async (req, res) => {
  try {
    const itemId = req.params.id;
    const { name, category, price, foodtype } = req.body;
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }

    const item = await Item.findByIdAndUpdate(itemId, {
      name,
      category,
      price,
      foodtype,
      image,
    }, { new: true });
    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }
    return res.status(200).json(item);
  } catch (error) {
    res.status(500).json({ message: "edit item error", error: error.message });
  }
};