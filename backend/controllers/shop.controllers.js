import Shop from "../models/shop.model";

//{/*create shop controller*/}
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    //find if shop exists then edit not create or if not then create new shop
    let shop = await Shop.findOne({ owner: req.user._id });//Shop.findOne({ owner: req.userId });
    if (!shop) {
       shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.user._id
      })
    } else {
      shop= await Shop.findByIdAndUpdate(
        shop._id,
        { name, city, state, address, image , owner: req.user._id },
        { new: true }
      );
    }
      await shop.populate("owner");
      return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: "Error in creating shop", error: error.message });
  }
};


