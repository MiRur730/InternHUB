const express=require("express");
const startup_route =express();

startup_route.set("view engine","ejs");
startup_route.set("views","./views");


startup_route.use(express.static("public"));

const startupController=require("../controllers/startupController");
startup_route.get("/",startupController.loadstartup);              // i made change here
startup_route.get("/posts/:id",startupController.loadPost);
startup_route.post("/add-comment",startupController.addComment);
startup_route.post("/do-reply",startupController.doReply);
module.exports=startup_route;