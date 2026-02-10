'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useLanguage } from '@/lib/language'

export default function SignupPage() {
    const { language } = useLanguage()

    return (
        <div className="min-h-screen bg-[#0F172A] flex flex-col">
            {/* Header */}
            <header className="py-6 px-4">
                <div className="max-w-md mx-auto">
                    <Link href="/" className="flex items-center justify-center">
                        <Image
                            src="/logo.png"
                            alt="droitmaroc"
                            width={160}
                            height={40}
                            className="h-10 w-auto object-contain"
                            priority
                        />
                    </Link>
                </div>
            </header>

            {/* Signup Form */}
            <main className="flex-1 flex items-center justify-center px-4 py-12">
                <div className="w-full max-w-md">
                    <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8">
                        <h1 className="text-2xl font-bold text-white text-center mb-2">
                            {language === 'ar' ? 'إنشاء حساب' : 'Créer un compte'}
                        </h1>
                        <p className="text-slate-400 text-center text-sm mb-8">
                            {language === 'ar'
                                ? 'أنشئ حسابك للوصول إلى جميع الخدمات'
                                : 'Créez votre compte pour accéder à tous les services'}
                        </p>

                        <form className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    {language === 'ar' ? 'الاسم الكامل' : 'Nom complet'}
                                </label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                                    placeholder={language === 'ar' ? 'أدخل اسمك الكامل' : 'Entrez votre nom'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    {language === 'ar' ? 'البريد الإلكتروني' : 'Email'}
                                </label>
                                <input
                                    type="email"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                                    placeholder={language === 'ar' ? 'أدخل بريدك الإلكتروني' : 'Entrez votre email'}
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-slate-300 mb-2">
                                    {language === 'ar' ? 'كلمة المرور' : 'Mot de passe'}
                                </label>
                                <input
                                    type="password"
                                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-slate-500 transition-colors"
                                    placeholder="••••••••"
                                />
                            </div>

                            <Link
                                href="/dashboard"
                                className="w-full py-3 bg-slate-700 hover:bg-slate-600 border border-slate-600 text-white font-semibold rounded-lg transition-all flex items-center justify-center"
                            >
                                {language === 'ar' ? 'إنشاء حساب' : 'Créer mon compte'}
                            </Link>
                        </form>

                        <div className="mt-6 text-center">
                            <p className="text-sm text-slate-400">
                                {language === 'ar' ? 'لديك حساب بالفعل؟' : 'Déjà un compte ?'}{' '}
                                <Link href="/login" className="text-white hover:underline font-medium">
                                    {language === 'ar' ? 'تسجيل الدخول' : 'Se connecter'}
                                </Link>
                            </p>
                        </div>
                    </div>

                    <div className="mt-8 text-center">
                        <Link href="/" className="text-sm text-slate-500 hover:text-slate-400 transition-colors">
                            ← {language === 'ar' ? 'العودة إلى الصفحة الرئيسية' : 'Retour à l\'accueil'}
                        </Link>
                    </div>
                </div>
            </main>
        </div>
    )
}
