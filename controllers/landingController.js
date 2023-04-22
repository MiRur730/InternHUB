
const loadHome=async(req,res)=>{
    try{
   res.render("index.ejs");
    }catch(e){
        res.send(e);
        console.log("LoadHome error");
    }
}

module.exports={loadHome};