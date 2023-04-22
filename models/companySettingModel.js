const mongoose=require("mongoose");

const companySchema= new mongoose.Schema({
    company_id:{
        type:String,
        // required:true
    },
    cofounder:{
        type:String,
        required:true
    },
    Cname:{
        type:String,
        default:" "
    },
    // image:{
    //     type:String,
    //     default:" "
    // },
    hiringcontent:{
        type:String,
        required:true
    },
    Description:{
        type:String,
        default:" "
    },
   Achievments:{
        type:String,
        default:" "
    },
    Contact:{
        type:String,
        default:" "
    }

    // comments:{
    //     type:Schema.Types.ObjectId,
    //     ref:"Comment" //refernec to other model
    // }
});

module.exports=mongoose.model("companySetting",companySchema);


    
    
    