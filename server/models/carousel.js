const mongoose = require('mongoose');
const CarSchema = new mongoose.Schema({
    title: String,
 image:String,
 description:String
  }, { versionKey: false });

module.exports= mongoose.model('Carousel', CarSchema);