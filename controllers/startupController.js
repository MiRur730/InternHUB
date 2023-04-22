const Post =require("../models/postModel")
const express=require("express");
const { ObjectId }=require("mongodb");
const bodyParser=require("body-parser")
const config=require("../config/config");
const nodemailer= require("nodemailer");
const app=express();
app.use(bodyParser.urlencoded({ extended: true }));
const sendCommentMail =async(name,email,post_id)=>{
    try{
  const transporter=nodemailer.createTransport({
    host:'smtp.ethereal.email',
    port:587,
    auth:{
        user:'audreanne54@ethereal.email',
        pass: 'RjsJV99uumen9RpJuF'
    }
  })
  console.log("email of recipient is");
console.log(email);
const mailOptions={
    from: "BMS", // sender address
    to:email,
    subject:"New Reply",
    html:'<p>'+name+'has replied on your comment. <a href="http://127.0.0.1:3000/posts/'+post_id+'">Read your Replies here  </a> </p>'
}
transporter.sendMail(mailOptions,function(error,info){
    if(error){
        console.log("transporter sendmail error")  /////error
        console.log(error.message)
    }
    else{
        console.log("Email has been sent:-",info.response)
    }
})
//////
    }catch(e){
        console.log(e);
        console.log("do reply message error");
    }
}
const loadstartup=async(req,res)=>{
    try{
       const posts= await Post.find({});
        res.render("mainPage",{posts:posts});
    }catch(err){
        console.log(err);
        console.log("loadblog error")
    }
}

const loadPost=async(req,res)=>{
    try{
        const id=req.params.id;
        
       const post= await Post.findOne({"_id":id})
       
        res.render("post",{post:post});
    }catch(err){
        console.log(err);
        console.log("loadPost error")
    }
}

const addComment=async(req,res)=>{
    try{
       
        var post_id=req.body.post_id;
       console.log(post_id);
        var username=req.body.username;
       console.log(username);
        var email=req.body.email;
        var comment=req.body.comment;
        var comment_id = new ObjectId();
        
        await Post.findByIdAndUpdate({_id:post_id},{
            $push:{

                "comments":{_id:comment_id, username:username,email:email,comment:comment}
            }
            });
        
            
        res.status(200).send({success:true,msg:"comment added"})
    }catch(err){
        res.status(200).send({success:false,msg:err.message})
        console.log(err);
        console.log("addcomment post error");
    }
}

const doReply=async(req,res)=>{
    try{

        // first lets create reply id
       var reply_id= new ObjectId();
       console.log(req.body.post_id);
       console.log(req.body.comment_id);
       await Post.updateOne({
        

        "_id":new ObjectId(req.body.post_id),
        "comments._id": new ObjectId(req.body.comment_id)
       },{
$push:{
       "comments.$.replies":{
        _id:reply_id,name:req.body.name,reply:req.body.reply
       }
}
       })
       sendCommentMail(req.body.name,req.body.comment_email,req.body.post_id)
       res.status(200).send({success:true,msg:"Reply Added"});
    }catch(err){
        console.log(err);
        res.status(200).send({success:false,msg:err.message});
    }
}
module.exports={loadstartup,loadPost,addComment,doReply};