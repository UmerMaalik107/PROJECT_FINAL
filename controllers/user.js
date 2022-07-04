const bcrypt= require("bcrypt");
const {UserModel}=require("../models");
const jwt = require("jsonwebtoken");
const ErrorResponse = require("../utils/error.js")
const {signupSchema,loginSchema}=require("../utils/validation.js")
class UserController{
    async signin(req, res, next) {
          const value=await loginSchema.validateAsync(req.body);
          const { email, password } = value;
          const user = await UserModel.findOne({ email });
          if (user) {
            const result = await bcrypt.compare(password, user.password);
            if (result) {
              const token = jwt.sign(
                {
                  id:user._id,
                },
                "secret"
              );
              return res
                .status(200)
                .json({success:true, message: "Login Successfull",data: {user, token} });
            }
          } 
            throw new ErrorResponse("Email or Password Incorrect!",422);
          
        
      }
    async signup(req,res){
          const value =await signupSchema.validateAsync(req.body);
             bcrypt.genSalt(10, function (err, salt) {
              bcrypt.hash(value.password, salt, async (err, hash) => {
                const user = new UserModel({
                  ...value,
                  password: hash,
                });
      
                await user.save();
      
                return res.status(200).json({success:true, message: "Signup Successfull", data:user });
              });
            });
         
    }
}

module.exports = UserController;