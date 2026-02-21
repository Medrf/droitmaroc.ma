import { AlertTriangle } from 'lucide-react'

export default function Disclaimer({ variant = 'default' }) {
    if (variant === 'compact') {
        return (
            <div className="flex items-center gap-2 text-amber-500/80 text-sm">
                <AlertTriangle className="w-4 h-4 flex-shrink-0" />
                <span>هذه معلومات عامة وليست استشارة قانونية</span>
            </div>
        )
    }

    return (
        <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20">
            <div className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-lg bg-amber-500/20 text-amber-500 flex items-center justify-center flex-shrink-0">
                    <AlertTriangle className="w-5 h-5" />
                </div>
                <div>
                    <h4 className="font-bold text-amber-500 mb-1">تنبيه مهم</h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                        هذه المعلومات ذات طابع إعلامي فقط ولا تشكل استشارة قانونية.
                        للحصول على استشارة قانونية، يُرجى التواصل مع محامٍ معتمد.
                    </p>
                </div>
            </div>
        </div>
    )
}
