const mongoose = require("mongoose");
const requestSchema = new mongoose.Schema({
    email : {type : String ,  required: true, lowercase: true, trim: true }
}, { versionKey: false , timestamps:true});
module.exports = mongoose.model("request" , requestSchema);
