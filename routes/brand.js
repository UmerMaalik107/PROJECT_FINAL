const express = require("express");
const route = express.Router();
const { BrandController } = require("../controllers");
const controller=new BrandController();
const auth=require("../middleware/auth");
const admin=require("../middleware/admin");
const asyncHandler=require("../utils/asyncHandler.js");

route.post("", auth,admin, asyncHandler(controller.create));
route.put("/:id", auth,admin, asyncHandler(controller.update));
route.get("",  asyncHandler(controller.getAll));
route.get("/:id",  asyncHandler(controller.getById));
route.delete("/:id", auth,admin, asyncHandler(controller.deleteById));

module.exports = route;
