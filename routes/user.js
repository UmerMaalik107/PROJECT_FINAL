const express = require("express");
const route = express.Router();
const { UserController } = require("../controllers");
const controller=new UserController();
const auth=require("../middleware/auth");
const asyncHandler=require("../utils/asyncHandler.js");

route.post("/login",  asyncHandler(controller.signin));
route.post("/signup", asyncHandler(controller.signup));

module.exports = route;
