import Item from "../models/item.model.js";
import Shop from "../models/shop.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";


//add item controller
export const addItem = async (req, res) => {
  try {
    const { name, category, price, foodtype } = req.body;
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    const shop = await Shop.findOne({ owner: req.userId })
    if (!shop) {
      return res.status(400).json({ message: "Shop not found" });
    }
    const item = await Item.create({
      name,
      category,
      price,
      foodtype,
      image,
      shop: shop._id
    });

    shop.items.push(item._id);
    await shop.save();
    await shop.populate("owner")
    await shop.populate({
      path: "items",
      options: { sort: { updatedAt: -1 } }
    })
    return res.status(201).json(shop);

  } catch (error) {
    res.status(500).json({ message: "add item error", error: error.message });
  }
};


//edit item controller
// export const editItem = async (req, res) => {
//   try {
//     // const { itemId } = req.params;
//     const itemId = req.params.itemId;
//     const { name, category, price, foodtype } = req.body;
//      let image;
//       if (req.file) {
//       const image = await uploadToCloudinary(req.file.path);
//     // let updateData = {
//     //   name,
//     //   category,
//     //   price,
//     //   foodtype,
//     // };

//     // if (req.file) {
//     //   const image = await uploadToCloudinary(req.file.path);
//     //   updateData.image = image;
//     // }

//     const item = await Item.findByIdAndUpdate(
//       itemId,
//       // updateData,
//       { name, category, price, foodtype, image },
//       { new: true }
//     );

//     if (!item) {
//       return res.status(404).json({ message: "Item not found" });
//     }
//      const shop = await Shop.findOne({owner: req.userId}).populate("items");

//     return res.status(200).json(shop);

//   }} catch (error) {
//     res.status(500).json({ message: "edit item error", error: error.message });
//   }
// };


export const editItem = async (req, res) => {
  try {
    const { itemId } = req.params;
    const { name, category, price, foodtype } = req.body;

    let updateData = {
      name,
      category,
      price,
      foodtype,
    };

    if (req.file) {
      const image = await uploadToCloudinary(req.file.path);
      updateData.image = image;
    }

    const item = await Item.findByIdAndUpdate(
      itemId,
      updateData,
      { new: true }
    );

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    const shop = await Shop.findOne({ owner: req.userId }).populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        });
    return res.status(200).json(shop);

  } catch (error) {
    res.status(500).json({
      message: "edit item error",
      error: error.message,
    });
  }
};





//get item by id controller
export const getItemById = async (req, res) => {
  try {

    const { itemId } = req.params;

    const item = await Item.findById(itemId);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    return res.status(200).json(item);

  } catch (error) {

    res.status(500).json({ message: "get item error", error: error.message });
  }
};

//delete item controller
export const deleteItem = async (req, res) => {
    try {
        const itemId = req.params.itemId
        const item = await Item.findByIdAndDelete(itemId)
        if (!item) {
            return res.status(400).json({ message: "item not found" })
        }
        const shop = await Shop.findOne({ owner: req.userId })
        shop.items = shop.items.filter(i => i !== item._id)
        await shop.save()
        await shop.populate({
            path: "items",
            options: { sort: { updatedAt: -1 } }
        })
        return res.status(200).json(shop)

    } catch (error) {
        return res.status(500).json({ message: `delete item error ${error}` })
    }
};

//get item by city controller

export const getItemByCity = async (req, res) => {
    try {
        const { city } = req.params
        if (!city) {
            return res.status(400).json({ message: "city is required" })
        }
        const shops = await Shop.find({
            city: { $regex: new RegExp(`^${city}$`, "i") }
        }).populate('items')
        if (!shops) {
            return res.status(400).json({ message: "shops not found" })
        }
        const shopIds=shops.map((shop)=>shop._id)

        const items=await Item.find({shop:{$in:shopIds}})
        return res.status(200).json(items)

    } catch (error) {
 return res.status(500).json({ message: `get item by city error ${error}` })
    }
};

