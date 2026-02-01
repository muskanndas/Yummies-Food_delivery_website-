import express from "express";
import { addItem, editItem } from "../controllers/items.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import{upload} from "../utils/multer.js";

const itemRouter = express.Router();
itemRouter.post("/add-item",isAuth, upload.single('image'),addItem);
itemRouter.post("/edit-item/:itemId",isAuth, upload.single('image'),editItem);

export default itemRouter;