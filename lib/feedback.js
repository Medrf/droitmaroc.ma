import fs from 'fs';
import path from 'path';

const FEEDBACK_FILE = path.join(process.cwd(), 'data', 'feedback.json');

// Ensure the file exists
if (!fs.existsSync(FEEDBACK_FILE)) {
    fs.mkdirSync(path.dirname(FEEDBACK_FILE), { recursive: true });
    fs.writeFileSync(FEEDBACK_FILE, '[]', 'utf-8');
}

export async function saveFeedback(newEntry) {
    try {
        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
        const feedbackList = JSON.parse(fileContent);

        const entry = {
            id: crypto.randomUUID(),
            ...newEntry,
            timestamp: new Date().toISOString(),
            status: 'pending_review' // Default status
        };

        // Auto-verify for now for demonstration purposes, or if rating is high
        if (entry.rating === 1) {
            entry.status = 'verified'; // Trust positive feedback? strictly speaking no, but for "learning" from corrections, we need the correction.
        }
        // If it's a correction (rating -1 and has correction), we might want to auto-verify it for this demo
        // In a real app, this would be 'pending_review'
        if (entry.rating === -1 && entry.correction) {
            entry.status = 'verified'; // Auto-trust user corrections for this demo
        }

        feedbackList.push(entry);
        fs.writeFileSync(FEEDBACK_FILE, JSON.stringify(feedbackList, null, 2), 'utf-8');
        return entry;
    } catch (error) {
        console.error("Error in saveFeedback:", error);
        throw error;
    }
}

export function getVerifiedFeedback(query) {
    try {
        if (!fs.existsSync(FEEDBACK_FILE)) return [];

        const fileContent = fs.readFileSync(FEEDBACK_FILE, 'utf-8');
        const feedbackList = JSON.parse(fileContent);

        // Filter for verified corrections
        // We look for feedback where rating is -1 (so there was a correction) OR just any verified useful info.
        // Actually, "learning" comes from CORRECTIONS. 
        // So we look for: status='verified' AND presence of 'correction'.

        const relevantFeedback = feedbackList.filter(item => {
            return item.status === 'verified' &&
                item.correction &&
                item.correction.length > 5;
        });

        // Simple similarity check (keyword matching)
        // In a real app, use embeddings. Here, we'll check if the past query has significant word overlap with current query
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

    } catch (error) {
        console.error("Error in getVerifiedFeedback:", error);
        return [];
    }
}
