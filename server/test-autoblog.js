const fs = require('fs');
const { runAutoBlogWorkflow } = require('./services/autoBlogService');
require('dotenv').config();

const logFile = 'result.json';

function logResult(status, message) {
    const data = JSON.stringify({ status, message, timestamp: new Date().toISOString() }, null, 2);
    fs.writeFileSync(logFile, data);
}

console.log("DEBUG: Script started");
logResult('STARTED', 'Script started');

runAutoBlogWorkflow().then(() => {
    console.log("Manual test workflow complete.");
    // We can't easily know if it actually saved a blog unless the service returns something, 
    // but the service logs to console. 
    // Let's assume if it didn't throw, it finished. 
    // Ideally service should return the blog or status. 
    // But for now, let's just say "Workflow function finished".
    logResult('COMPLETED', 'Workflow execution finished (check DB or console if visible)');
    process.exit(0);
}).catch(err => {
    console.error("Manual test failed:", err);
    logResult('ERROR', err.message || JSON.stringify(err));
    process.exit(1);
});
