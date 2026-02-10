'use client'

import { useState } from 'react'

export default function ContractOutput({ contract, disclaimer, watermark, language }) {
    const [copied, setCopied] = useState(false)

    const labels = {
        fr: {
            copy: 'Copier',
            copied: 'Copié !',
            export: 'Exporter',
            print: 'Imprimer',
            warning: 'Document à titre informatif uniquement'
        },
        ar: {
            copy: 'نسخ',
            copied: 'تم النسخ !',
            export: 'تصدير',
            print: 'طباعة',
            warning: 'وثيقة لأغراض معلوماتية فقط'
        }
    }

    const t = labels[language]

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(contract)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        } catch (err) {
            console.error('Copy failed:', err)
        }
    }

    const handleExport = () => {
        const htmlContent = `
<!DOCTYPE html>
<html ${language === 'ar' ? 'dir="rtl" lang="ar"' : 'lang="fr"'}>
<head>
    <meta charset="UTF-8">
    <title>Contrat</title>
    <style>
        @page { margin: 2.5cm; }
        body {
            font-family: ${language === 'ar' ? "'Traditional Arabic', 'Arial', sans-serif" : "'Times New Roman', serif"};
            font-size: 12pt;
            line-height: 1.6;
            direction: ${language === 'ar' ? 'rtl' : 'ltr'};
            color: #000;
        }
        .content { white-space: pre-wrap; font-family: inherit; }
    </style>
</head>
<body>
    <pre class="content">${contract}</pre>
</body>
</html>`

        const blob = new Blob(['\ufeff' + htmlContent], { type: 'application/msword;charset=utf-8' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `contrat_${new Date().toISOString().slice(0, 10)}.doc`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
    }

    const handlePrint = () => {
        const printWindow = window.open('', '_blank')
        printWindow.document.write(`
            <!DOCTYPE html>
            <html ${language === 'ar' ? 'dir="rtl"' : ''}>
            <head>
                <meta charset="UTF-8">
                <style>
                    body {
                        font-family: ${language === 'ar' ? "'Traditional Arabic', Arial" : "'Times New Roman', serif"};
                        font-size: 12pt;
                        line-height: 1.6;
                        padding: 40px;
                        direction: ${language === 'ar' ? 'rtl' : 'ltr'};
                    }
                    pre { white-space: pre-wrap; font-family: inherit; }
                </style>
            </head>
            <body>
                <pre>${contract}</pre>
            </body>
            </html>
        `)
        printWindow.document.close()
        printWindow.print()
    }

    return (
        <div className="space-y-4">
            {/* Warning */}
            <div className="disclaimer text-center">
                {t.warning}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-2">
                <button
                    onClick={handleCopy}
                    className={`flex-1 py-2.5 px-4 rounded-lg transition-colors text-sm font-medium flex items-center justify-center gap-2 ${copied
                            ? 'bg-emerald-600 text-white'
                            : 'btn-secondary'
                        }`}
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    {copied ? t.copied : t.copy}
                </button>
                <button
                    onClick={handleExport}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    {t.export}
                </button>
                <button
                    onClick={handlePrint}
                    className="flex-1 btn-secondary py-2.5 px-4 text-sm flex items-center justify-center gap-2"
                >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                    </svg>
                    {t.print}
                </button>
            </div>

            {/* Contract Content */}
            <div
                className="bg-white rounded-lg p-6 shadow-lg"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <pre
                    className="whitespace-pre-wrap text-gray-800 leading-relaxed text-sm"
                    style={{
                        fontFamily: language === 'ar'
                            ? "'Amiri', 'Traditional Arabic', serif"
                            : "'Times New Roman', serif"
                    }}
                >
                    {contract}
                </pre>
            </div>

            {/* Disclaimer */}
            {disclaimer && (
                <div className="bg-red-900/20 border border-red-800/50 rounded-lg p-4">
                    <p className="text-red-300 text-xs text-center">{disclaimer}</p>
                </div>
            )}
        </div>
    )
}
