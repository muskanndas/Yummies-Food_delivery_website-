// import express from "express";
// import { addItem, editItem, getItemById } from "../controllers/items.controllers.js";
// import isAuth from "../middlewares/isAuth.js";
// import upload from "../middlewares/multer.js";

// const itemRouter = express.Router();
// itemRouter.post("/add-item",isAuth, upload.single('image'),addItem);
// itemRouter.put("/edit-item/:itemId",isAuth, upload.single('image'),editItem);
// itemRouter.get("/get-item/:itemId",isAuth, getItemById);

// export default itemRouter;

// routes/item.routes.js

import express from "express";
import {
  addItem,
  deleteItem,
  editItem,
  getItemByCity,
  getItemById
} from "../controllers/items.controllers.js";
import isAuth from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const itemRouter = express.Router();

itemRouter.post("/add-item", isAuth, upload.single("image"), addItem);

itemRouter.put("/edit-item/:itemId", isAuth, upload.single("image"), editItem);

itemRouter.get("/get-item/:itemId", isAuth, getItemById);

itemRouter.delete("/delete/:itemId",isAuth,deleteItem);

itemRouter.get("/get-by-city/:city",isAuth,getItemByCity)
export default itemRouter;
