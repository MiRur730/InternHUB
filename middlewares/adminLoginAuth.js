const isLogin=async(req,res,next)=>{
try{
if(req.session.user_id && req.session.is_admin == 1){

}
else{
    res.redirect("/login")                                    
}
next();

    }catch(err){
        console.log(err.message);
    }
}

const isLogout=async(req,res,next)=>{
    try{
        console.log("session user id");
        console.log(req.session.user_id);
        console.log(req.session.is_admin);
if(req.session.user_id && req.session.is_admin == 1){
    res.redirect("/dashboard");
   
    }
next();
    }catch(err){
        console.log("Bye");
        console.log(err.message);
    }
}

module.exports= {isLogin,isLogout}