// const {defaultConfiguration} =require("../routes/userRoute");
const bcrypt=require("bcrypt");
const User =require("../models/userModel");
//for forget and send mail
const nodemailer=require("nodemailer");
const randomstring=require("randomstring");
const config=require("../config/config")
var isLogin=0;
const adminLoginAuth=require("../middlewares/adminLoginAuth");

const securePassword=async(password,value)=>{
    try{
   const passwordHash= await bcrypt.hash(password,value);
   return passwordHash;
    }catch(err){
        console.log(err)
        console.log("Secure password error");
    }

};


const sendResetPasswordMail=async(name,email,token)=>{
    try{

        const transporter = nodemailer.createTransport({
            host: 'smtp.ethereal.email',
            port: 587,
            auth: {
                user: 'merle.corwin@ethereal.email',
                pass: 'rC3rvKEtUG6yaZADn1'
            }
        });

        const mailOptions={
            from: "merle.corwin@ethereal.email", // sender address
            to: email,
            subject:"For reset password",
            html:"<p> Hii "+name+",please click the link <a href=http://localhost:3000/reset-password?token="+token+">Reset</a>your password.</p>"
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

    }catch(err){
        console.log(err);
        console.log("passwordsendmail error");
    }
}
//loadlogin
const loadLogin=async(req,res)=>{    

    try{
        if(req.session.user_id && req.session.is_admin == 1){
            res.redirect("/dashboard");
           
            }
            else{
                res.render("login");  //initial only this
            }
        
           
        
           
        

    }catch(err){
        console.log(err)
        console.log("load login error");
    }
}

//verifylogin

const  verifyLogin=async(req,res)=>{
    try{
       const email=req.body.email; //we filled
       const password=req.body.password; //we filled
      const userData=await User.findOne({email:email});

      if(userData){
const passwordMatch=  await bcrypt.compare(password,userData.password)                                                                              //////i have made some changes here directly login karke create post
      if(passwordMatch){ //we have to store session
           req.session.user_id =userData._id;
           req.session.is_admin= userData.is_admin;
        isLogin=true;
        if(userData.is_admin ==1){
            // res.redirect("/dashboard");  
            res.render("admin/dashboard");

                                                              // instead of sending dashboard i am rendering creat post dir
        }
        
      }
      else{
        res.render("login",{message: "Please check your email or password"});
      }
      }else{
        res.render("login",{message: "Please check your email or password"});
      }

            }catch(err){
                console.log(err);
                console.log("verifylogin error");
            }
}
///user profile
const profile=async(req,res)=>{
    try{
res.render("profile");
    }
    catch(err){
        console.log(err);
        console.log("profile error");
    }
}


//logout user

const logout=async(req,res)=>{
    try{
req.session.destroy();
res.redirect("/login")
    }catch(err){
        console.log(err);
        console.log("logout error");
    }
}

//forget
const loadForget=async(req,res)=>{
    try{

res.render("forget-password")
    }catch(err){
        console.log(err);
        console.log("forgetload error");
    }
}

const forgetPasswordVerify=async(req,res)=>{
    try{
     const email = req.body.email;
     const userData = await User.findOne({email:email});
     if(userData){

        ///token generate //token set in userModel
    const randomString=randomstring.generate();
     await User.updateOne({email:email},{$set:{token:randomString}});
     sendResetPasswordMail(userData.name,userData.email,randomString);
     res.render("forget-password",{message:"Please check your mail "})
        }
     
     
     else{
        res.render("forget-password",{message:"Incorrect email "});
     }
    }
    catch(err){
        console.log(err);
        console.log("forgetapasswordverify error");
    }
}



//resetPasswordLoad

const resetPasswordLoad=async(req,res)=>{
    try{
        const token=req.query.token;
        ///testing token if token matches then ony load reset and allow to change password
      const tokenData=await  User.findOne({token:token})
      if(tokenData){
        //sent id in hidden
        res.render("resetPassword",{user_id:tokenData._id});
      }else{
        res.render("404");
      }

    }catch(err){
        console.log(err);
        console.log("Resetpasswordload error");
    }
}
const changedPassword=async(req,res)=>{
    try{
        const password=req.body.password;
        console.log(password);
        const user_id=req.body.user_id;
        const secure_password= await securePassword(password,10);
        console.log(secure_password);
        const updatedData=await User.findByIdAndUpdate({_id:user_id},{$set:{password:secure_password,token:" "}})
   res.redirect("/login");
    }catch(err){
        console.log(err);
        console.log("Resetpasswordload post error");
    }
}
module.exports={
    loadLogin,verifyLogin,profile,logout,loadForget,forgetPasswordVerify,resetPasswordLoad,changedPassword
};