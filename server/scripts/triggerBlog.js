require('dotenv').config();
const dns = require('dns');
// Set public DNS fallback so mongodb+srv SRV lookup succeeds reliably across all ISPs
try {
    dns.setServers(['8.8.8.8', '1.1.1.1']);
} catch (e) {
    // ignore
}
const mongoose = require('mongoose');
const { runAutoBlogWorkflow } = require('../services/autoBlogService');

async function trigger() {
    console.log('--- Triggering Auto-Blog Generation Pipeline ---');
    if (!process.env.MONGO_URI) {
        console.error('Error: MONGO_URI is not defined in .env');
        process.exit(1);
    }
    
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected. Executing autoBlogService pipeline...');
        
        await runAutoBlogWorkflow();
        
        console.log('--- Pipeline Execution Finished Successfully! ---');
    } catch (error) {
        console.error('Execution Error:', error);
    } finally {
        await mongoose.disconnect();
        console.log('MongoDB Disconnected.');
    }
}

trigger();
