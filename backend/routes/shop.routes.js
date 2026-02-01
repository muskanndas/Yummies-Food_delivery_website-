import express from "express";
import { createEditShop } from "../controllers/shop.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import{upload} from "../utils/multer.js";

const shopRouter = express.Router();
shopRouter.get("/create-edit-shop",isAuth, upload.single('image'),createEditShop);
export default shopRouter;