import Shop from "../models/shop.model.js";
import uploadToCloudinary from "../utils/cloudinary.js";

//{/*create shop controller*/}
export const createEditShop = async (req, res) => {
  try {
    const { name, city, state, address } = req.body;
     let shop = await Shop.findOne({ owner: req.userId });
    let image;
    if (req.file) {
      image = await uploadToCloudinary(req.file.path);
    }
    //find if shop exists then edit not create or if not then create new shop
    
    if (!shop) {
      if (!image) {
        return res.status(400).json({ message: "Image is required" });
      }
       shop = await Shop.create({
        name,
        city,
        state,
        address,
        image,
        owner: req.userId
      })
    } else {

  let updatedData = {
    name,
    city,
    state,
    address
  };

  if (image) {
    updatedData.image = image;
  }

  shop = await Shop.findByIdAndUpdate(
    shop._id,
    updatedData,
    { new: true }
  );
}
      await shop.populate("owner items");
      return res.status(201).json(shop);
  } catch (error) {
    return res.status(500).json({ message: "Error in creating shop", error: error.message });
  }
};


//{/*get myshop controller*/}
export const getMyShop = async (req, res) => {
  try {
    const shop = await Shop.findOne({ owner: req.userId }).populate("owner").populate({
            path:"items",
            options:{sort:{updatedAt:-1}}
        })
    if (!shop) {
      return res.status(404).json({ message: "Shop not found"});
    }

    return res.status(200).json(shop);
   
  } catch (error) {
    return res.status(500).json({ message: "Error in getting my shop", error: error.message });
  }
};

//getShopByCity controller
export const getShopByCity=async (req,res) => {
    try {
        const {city}=req.params

        const shops=await Shop.find({
            city:{$regex:new RegExp(`^${city}$`, "i")}
        }).populate('items')
        if(!shops){
            return res.status(400).json({message:"shops not found"})
        }
        return res.status(200).json(shops)
    } catch (error) {
        return res.status(500).json({message:`get shop by city error ${error}`})
    }
}