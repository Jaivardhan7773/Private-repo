const express = require("express");
const songSchema = require("../models/songSchema");
const router = express.Router();
const  adminMiddleware  = require("../middleware/adminMiddleware") 
const { authMiddleware, aadminMiddleware } = require("../middleware/useAuthStore");

router.post("/admin/postlyrics", authMiddleware, aadminMiddleware , async (req, res) => {
    try {
        const { title, lyrics, artist, language, hashtags , image } = req.body;
        if (!title || !lyrics || !artist || !language || !hashtags || !image) {
            return res.status(400).json({ message: "Bad request , All the feilds are required" })
        }
        const formattedHashtags = Array.isArray(hashtags)
        ? hashtags
        : hashtags.split(",").map(tag => tag.trim());
        const newlyrics = new songSchema({ title, lyrics, artist, language,  hashtags: formattedHashtags , image });
        await newlyrics.save();
        return res.status(201).json({ message: "Lyrics added successfully!" });
    } catch (error) {
        return res.status(500).json({ message:  "server crashed , probably some error accured in songlyrics route"})
    }
});

router.get("/getlyrics" , async (req, res) => {
    try{
        const songs = await songSchema.find({}) ;
        return res.status(200).json(songs);
    }catch(error){
        return res.status(500).json({ message: "Error fetching songs" });
    }
});

router.delete("/deletelyrics/:id" , authMiddleware, aadminMiddleware , async (req , res) => {
    try{
        const { id } = req.params;
        const deletesong = await songSchema.findByIdAndDelete(id);
        if (!deletesong) {
            return res.status(404).json({ message: "Song  not found" });
        }
        return res.status(200).json({message : "lyrics deleted successfully"});
    }catch(error){
        return res.status(500).json({message: "server error !!!..."})
    }
});

module.exports = router;