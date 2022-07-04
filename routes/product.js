const express = require("express");
const route = express.Router();
const { ProductController } = require("../controllers");
const auth=require("../middleware/auth");
const asyncHandler=require("../utils/asyncHandler.js");
const admin=require("../middleware/admin");
const controller=new ProductController();

route.post("" ,auth,admin,asyncHandler(controller.create));
route.put("/:id",  auth,admin,asyncHandler(controller.update));
route.get("",  asyncHandler(controller.getAll));
route.get("/:id",  asyncHandler(controller.getById));
route.delete("/:id", auth,admin, asyncHandler(controller.deleteById));

module.exports = route;
