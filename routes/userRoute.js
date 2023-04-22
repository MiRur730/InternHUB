
const express=require("express");
const  user_route=express();
const bodyParser= require("body-parser");
user_route.use(bodyParser.json());
user_route.use(bodyParser.urlencoded({extended:true}));
user_route.set("view engine","ejs");
user_route.set("views","./views")
const path=require("path");
user_route.use(express.static("public"));
const session=require("express-session");
const userController=require("../controllers/userController");
const adminLoginAuth=require("../middlewares/adminLoginAuth");
const config=require("../config/config");
user_route.use(session({
    secret: config.sessionSecret,resave:true,saveUninitialized:true
}));


user_route.get("/login",userController.loadLogin);
user_route.post("/login",userController.verifyLogin);
user_route.get("/logout",adminLoginAuth.isLogin,userController.logout);
// user_route.get("/",userController.profile);
user_route.get("/forget-password",adminLoginAuth.isLogout,userController.loadForget);
user_route.post("/forget-password",userController.forgetPasswordVerify);
user_route.get("/reset-password",adminLoginAuth.isLogout,userController.resetPasswordLoad);
user_route.post("/reset-password",userController.changedPassword);

module.exports=user_route;