import { saveFeedback } from '@/lib/feedback';

export async function POST(request) {
    try {
        const feedback = await request.json();

        // Basic validation
        if (!feedback.query || !feedback.response || !feedback.rating) {
            return Response.json(
                { success: false, error: 'Missing required fields' },
                { status: 400 }
            );
        }

        const savedEntry = await saveFeedback(feedback);

        return Response.json({ success: true, data: savedEntry });
    } catch (error) {
        console.error('Error saving feedback:', error);
        return Response.json(
            { success: false, error: 'Internal Server Error' },
            { status: 500 }
        );
    }
}
