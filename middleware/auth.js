const jwt = require("jsonwebtoken");
const { UserModel } = require("../models");
const ErrorResponse = require("../utils/error.js")
const asyncHandler=require("../utils/asyncHandler.js");
const auth = asyncHandler(async (req, res, next) => {
  let token = req.headers["authorization"];
  if (token == undefined) {
    throw new ErrorResponse("Unauthorized",401);

  }
  try {
    let tempToken=token.split("Bearer ");
    const { id } = jwt.verify(tempToken[1], "secret");
    const user = await UserModel.findById(id);

    if (!user) {
        throw new ErrorResponse("Unauthorized",401);
    }
    req.user = user;
    next();
  } catch (error) {
    throw new ErrorResponse("Unauthorized",401);
  }
});
module.exports=auth;
