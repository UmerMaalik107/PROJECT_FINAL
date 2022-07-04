const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/error.js")
const asyncHandler=require("../utils/asyncHandler.js");

const admin = asyncHandler( async (req, res, next) => {

  try {
    let user=req.user;
    if (!user.admin) {
        throw new ErrorResponse("Forbidden",403);
    }
    next();
  } catch (error) {
    throw new ErrorResponse("Forbidden",403);
}
});
module.exports=admin;
