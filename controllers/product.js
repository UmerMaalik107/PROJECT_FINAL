const bcrypt= require("bcrypt");
const {UserModel,CategoryModel,BrandModel,ProductModel}=require("../models");
const ErrorResponse = require("../utils/error.js");
const {productSchema}=require("../utils/validation.js");
const fs = require("fs");


class ProductController{
    async create(req, res, next) {
      let images=req.files.map((el)=>{
        return el.path;
      })
      // return res.json(images);

      if(req.files.length==0){
        throw new ErrorResponse("Upload atleast one image",422);
      }
      const {name,description,price,brand_id}=req.body
          const value=await productSchema.validateAsync({name,description,price,brand_id});
          const product=await ProductModel.create({name,description,price,brand:brand_id,images})
          return res
          .status(200)
          .json({success:true, message: "Successfull",data: {product} });
      }
      async update(req, res, next) {
        const {id}=req.params;
        const {name,description,price,brand_id}=req.body
        const value=await productSchema.validateAsync(req.body);
        const product=await ProductModel.findOneAndUpdate({_id:id},{name,description,price,brand:brand_id}, {
          new: true
        })
        return res
        .status(200)
        .json({success:true, message: "Successfull",data: {product} });
    }
    async getAll(req, res, next) {
      let {category_id,brand_id,name}=req.query;
      let find={};
      if(name){
        find={...find,name}
      }
      const products=await ProductModel.find({...find}).populate({
        path : 'brand',
        populate : {
          path : 'category'
        }
      }).exec()
      let returnProducts=products.filter((el)=>{
        if(category_id && brand_id){
          return el.brand.category._id==category_id && el.brand._id==brand_id;
        }
        if(category_id){
          return el.brand.category._id==category_id
        }
        if(brand_id){
          return el.brand._id==brand_id
        }
        return true;
      })
      let brandsDistinct=[];
      let brands=[];
      products.forEach((el)=>{
        if(!brandsDistinct.includes(el.brand._id)){
          brandsDistinct.push(el.brand._id);
          brands.push(el.brand)
        }
      })
      return res
      .status(200)
      .json({success:true, message: "Successfull",data: {products:returnProducts,brands} });
  }
  async getById(req, res, next) {
    const {id}=req.params;
    const product=await ProductModel.findOne({_id:id}).populate({
      path : 'brand',
      populate : {
        path : 'category'
      }
    }).exec()
    return res
    .status(200)
    .json({success:true, message: "Successfull",data: {product} });
}
async deleteById(req, res, next) {
  const {id}=req.params;
  const product=await ProductModel.findOne({_id:id});
  for(let i in product.images) {
    const path = product.images[i];
    try {
      fs.unlinkSync(path);
      console.log("File removed:", path);
    } catch (err) {
      console.error(err);
    }
  }
  
  await product.delete();
  return res
  .status(200)
  .json({success:true, message: "Successfull",data: {product} });
}
}

module.exports = ProductController;