const express=require("express");
const  admin_route=express();
const bodyParser= require("body-parser");
admin_route.use(bodyParser.json());
admin_route.use(bodyParser.urlencoded({extended:true}));
admin_route.set("view engine","ejs");
admin_route.set("views","./views")
const multer=require("multer");
const path=require("path");
admin_route.use(express.static("public"));
const storage=multer.diskStorage({
    destination:function(req,file,cb){
      cb(null,path.join(__dirname,"../public/images"))
    },
    filename:function(req,file,cb){
     const name=new Date().toISOString()+"-"+ file.originalname;
     cb(null,name)
    }

   

});

const upload=multer({storage:storage});

const adminController=require("../controllers/adminController");
const adminLoginAuth=require("../middlewares/adminLoginAuth")
const session=require("express-session");
const config=require("../config/config");

admin_route.use(session({
secret:config.sessionSecret,resave:true,saveUninitialized:true
}));


admin_route.get("/startup-setup",adminController.startupSetup);
admin_route.post("/startup-setup",adminController.startupSetupSave);
admin_route.get("/dashboard",adminLoginAuth.isLogin,adminController.dashboard);
admin_route.get("/create-post",adminLoginAuth.isLogin,adminController.loadPostDashboard);
admin_route.post("/create-post",adminLoginAuth.isLogin,adminController.addPost);
admin_route.post("/delete-post",adminLoginAuth.isLogin,adminController.deletePost);
//uploadpostimage
module.exports=admin_route;