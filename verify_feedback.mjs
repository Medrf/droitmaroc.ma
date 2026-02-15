import { saveFeedback, getVerifiedFeedback } from './lib/feedback.js';
import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

// Setup global crypto for randomUUID
if (!global.crypto) {
    global.crypto = { randomUUID: () => crypto.randomUUID() };
}

// Helper to clean up
const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json');
const backupFile = FEEDBACK_FILE + '.bak';

async function testFeedbackSystem() {
    console.log("🧪 Testing Feedback System...");

    // Backup existing feedback
    if (fs.existsSync(FEEDBACK_FILE)) {
        fs.copyFileSync(FEEDBACK_FILE, backupFile);
    } else {
        // Create if not exists to avoid error on restore
        fs.writeFileSync(FEEDBACK_FILE, '[]');
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

        // Ensure feedback system sees the new entry
        // The implementation reads from file, so it should see it.
        const query = "What is the penalty for test query?";
        const results = getVerifiedFeedback(query);

        console.log(`Found ${results.length} results.`);

        if (results.length > 0 && results[0].correction === "The penalty is actually 5 years.") {
            console.log("✅ Verified feedback retrieved successfully!");
            console.log("Correction found:", results[0]);
        } else {
            console.error("❌ Failed to retrieve feedback.");
            console.log("Results:", results);
        }

    } catch (error) {
        console.error("❌ Test failed:", error);
    } finally {
        // Restore backup
        if (fs.existsSync(backupFile)) {
            // Check if original file existed before backup
            // If backup file acts as original content
            fs.copyFileSync(backupFile, FEEDBACK_FILE);
            fs.unlinkSync(backupFile);
            console.log("🔄 Database restored.");
        }
    }
}

testFeedbackSystem();
