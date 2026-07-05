const mongoose = require('mongoose');
const AuthSchema = new mongoose.Schema({
    name: {type  :String , required:true},
    email:  { type: String, unique: true, required: true, lowercase: true, trim: true },
    password: { type: String, required: true }, 
    phone: { type: String, required: true , unique : true , trim :true},
    gender: { type: String, enum: ["male", "female", "other"], required: true },
    isAdmin: { type: Boolean, default: false },
    isEditor: { type: Boolean, default: false },
    profileImage: { type: String, default: "" },
  }, { versionKey: false });

module.exports= mongoose.model('newAuth', AuthSchema);