const express = require("express");
const Carousel = require("../models/carousel");
const  adminMiddleware  = require("../middleware/adminMiddleware") 
const { authMiddleware, aadminMiddleware } = require("../middleware/useAuthStore");
const router = express.Router();

router.post("/addCar" ,authMiddleware, aadminMiddleware  , async (req , res) => {
    try {
        const { title, image, description } = req.body;
        if (!title || !image || !description) {
            return res.status(400).json({ message: "All fields are required!" });
        }

        const newCar = new Carousel({ title, image, description });
        await newCar.save();
        res.status(201).json({ message: "Carousel item added!", data: newCar });
    } catch (error) {
        res.status(500).json({ message: "Server error!", error });
    }
});
router.get("/allCars", async (req, res) => {
    try {
        const cars = await Carousel.find();
        res.status(200).json(cars);
    } catch (error) {
        res.status(500).json({ message: "Server error!", error });
    }
});

router.put("/updatecar/:id" ,authMiddleware, aadminMiddleware  , async (req , res) => {
    try{
        const {title , description , image} = req.body;
        const updatecar = await Carousel.findByIdAndUpdate(req.params.id , {title , description , image}, {new:true});
        if(!updatecar){
            res.status(404).json({message:"carousel not found"})
        }
        res.status(200).json({message:"carousel updated successfully" , data : updatecar});
    }
    catch(error){
        res.status(500).json({message:"server error" , error})
    }
});

router.delete("/deletecar/:id" ,authMiddleware, aadminMiddleware  , async (req , res) => {
    try{
        const {title , image , description} = req.body;
        const deletecar = await Carousel.findByIdAndDelete(req.params.id);
        if(!deletecar){
            res.status(404).json({message:"carousel not found"});
        }
        res.status(200).json({message:"carousel deleted successfully"});
    }
    catch(error){
        res.status(500).json({message:"internal server error" , error})
    }
})
module.exports = router;