const CompanySetting=require("../models/companySettingModel");

const isStartup=async(req,res,next)=>{
    try{
        const companySetting= await CompanySetting.find({});

        if(companySetting.length == 0 && req.originalUrl != "/startup-setup"){
            res.redirect("/startup-setup") //initial
            // res.render("admin/startup-setup");                                   // i have made changes here
        }

        else{
           
             next();
        }
    }
    catch(error){
        console.log("companysettingsetting error");
    }
}

module.exports=
{
    isStartup
};