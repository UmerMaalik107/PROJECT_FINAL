const bcrypt= require("bcrypt");
const {UserModel,CategoryModel,BrandModel,ProductModel}=require("../models");
const ErrorResponse = require("../utils/error.js")
const {brandSchema}=require("../utils/validation.js")
class BrandController{
    async create(req, res) {
          const value=await brandSchema.validateAsync(req.body);
          const brand=await BrandModel.create({name:value.name,category:value.category_id})
          return res
          .status(200)
          .json({success:true, message: "Successfull",data: {brand} });
      }
      async update(req, res) {
        const {id}=req.params;
        const value=await brandSchema.validateAsync({...req.body,id});
        const { name ,category_id} = value;
        const brand=await BrandModel.findOneAndUpdate({_id:id},{name,category:category_id}, {
          new: true
        })
        return res
        .status(200)
        .json({success:true, message: "Successfull",data: {brand} });
    }
    async getAll(req, res) {
      const brands=await BrandModel.find().populate("category")
      return res
      .status(200)
      .json({success:true, message: "Successfull",data: {brands} });
  }
  async getById(req, res) {
    const {id}=req.params;
    const brand=await BrandModel.findOne({_id:id}).populate("category")
    return res
    .status(200)
    .json({success:true, message: "Successfull",data: {brand} });
}
async deleteById(req, res) {
  const {id}=req.params;
  const brand=await BrandModel.findOne({_id:id});
  const product=await ProductModel.findOne({brand});
  if( product) {
    throw new ErrorResponse("Cannot delete brand because its product exists");
  }
  await brand.delete();
  return res
  .status(200)
  .json({success:true, message: "Successfull",data: {brand} });
}
}

module.exports = BrandController;