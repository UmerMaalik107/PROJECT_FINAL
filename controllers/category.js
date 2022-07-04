const bcrypt= require("bcrypt");
const {UserModel,CategoryModel,BrandModel,ProductModel}=require("../models");
const ErrorResponse = require("../utils/error.js")
const {categorySchema}=require("../utils/validation.js")
class CategoryController{
    async create(req, res) {
          const value=await categorySchema.validateAsync(req.body);
          const category=await CategoryModel.create(value)
          return res
          .status(200)
          .json({success:true, message: "Successfull",data: {category} });
      }
      async update(req, res) {
        const {id}=req.params;
        const value=await categorySchema.validateAsync({...req.body,id});
        const { name } = value;
        const category=await CategoryModel.findOneAndUpdate({_id:id},{name}, {
          new: true
        })
        return res
        .status(200)
        .json({success:true, message: "Successfull",data: {category} });
    }
    async getAll(req, res, next) {
      const categories=await CategoryModel.find()
      return res
      .status(200)
      .json({success:true, message: "Successfull",data: {categories} });
  }
  async getById(req, res, next) {
    const {id}=req.params;
    const category=await CategoryModel.findOne({_id:id})
    return res
    .status(200)
    .json({success:true, message: "Successfull",data: {category} });
}
async deleteById(req, res, next) {
  const {id}=req.params;
  const category=await CategoryModel.findOne({_id:id});
  const brand=await BrandModel.findOne({category});
  const product=await ProductModel.findOne({brand});
  console.log({brand,product});
  if(brand || product) {
    throw new ErrorResponse("Cannot delete category because its brand or product exists");
  }
  await category.delete();
  return res
  .status(200)
  .json({success:true, message: "Successfull",data: {category} });
}
}

module.exports = CategoryController;