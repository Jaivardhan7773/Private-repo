const express = require('express');
const Query = require("../models/query");
const { authMiddleware, aadminMiddleware } = require("../middleware/useAuthStore");
const router = express.Router();
router.post("/addQuery", async (req, res) => {
    try {
        let { name, email, description } = req.body;

        if (!name || !email || !description) {
            return res.status(400).json({ message: "All fields are mendatory" })
        }

        const newQuery = new Query({ name, email, description });
        await newQuery.save();
        res.status(200).json({ message: "Query Submitted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "Server Error", error })
    }
});

router.get("/getQuery",authMiddleware, aadminMiddleware  , async (req, res) => {
    try {
        const allQueries = await Query.find();

        if (allQueries.length === 0) {
            return res.status(404).json({ message: "No queries found" });
        }

        res.status(200).json(allQueries);
    } catch (error) {
        res.status(500).json({
            message: "Server Error",
            error
        });
    }
});

router.delete("/deleteQuery/:id", authMiddleware, aadminMiddleware  ,async (req, res) => {
    try {
        const deleteThat = await Query.findByIdAndDelete(req.params.id);
        if (!deleteThat) {
            return res.status(404).json({ message: "Query not found" });
        }
        res.status(200).json({ message: "Query deleted successfully" });
    }
    catch (error) {
        res.status(500).json({ message: "internal server error " , error })
    }
})

module.exports = router;