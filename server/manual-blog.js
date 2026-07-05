const mongoose = require('mongoose');
const { runAutoBlogWorkflow } = require('./services/autoBlogService');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI;

console.log("Starting Manual Blog Generation...");

const fs = require('fs');

mongoose.connect(MONGO_URI)
    .then(async () => {
        console.log("MongoDB connected for manual run.");

        try {
            await runAutoBlogWorkflow();
            console.log("Manual run finished successfully.");
            fs.writeFileSync('manual_debug.log', 'SUCCESS: Manual run finished.');
        } catch (err) {
            console.error("Manual run encountered an error:", err);
            fs.writeFileSync('manual_debug.log', `ERROR: ${err.message}\n${err.stack}`);
        } finally {
            await mongoose.disconnect();
            console.log("MongoDB disconnected.");
            process.exit(0);
        }
    })
    .catch((e) => {
        console.error("MongoDB connection error:", e);
        fs.writeFileSync('manual_debug.log', `CONNECTION ERROR: ${e.message}`);
        process.exit(1);
    });
