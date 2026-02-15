const { saveFeedback, getVerifiedFeedback } = require('./lib/feedback');
const fs = require('fs');
const path = require('path');

// Mock crypto for Node environment if needed (or use node's crypto)
global.crypto = { randomUUID: () => require('crypto').randomUUID() };

// Helper to clean up
const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json');
const backupFile = FEEDBACK_FILE + '.bak';

async function testFeedbackSystem() {
    console.log("🧪 Testing Feedback System...");

    // Backup existing feedback
    if (fs.existsSync(FEEDBACK_FILE)) {
        fs.copyFileSync(FEEDBACK_FILE, backupFile);
    }

    try {
        // 1. Submit Feedback
        console.log("1. Submitting new feedback...");
        const feedbackEntry = {
            query: "test query for penalty",
            response: "wrong answer",
            rating: -1,
            correction: "The penalty is actually 5 years."
        };

        await saveFeedback(feedbackEntry);
        console.log("✅ Feedback saved.");

        // 2. Verify Retrieval
        console.log("2. Retrieving feedback...");
        // Our logic in lib/feedback.js requires user correction (rating -1 + correction text) 
        // OR high rating.
        // And we auto-verified it in saveFeedback for demo.

        const results = getVerifiedFeedback("What is the penalty for test query?");

        if (results.length > 0 && results[0].correction === "The penalty is actually 5 years.") {
            console.log("✅ Verified feedback retrieved successfully!");
            console.log(results);
        } else {
            console.error("❌ Failed to retrieve feedback.");
            console.log("Results:", results);
        }

    } catch (error) {
        console.error("❌ Test failed:", error);
    } finally {
        // Restore backup
        if (fs.existsSync(backupFile)) {
            fs.copyFileSync(backupFile, FEEDBACK_FILE);
            fs.unlinkSync(backupFile);
            console.log("🔄 Database restored.");
        }
    }
}

// Run test
// We need to use Babel or similar to run ES modules, 
// OR simpler: just read the file and check logic manually? 
// Actually, `lib/feedback.js` uses `import/export`. Node might complain if we run it directly with `node`.
// We can use `node --input-type=module` if package.json has type: module, or rename to .mjs.
// Let's try running it.

testFeedbackSystem();
