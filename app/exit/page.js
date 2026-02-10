export default function ExitPage() {
    return (
        <div className="flex h-screen bg-[#0A0A0A] flex-col items-center justify-center p-4 text-center">
            <div className="w-24 h-24 rounded-full bg-green-500/10 flex items-center justify-center mb-8 animate-pulse">
                <svg className="w-12 h-12 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-4xl font-bold text-white mb-4">شكراً لاستخدامك المساعد القانوني</h1>
            <p className="text-gray-400 max-w-md mx-auto mb-10 text-lg">
                تم إنهاء الجلسة بنجاح. نتمنى أن تكون المعلومات المقدمة قد أفادتك.
                نحن دائماً هنا لمساعدتك في استفساراتك القانونية.
            </p>

            <div className="flex gap-4">
                <a
                    href="/chat"
                    className="px-8 py-3 bg-green-600 hover:bg-green-500 text-white rounded-xl font-medium transition-all transform hover:scale-105"
                >
                    بدء محادثة جديدة
                </a>
                <a
                    href="/"
                    className="px-8 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl font-medium transition-all"
                >
                    العودة للرئيسية
                </a>
            </div>
        </div>
    )
}
