'use client'

import { SignUp } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignUpPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/20 to-blue-600/20" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2310b981' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                    {/* Logo */}
                    <Link href="/" className="mb-12">
                        <img
                            src="/logo.png"
                            alt="Loidumaroc"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>

                    {/* Headline */}
                    <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                        Rejoignez
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
                            Loidumaroc
                        </span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-10 max-w-md">
                        Créez votre compte gratuitement et accédez à l'ensemble de nos services juridiques.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Inscription gratuite et rapide</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Assistant IA disponible 24h/24</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Audit et génération de contrats</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Sign Up Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
                {/* Mobile Logo */}
                <Link href="/" className="lg:hidden mb-8">
                    <img
                        src="/logo.png"
                        alt="Loidumaroc"
                        className="h-16 w-auto object-contain"
                    />
                </Link>

                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Créer un compte</h2>
                        <p className="text-slate-400">Commencez votre essai gratuit aujourd'hui</p>
                    </div>

                    <SignUp
                        routing="hash"
                        appearance={{
                            variables: {
                                colorPrimary: '#10b981',
                                colorBackground: '#1e293b',
                                colorInputBackground: '#0f172a',
                                colorInputText: '#f8fafc',
                                colorText: '#f8fafc',
                                colorTextSecondary: '#94a3b8',
                                borderRadius: '0.75rem',
                                fontFamily: 'Inter, system-ui, sans-serif',
                            },
                            elements: {
                                rootBox: 'w-full',
                                card: 'bg-slate-800/50 backdrop-blur-sm border border-slate-700/50 shadow-2xl rounded-2xl p-2',
                                headerTitle: 'hidden',
                                headerSubtitle: 'hidden',
                                socialButtonsBlockButton: 'bg-slate-700/50 border border-slate-600/50 text-white hover:bg-slate-600/50 hover:border-slate-500 transition-all duration-200 rounded-xl py-3',
                                socialButtonsBlockButtonText: 'text-white font-medium',
                                socialButtonsProviderIcon: 'w-5 h-5',
                                dividerLine: 'bg-slate-600/50',
                                dividerText: 'text-slate-500 text-sm',
                                formFieldLabel: 'text-slate-300 font-medium text-sm mb-1.5',
                                formFieldInput: 'bg-slate-900/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 rounded-xl py-3 px-4 transition-all duration-200',
                                formButtonPrimary: 'bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-semibold rounded-xl py-3 shadow-lg shadow-emerald-500/25 transition-all duration-200',
                                footerActionLink: 'text-emerald-400 hover:text-emerald-300 font-medium transition-colors',
                                footerActionText: 'text-slate-400',
                                identityPreviewText: 'text-white',
                                identityPreviewEditButton: 'text-emerald-400 hover:text-emerald-300',
                                formFieldInputShowPasswordButton: 'text-slate-400 hover:text-white',
                                otpCodeFieldInput: 'bg-slate-900/50 border-slate-600/50 text-white rounded-xl',
                                formResendCodeLink: 'text-emerald-400 hover:text-emerald-300',
                                alert: 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl',
                                alertText: 'text-red-300 text-sm',
                                footer: 'hidden',
                            }
                        }}
                        signInUrl="/sign-in"
                        fallbackRedirectUrl="/dashboard"
                    />

                    {/* Custom Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Vous avez déjà un compte ?{' '}
                            <Link href="/sign-in" className="text-emerald-400 hover:text-emerald-300 font-medium transition-colors">
                                Se connecter
                            </Link>
                        </p>
                    </div>

                    <div className="mt-8 text-center">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-slate-500 hover:text-slate-300 text-sm transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            Retour à l'accueil
                        </Link>
                    </div>
                </div>

                {/* Footer */}
                <div className="mt-auto pt-8 text-center">
                    <p className="text-slate-600 text-xs">
                        © 2024 Loidumaroc.ma - Tous droits réservés
                    </p>
                </div>
            </div>
        </div>
    )
}
