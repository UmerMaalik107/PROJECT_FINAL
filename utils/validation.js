const Joi = require('joi');
const {UserModel,CategoryModel,BrandModel} =require("../models");

const signupSchema = Joi.object({
    first_name: Joi.string()
    .regex(/^[a-zA-Z]*$/, 'Only Alphabets are allowed')
    .min(3)
    .max(30)
    .required(),
    last_name: Joi.string()
    .regex(/^[a-zA-Z]*$/, 'Only Alphabets are allowed')
    .min(3)
    .max(30)
    .required(),
    password: Joi.string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

    confirm_password: Joi.ref('password'),

    email: Joi.string()
        .email().external(async (email)=>{
            let user=await UserModel.findOne({email});
            if(user){
                throw new Error("Email Already Exists!");
            }
        })
});
const loginSchema = Joi.object({
  
    email: Joi.string()
        .email(),
        password:Joi.string()
        .required(),
});
const categorySchema = Joi.object({
    name: Joi.string().required(),
    id: Joi.string().default(null),

}).external(async (obj)=>{
    let where={name:obj.name}
    if(obj.id){
        where={...where,_id: { $ne: obj.id }}
    }
    let category=await CategoryModel.findOne({...where});
    if(category){
        throw new Error("Category Name Already Exists!");
    }
});
const brandSchema = Joi.object({
    name: Joi.string().required(),
    category_id: Joi.string().required().external(async(category_id)=>{
        let category=await CategoryModel.findOne({_id:category_id});
    if(!category){
        throw new Error("Category id is invalid!");
    }
    }),
    id: Joi.string().default(null),

}).external(async (obj)=>{
    let where={name:obj.name}
    if(obj.id){
        where={...where,_id: { $ne: obj.id }}
    }
    let Brand=await BrandModel.findOne({...where});
    if(Brand){
        throw new Error("Brand Name Already Exists!");
    }
});

const productSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    brand_id: Joi.string().required().external(async(brand_id)=>{
        let brand=await BrandModel.findOne({_id:brand_id});
    if(!brand){
        throw new Error("Brand id is invalid!");
    }
    }),

});
module.exports ={
    signupSchema,
    loginSchema,
    categorySchema,
    brandSchema,
    productSchema
}
