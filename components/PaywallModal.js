'use client'

import { X, Lock, CreditCard } from 'lucide-react'
import Link from 'next/link'

export default function PaywallModal({ isOpen, onClose, resetTime }) {
    if (!isOpen) return null

    // Format reset time
    const formattedReset = resetTime ? new Date(resetTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Minuit'

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm transition-all animate-in fade-in duration-200">
            <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden animate-in zoom-in-95 duration-200">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors"
                >
                    <X className="w-5 h-5" />
                </button>

                {/* Content */}
                <div className="p-8 text-center">
                    <div className="mx-auto w-16 h-16 bg-amber-500/10 rounded-full flex items-center justify-center mb-6">
                        <Lock className="w-8 h-8 text-amber-500" />
                    </div>

                    <h3 className="text-2xl font-bold text-white mb-2">Limite quotidienne atteinte</h3>
                    <p className="text-slate-400 mb-6">
                        Vous avez utilisé vos 7 crédits gratuits d’aujourd’hui.
                        Vos crédits seront réinitialisés à <span className="text-white font-medium">{formattedReset} UTC</span>.
                    </p>

                    <div className="space-y-3">
                        <Link
                            href="/pricing"
                            className="flex items-center justify-center w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-600 hover:from-amber-400 hover:to-orange-500 text-white rounded-xl font-medium transition-all shadow-lg shadow-amber-500/20 gap-2"
                        >
                            <CreditCard className="w-4 h-4" />
                            Voir les abonnements
                        </Link>

                        <button
                            onClick={onClose}
                            className="w-full py-3 px-4 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-medium transition-all"
                        >
                            Fermer
                        </button>
                    </div>
                </div>

                {/* Footer */}
                <div className="bg-slate-950/50 p-4 text-center border-t border-slate-800">
                    <p className="text-xs text-slate-500">
                        Passez à la version Pro pour 200 crédits/jour.
                    </p>
                </div>
            </div>
        </div>
    )
}
