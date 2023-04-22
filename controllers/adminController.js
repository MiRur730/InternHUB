const CompanySetting=require("../models/companySettingModel")
//blogsetting model=company

const User =require("../models/userModel");
const path=require("path");
const bcrypt=require("bcrypt");
const Post=require("../models/postModel");
const bodyParser=require("body-parser");



const securePassword=async(password)=>{
    try{
        console.log("secure password");
        console.log(password);
   const passwordHash= await bcrypt.hash(password,10);
   return passwordHash;
    }catch(err){
        console.log(err)
        console.log("Secure password error");
    }

}

                                                                    ////////////i have made changes here even if setup u can again setup 
//Admin-Blog-setup
const startupSetup=async(req,res)=>{
    try{
    var companySetting= await CompanySetting.find({});
    if(companySetting.length >0){
         res.redirect("/login")
        
    }
    
    else{
        res.render("startupSetup");
    }
    
    }
    
    catch(err){
        console.log(err.message);
        console.log("CompanySetting startupsetuperror")
    }
    }


    //Admin post blogsetupsave
const startupSetupSave=async(req,res)=>{
    try{
    
    const cofounder=req.body.cofounder;
    const Cname=req.body.Cname;
    const hiringcontent=req.body.hiringcontent;
    const email=req.body.email;
    const name=req.body.name;
    const  pass=await securePassword(req.body.password);
    
    // console.log(cofounder);
      
    // console.log(Cname);
      
    console.log(hiringcontent);
    const companySetting= new CompanySetting({
        cofounder:cofounder,
        hiringcontent:hiringcontent,
        Cname:Cname,
        Description:"This is best comapany",
        Achievments:"city award",
        Contact:"789876564"
    });
    
    await companySetting.save();
    
    const user=new User({
        name:name,
        email:email,
        password:pass,
        is_admin:1
    });
    
    const userData=await user.save();
    
    if(userData){
        res.redirect("/login");
    }
    else{
        res.render("startupSetup",{message:"Company not rendered"})
    }
    }catch(err){
        console.log(err.message);
        console.log("userData error");
    }
    }

    //admin dashboard;
const dashboard=async(req,res)=>{
    try{
        const allPost=Post.find({});
        res.render("admin/dashboard",{posts:allPost});
        
    }catch(err){
        console.log(err);
        console.log("dashboard error");
    }
}

//create post 
const loadPostDashboard=async(req,res)=>{
    try{
        const allPosts=await Post.find({});
             res.render("admin/postDashboard",{posts:allPosts});
    }
    catch(err){
        console.log(err)
        console.log("loadPostdashboard error");
    }
}

const deletePost=async(req,res)=>{
    try{
Post.deleteOne({_id:req.body.id});
res.status(200).send({success:true,msg:"Post deleted Sucessfully"})
    }catch(err){
        console.log(err);
        res.status(400).send({success:false,msg:err.message})
    }
}
// post post
const addPost=async(req,res)=>{
    try{

        var image="";
        if(req.body.image !== undefined){
            image=req.body.image;
        }
        const post =new Post({
             title:req.body.title,
             content: req.body.content,
             image:image
        });
       await post.save();
       res.render("admin/postDashboard",{message: "Successfully Post Added"});

       
    }catch(err){
        console.log(err);
        console.log("addpost error");
    }
}
module.exports={
    startupSetup,startupSetupSave,dashboard,loadPostDashboard,addPost,securePassword,deletePost
}