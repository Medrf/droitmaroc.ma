'use client'

import { useState } from 'react'
import { Copy, Check, Download, Printer } from 'lucide-react'

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
                        ? 'bg-primary text-primary-foreground'
                        : 'btn-secondary'
                        }`}
                >
                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                    {copied ? t.copied : t.copy}
                </button>
                <button
                    onClick={handleExport}
                    className="flex-1 py-2.5 px-4 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                >
                    <Download className="w-4 h-4" />
                    {t.export}
                </button>
                <button
                    onClick={handlePrint}
                    className="flex-1 btn-secondary py-2.5 px-4 text-sm flex items-center justify-center gap-2"
                >
                    <Printer className="w-4 h-4" />
                    {t.print}
                </button>
            </div>

            {/* Contract Content */}
            <div
                className="bg-card border border-border rounded-lg p-6 shadow-sm"
                dir={language === 'ar' ? 'rtl' : 'ltr'}
            >
                <pre
                    className="whitespace-pre-wrap text-foreground leading-relaxed text-sm"
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
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                    <p className="text-destructive text-xs text-center">{disclaimer}</p>
                </div>
            )}
        </div>
    )
}
