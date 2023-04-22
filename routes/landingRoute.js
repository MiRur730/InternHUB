const express=require("express");
const landingRoute=express();

const adminLoginAuth=require("../middlewares/adminLoginAuth")
const session=require("express-session");
const config=require("../config/config");
landingRoute.set("view engine","ejs");
landingRoute.set("views","./views/users");
landingRoute.use(express.static("public"));
const landingController=require("../controllers/landingController");
landingRoute.get("/",landingController.loadHome);

module.exports=landingRoute;
