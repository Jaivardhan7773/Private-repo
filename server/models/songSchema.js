const mongoose = require("mongoose");
const songSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    lyrics: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    artist: {
        type: String,
        required: true,
        trim: true,
    },
    language: {
        type: String,
        default: "English",
      },
      hashtags: {
        type: [String],
        default: [],
      },
} , { timestamps: true , versionKey: false  } )

module.exports = mongoose.model("songlyrics", songSchema);