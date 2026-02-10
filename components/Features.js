export default function Features() {
    const features = [
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'مصادر رسمية',
            description: 'معلومات مبنية على المدونة العامة للضرائب، قوانين CNSS، والجريدة الرسمية'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
            ),
            title: 'الآجال والالتزامات',
            description: 'نوضح لك المواعيد النهائية والالتزامات القانونية المحتملة'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
            ),
            title: 'تدقيق العقود',
            description: 'تحليل فوري لعقودك لتحديد المخاطر والالتزامات (جديد!)'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
            ),
            title: 'المخاطر والعقوبات',
            description: 'نشرح العقوبات المحتملة حسب القانون المغربي'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                </svg>
            ),
            title: 'دردشة بسيطة',
            description: 'اطرح سؤالك بالدارجة أو العربية واحصل على إجابة مفهومة'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
            ),
            title: 'خصوصية تامة',
            description: 'لا نخزن أي معلومات شخصية أو أسئلة'
        },
        {
            icon: (
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
            ),
            title: 'سريع ومجاني',
            description: 'احصل على إجابات فورية بدون تسجيل أو دفع'
        }
    ]

    return (
        <section id="features" className="py-24 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                {/* Section Header */}
                <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold mb-4">
                        <span className="gradient-text">كيفاش كنخدمو؟</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto">
                        مساعد ذكي يعطيك معلومات قانونية عامة بناءً على القانون المغربي
                    </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {features.map((feature, index) => (
                        <div key={index} className="feature-card group">
                            <div className="w-14 h-14 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center mb-4 group-hover:bg-green-500/20 transition-colors">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-white">
                                {feature.title}
                            </h3>
                            <p className="text-gray-400 leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Warning Box */}
                <div className="mt-16 p-6 rounded-2xl bg-yellow-500/10 border border-yellow-500/20">
                    <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-yellow-500/20 text-yellow-500 flex items-center justify-center flex-shrink-0">
                            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h4 className="text-lg font-bold text-yellow-500 mb-2">
                                تنبيه مهم
                            </h4>
                            <p className="text-gray-300 leading-relaxed">
                                هذه الخدمة تقدم <strong className="text-yellow-400">معلومات قانونية عامة فقط</strong> ولا تشكل استشارة قانونية.
                                للحصول على استشارة قانونية رسمية، يُرجى التواصل مع محامٍ معتمد.
                                المعلومات قد تختلف حسب تفاصيل كل حالة.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
