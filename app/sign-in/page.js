'use client'

import { SignIn } from '@clerk/nextjs'
import Link from 'next/link'

export default function SignInPage() {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex">
            {/* Left Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
                {/* Background Pattern */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-emerald-600/20" />
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%234f46e5' fill-opacity='0.08'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />

                <div className="relative z-10 flex flex-col justify-center px-12 xl:px-20">
                    {/* Logo */}
                    <Link href="/" className="mb-12">
                        <img
                            src="/logo.png"
                            alt="droitmaroc"
                            className="h-20 w-auto object-contain"
                        />
                    </Link>

                    {/* Headline */}
                    <h1 className="text-4xl xl:text-5xl font-bold text-white mb-6 leading-tight">
                        Votre assistant juridique
                        <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
                            intelligent
                        </span>
                    </h1>

                    <p className="text-lg text-slate-300 mb-10 max-w-md">
                        Accédez à des informations juridiques fiables basées sur le droit marocain, 24h/24 et 7j/7.
                    </p>

                    {/* Features */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Réponses basées sur le cadre juridique marocain</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Données sécurisées et confidentielles</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-slate-300">Réponses instantanées et précises</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right Panel - Sign In Form */}
            <div className="w-full lg:w-1/2 flex flex-col items-center justify-center px-6 py-12">
                {/* Mobile Logo */}
                <Link href="/" className="lg:hidden mb-8">
                    <img
                        src="/logo.png"
                        alt="droitmaroc"
                        className="h-16 w-auto object-contain"
                    />
                </Link>

                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-bold text-white mb-2">Bienvenue</h2>
                        <p className="text-slate-400">Connectez-vous pour accéder à votre espace</p>
                    </div>

                    <SignIn
                        routing="hash"
                        appearance={{
                            variables: {
                                colorPrimary: '#3b82f6',
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
                                formFieldInput: 'bg-slate-900/50 border-slate-600/50 text-white placeholder:text-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 rounded-xl py-3 px-4 transition-all duration-200',
                                formButtonPrimary: 'bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white font-semibold rounded-xl py-3 shadow-lg shadow-blue-500/25 transition-all duration-200',
                                footerActionLink: 'text-blue-400 hover:text-blue-300 font-medium transition-colors',
                                footerActionText: 'text-slate-400',
                                identityPreviewText: 'text-white',
                                identityPreviewEditButton: 'text-blue-400 hover:text-blue-300',
                                formFieldInputShowPasswordButton: 'text-slate-400 hover:text-white',
                                otpCodeFieldInput: 'bg-slate-900/50 border-slate-600/50 text-white rounded-xl',
                                formResendCodeLink: 'text-blue-400 hover:text-blue-300',
                                alert: 'bg-red-500/10 border border-red-500/20 text-red-300 rounded-xl',
                                alertText: 'text-red-300 text-sm',
                                footer: 'hidden',
                            }
                        }}
                        signUpUrl="/sign-up"
                        fallbackRedirectUrl="/dashboard"
                    />

                    {/* Custom Footer */}
                    <div className="mt-6 text-center">
                        <p className="text-slate-400 text-sm">
                            Pas encore de compte ?{' '}
                            <Link href="/sign-up" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                                Créer un compte
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
                        © 2024 droitmaroc.ma - Tous droits réservés
                    </p>
                </div>
            </div>
        </div>
    )
}
