const path = require("path"); // for paths functions
const express = require("express");//server working
const mongoose = require("mongoose"); //this is lib to use mongodb
const cors = require("cors");//cross origen ressouse sharing is for sharing data across two diff domains
const dotenv = require("dotenv").config();//this is to use moongose link online 
const fs = require("fs"); //for file handling update edit read delete
const errorHandler = require("./middleware/error-handler.js") //error handler that we made 
const multer = require("multer");// form data req k liye
//this is function to upload images  
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now()+path.parse(file.originalname).name  + path.extname(file.originalname));
  },
 
});
const upload = multer({ storage: storage, fileFilter: (req, file, cb) => {
    console.log(file.mimetype);
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
        cb(null, true);
    } else {
        cb(null, false);
        const err = new Error('Only .png, .jpg and .jpeg format allowed!')
        err.name = 'ExtensionError'
        return cb(err);
    }
}, });
//net se uthaya 
const {
  UserRoutes,ProductRoutes,CategoryRoutes,BrandRoutes,
} = require("./routes");
const app = express();
let PORT = process.env.PORT || 5000;
app.use(cors());
app.use(upload.array("images"))//req for form data 
app.use(express.urlencoded({ extended: true }));//req for urlencoded
app.use(express.json());//req for json body
app.use("/user", UserRoutes);
app.use("/brand", BrandRoutes);
app.use("/category", CategoryRoutes);
app.use("/product", ProductRoutes);
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));//imgs ko as a route get krny k liye 
app.use(errorHandler);
//moongoose connect horhi hai agr connect hojati to server start hojata 
mongoose
  .connect(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server started at port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
