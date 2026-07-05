const express = require('express');
const Request = require('../models/request');
const router = express.Router();
const adminMiddleware = require("../middleware/adminMiddleware")

router.post("/addRequest", async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({ message: "Please enter your email" });
        }

    

        const newRequest = new Request({ email });
        await newRequest.save();
        res.status(201).json({ message: "Request submitted successfully" });
    } catch (error) {
        console.error("Error adding request:", error);
        res.status(500).json({ message: "Server Error", error: error.message });
    }
});

router.get("/getrequest",adminMiddleware, async (req, res) => {
    try {
        const allRequests = await Request.find();

        if (allRequests.length === 0) {
            return res.status(404).json({ message: "No Requests found" });
        }

        res.status(200).json(allRequests);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        });
    }
});

router.delete("/deleteRequest/:id",adminMiddleware, async (req, res) => {
    try {
        const deleteThat = await Request.findByIdAndDelete(req.params.id);
        if (!deleteThat) {
            return res.status(404).json({ message: "Request not found" });
        }
        res.status(200).json({ message: "Request deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error " , error })
    }
})

module.exports = router;