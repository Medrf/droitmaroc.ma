const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// Mock content of feedback.js logic for testing
const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback_test.json');

function saveFeedback(newEntry) {
    let feedbackList = [];
    if (fs.existsSync(FEEDBACK_FILE)) {
        feedbackList = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));
    }

    const entry = {
        id: crypto.randomUUID(),
        ...newEntry,
        timestamp: new Date().toISOString(),
        status: 'pending_review'
    };

    // Auto-verify logic mirroring lib/feedback.js
    if (entry.rating === 1) {
        entry.status = 'verified';
    }
    if (entry.rating === -1 && entry.correction) {
        entry.status = 'verified';
    }

    feedbackList.push(entry);
    fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackList, null, 2), 'utf-8');
    return entry;
}

function getVerifiedFeedback(query) {
    if (!fs.existsSync(FEEDBACK_FILE)) return [];

    const feedbackList = JSON.parse(fs.readFileSync(FEEDBACK_FILE, 'utf-8'));

    const relevantFeedback = feedbackList.filter(item => {
        return item.status === 'verified' &&
            item.correction &&
            item.correction.length > 5;
    });

    const queryTerms = query.toLowerCase().split(/\s+/).filter(w => w.length > 3);

    return relevantFeedback.filter(item => {
        const itemQuery = item.query.toLowerCase();
        // detailed match: if 50% of terms match
        const matches = queryTerms.filter(term => itemQuery.includes(term));
        return matches.length >= Math.max(1, queryTerms.length * 0.5);
    }).map(item => ({
        original_query: item.query,
        correction: item.correction
    }));
}

// Test Run
async function run() {
    console.log("🧪 Testing Feedback Logic...");

    // Cleanup
    if (fs.existsSync(FEEDBACK_FILE)) fs.unlinkSync(FEEDBACK_FILE);

    // 1. Save
    const feedbackEntry = {
        query: "test query for penalty",
        response: "wrong answer",
        rating: -1,
        correction: "The penalty is actually 5 years."
    };
    saveFeedback(feedbackEntry);
    console.log("✅ Feedback saved.");

    // 2. Retrieve
    const retrieved = getVerifiedFeedback("What is the penalty for test query?");
    if (retrieved.length > 0 && retrieved[0].correction === feedbackEntry.correction) {
        console.log("✅ Logic Verified: Retrieved correct feedback.");
    } else {
        console.error("❌ Logic Failed: Could not retrieve feedback.");
        console.log("Retrieved:", retrieved);
    }

    // Cleanup
    if (fs.existsSync(FEEDBACK_FILE)) fs.unlinkSync(FEEDBACK_FILE);
}

run();
