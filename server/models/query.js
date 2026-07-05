const mongoose = require("mongoose")
const querySchema = new mongoose.Schema({
    name:String ,
    email :{type:String , required:true},
    description : {type:String , required:true}
} , {versionKey : false ,
    timestamps : true
});
module.exports = mongoose.model("blogquery" , querySchema);