import pdf from "pdf-parse";

export async function POST(req) {
    try {
        const formData = await req.formData();
        const file = formData.get("file");

        if (!file) {
            return new Response(JSON.stringify({ error: "No file uploaded" }), { status: 400 });
        }

        const arrayBuffer = await file.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);

        const data = await pdf(buffer);
        const contractText = (data.text || "").trim();

        if (contractText.length < 50) {
            return new Response(JSON.stringify({ error: "PDF vide ou texte non détectable (scan image?)" }), { status: 400 });
        }

        return new Response(JSON.stringify({ contractText }), {
            headers: { "Content-Type": "application/json" },
        });
    } catch (e) {
        console.error("PDF Extraction Error:", e);
        return new Response(JSON.stringify({ error: "Erreur extraction PDF" }), { status: 500 });
    }
}
