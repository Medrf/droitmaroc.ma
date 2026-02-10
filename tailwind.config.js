/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./app/**/*.{js,ts,jsx,tsx,mdx}",
        "./components/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', 'sans-serif'],
                arabic: ['Cairo', 'Tajawal', 'sans-serif'],
            },
            colors: {
                // Premium Legal SaaS Palette
                background: '#FAFAFA',
                surface: '#FFFFFF',

                // Text colors
                text: {
                    primary: '#1E293B',
                    secondary: '#64748B',
                    muted: '#94A3B8',
                },

                // Accent colors
                accent: {
                    primary: '#1D4ED8',
                    'primary-hover': '#1E40AF',
                    gold: '#B8860B',
                    'gold-light': '#F5E6C8',
                },

                // UI colors
                border: {
                    DEFAULT: '#E5E7EB',
                    light: '#F3F4F6',
                    dark: '#D1D5DB',
                },

                // Legacy support
                primary: {
                    50: '#EFF6FF',
                    100: '#DBEAFE',
                    500: '#3B82F6',
                    600: '#2563EB',
                    700: '#1D4ED8',
                },
            },
            fontSize: {
                // Typography scale
                'display': ['64px', { lineHeight: '1.1', fontWeight: '700' }],
                'h1': ['48px', { lineHeight: '1.15', fontWeight: '700' }],
                'h2': ['36px', { lineHeight: '1.2', fontWeight: '600' }],
                'h3': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
                'h4': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
                'body-lg': ['18px', { lineHeight: '1.6', fontWeight: '400' }],
                'body': ['16px', { lineHeight: '1.6', fontWeight: '400' }],
                'small': ['14px', { lineHeight: '1.5', fontWeight: '400' }],
            },
            spacing: {
                // Spacing scale (4px base)
                '18': '4.5rem',
                '22': '5.5rem',
                '30': '7.5rem',
            },
            borderRadius: {
                'sm': '6px',
                'md': '12px',
                'lg': '16px',
                'xl': '24px',
            },
            boxShadow: {
                'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
                'medium': '0 4px 16px rgba(0, 0, 0, 0.08)',
                'large': '0 8px 32px rgba(0, 0, 0, 0.12)',
                'card': '0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03)',
                'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
            },
        },
    },
    plugins: [],
}
