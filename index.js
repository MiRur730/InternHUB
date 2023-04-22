




const mongoose=require("mongoose");
mongoose.set('strictQuery', false);
mongoose.connect("mongodb://127.0.0.1:27017/internhub");

const express=require("express");
const app=express();

app.use(express.static(__dirname + '/public'));
const bodyParser=require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
//middleware
const isStartup= require("./middlewares/isStartup");
app.use(isStartup.isStartup)

const landingRoute=require("./routes/landingRoute");
app.use("/",landingRoute);
const userRoute=require("./routes/userRoute");
app.use("/",userRoute);




const adminRoute=require("./routes/adminRoute")
app.use("/",adminRoute);

const startupRoute=require("./routes/startupRoute")
app.use("/post",startupRoute);

app.listen(3000,function(req,res){
    console.log("Internhub Server is running");
})