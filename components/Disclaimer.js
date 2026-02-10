export default function Disclaimer({ variant = 'default' }) {
    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-2 text-yellow-500/80 text-sm">
                <svg className="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <span>هذه معلومات عامة وليست استشارة قانونية</span>
            </div>
        )
    }

    return (
        <div className="p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/20">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-yellow-500/20 text-yellow-500 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                </div>
                <div>
                    <h4 className="font-bold text-yellow-500 mb-1">تنبيه مهم</h4>
                    <p className="text-gray-300 text-sm leading-relaxed">
                        هذه المعلومات ذات طابع إعلامي فقط ولا تشكل استشارة قانونية.
                        للحصول على استشارة قانونية، يُرجى التواصل مع محامٍ معتمد.
                    </p>
                </div>
            </div>
        </div>
    )
}
