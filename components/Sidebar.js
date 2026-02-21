'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import { useLanguage } from '@/lib/language'
import CreditDisplay from '@/components/CreditDisplay'
import { ThemeToggle } from '@/components/ThemeToggle'
import { LayoutDashboard, MessageSquareText, BookOpen, SearchCheck, FileSignature, Menu, X, Check, MessageSquarePlus, LogOut } from 'lucide-react'

// Navigation items configuration
const navItems = [
    {
        href: '/dashboard',
        labelFr: 'Tableau de bord',
        labelAr: 'لوحة التحكم',
        icon: <LayoutDashboard className="w-5 h-5" />
    },
    {
        href: '/chat',
        labelFr: 'Assistant juridique',
        labelAr: 'المساعد القانوني',
        icon: <MessageSquareText className="w-5 h-5" />
    },
    {
        href: '/search',
        labelFr: 'Guides juridiques',
        labelAr: 'الأدلة القانونية',
        icon: <BookOpen className="w-5 h-5" />
    },
    {
        href: '/contracts/audit',
        labelFr: 'Audit interactif des contrats',
        labelAr: 'تدقيق العقود التفاعلي',
        icon: <SearchCheck className="w-5 h-5" />
    },
    {
        href: '/contracts',
        labelFr: 'Rédaction de contrats',
        labelAr: 'صياغة العقود',
        icon: <FileSignature className="w-5 h-5" />
    }
]

// SidebarItem Component
function SidebarItem({ href, icon, label, isActive, onClick }) {
    return (
        <Link
            href={href}
            onClick={onClick}
            className={`
                group flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 ease-out
                focus:outline-none focus:ring-2 focus:ring-primary/50 focus:ring-offset-2 focus:ring-offset-background
                ${isActive
                    ? 'bg-primary/10 text-primary font-semibold border-primary/20'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent border-transparent hover:border-border'
                }
                border
            `}
        >
            <span className={`flex-shrink-0 transition-transform duration-200 ${!isActive && 'group-hover:scale-110'}`}>
                {icon}
            </span>
            <span className="font-medium text-sm truncate">
                {label}
            </span>
        </Link>
    )
}

// Main Sidebar Component
export default function Sidebar({ isOpen, onClose }) {
    const pathname = usePathname()
    const { language } = useLanguage()

    const isActive = (href) => {
        if (href === '/') return pathname === '/'
        if (href === '/contracts') return pathname === '/contracts'
        return pathname.startsWith(href)
    }

    return (
        <>
            {/* Mobile Overlay */}
            {isOpen && (
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                    onClick={onClose}
                    aria-hidden="true"
                />
            )}

            {/* Sidebar */}
            <aside
                className={`
                    fixed top-0 left-0 z-50 h-full w-[280px]
                    bg-card
                    border-r border-border
                    flex flex-col
                    transition-transform duration-300 ease-out
                    lg:translate-x-0
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                `}
            >
                {/* Logo Section */}
                <div className="flex items-center justify-between px-6 py-6 border-b border-border bg-card">
                    <Link href="/" className="flex items-center" onClick={onClose}>
                        <Image
                            src="/logo.png"
                            alt="Loidumaroc"
                            width={220}
                            height={56}
                            className="h-14 w-auto object-contain"
                            priority
                        />
                    </Link>

                    {/* Mobile Close Button */}
                    <button
                        onClick={onClose}
                        className="lg:hidden p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                        aria-label="Fermer le menu"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto">
                    {/* Credit Display */}
                    <div className="mb-6">
                        <CreditDisplay />
                    </div>

                    {navItems.map((item) => (
                        <SidebarItem
                            key={item.href}
                            href={item.href}
                            icon={item.icon}
                            label={language === 'ar' ? item.labelAr : item.labelFr}
                            isActive={isActive(item.href)}
                            onClick={onClose}
                        />
                    ))}

                    {/* Global Chat History */}
                    <div className="border-t border-border pt-4 mt-2">
                        <div className="px-2 mb-2">
                            <Link
                                href="/chat"
                                onClick={(e) => {
                                    // If we are already on chat page, this might need to trigger a reset or we rely on ChatPage to handle "new" if id is missing? 
                                    // Actually, simplest is to just go to /chat. ChatPage usually loads last chat. 
                                    // To force new, we might need a specific action.
                                    // Let's make this button specifically "New Conversation" which clears the current ID logic?
                                    // For now, let's just link to /chat which is the "Assistant" page.
                                    // But the user wants a "New Chat" button.
                                    localStorage.removeItem('legal_ai_last_chat_id');
                                    window.dispatchEvent(new Event('legal_ai_chat_selected'));
                                    onClose();
                                }}
                                className="w-full py-2 px-3 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-medium"
                            >
                                <MessageSquarePlus className="w-4 h-4" />
                                <span>{language === 'ar' ? 'محادثة جديدة' : 'Nouvelle conversation'}</span>
                            </Link>
                        </div>

                        <div className="px-2">
                            <div className="text-[10px] font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-1">
                                {language === 'ar' ? 'السجل' : 'Historique'}
                            </div>
                            <ChatHistoryList onClose={onClose} />
                        </div>
                    </div>
                </nav>

                {/* Footer Section */}
                <div className="px-4 py-4 border-t border-border bg-card">
                    {/* Language and Theme Toggles */}
                    <div className="flex items-center justify-between gap-2 mb-4">
                        <div className="flex items-center gap-1 bg-accent/50 rounded-full p-1 flex-1">
                            <LanguageButton lang="fr" />
                            <LanguageButton lang="ar" />
                        </div>
                        <ThemeToggle />
                    </div>

                    {/* Logout Button */}
                    <Link
                        href="/"
                        className="flex items-center justify-center gap-2 w-full px-4 py-2.5 mb-4 text-sm font-medium text-muted-foreground hover:text-foreground bg-accent/50 hover:bg-accent border border-border rounded-lg transition-all"
                    >
                        <LogOut className="w-4 h-4" />
                        {language === 'ar' ? 'تسجيل الخروج' : 'Déconnexion'}
                    </Link>

                    {/* Disclaimer */}
                    <p className="text-xs text-muted-foreground text-center leading-relaxed">
                        {language === 'ar'
                            ? 'معلومات عامة فقط'
                            : 'Informations générales uniquement'}
                    </p>
                    <p className="text-xs text-muted-foreground/50 text-center mt-1">
                        © Loidumaroc.ma
                    </p>
                </div>
            </aside>
        </>
    )
}

// Language Toggle Button
function LanguageButton({ lang }) {
    const { language, setLanguage } = useLanguage()
    const isActive = language === lang

    return (
        <button
            onClick={() => setLanguage(lang)}
            className={`
                px-4 py-1.5 rounded-full text-xs font-medium transition-all duration-200
                ${isActive
                    ? 'bg-primary text-primary-foreground shadow-sm'
                    : 'text-muted-foreground hover:text-foreground hover:bg-accent/50'
                }
            `}
        >
            {lang === 'fr' ? 'FR' : 'ع'}
        </button>
    )
}

// Mobile Header with Hamburger
export function MobileHeader({ onMenuClick }) {
    return (
        <header className="fixed top-0 left-0 right-0 z-40 h-16 bg-card border-b border-border lg:hidden">
            <div className="flex items-center justify-between h-full px-4">
                <button
                    onClick={onMenuClick}
                    className="p-2 text-muted-foreground hover:text-foreground rounded-lg hover:bg-accent transition-colors"
                    aria-label="Ouvrir le menu"
                >
                    <Menu className="w-6 h-6" />
                </button>

                <Link href="/" className="flex items-center">
                    <Image
                        src="/logo.png"
                        alt="Loidumaroc"
                        width={160}
                        height={40}
                        className="h-10 w-auto object-contain"
                        priority
                    />
                </Link>

                <div className="w-10" /> {/* Spacer for centering */}
            </div>
        </header>
    )
}

function ChatHistoryList({ onClose }) {
    const [chats, setChats] = useState([])
    const pathname = usePathname()

    // We need to listen to localStorage changes to update the list even if we are not on the chat page
    // Using a custom event or polling? simpler is just load on mount. 
    // But for a true app feel, we can listen to 'storage' event (only works across tabs)
    // AND listen to a custom window event for in-tab updates.

    useEffect(() => {
        const loadChats = () => {
            const saved = localStorage.getItem('legal_ai_chats')
            if (saved) {
                try {
                    const parsed = JSON.parse(saved)
                    setChats(parsed)
                } catch (e) {
                    console.error(e)
                }
            }
        }

        loadChats()

        // Listen for updates
        const handleStorageChange = (e) => {
            if (e.key === 'legal_ai_chats') loadChats()
        }

        window.addEventListener('storage', handleStorageChange)
        // Custom event for same-tab updates
        window.addEventListener('legal_ai_chats_updated', loadChats)

        return () => {
            window.removeEventListener('storage', handleStorageChange)
            window.removeEventListener('legal_ai_chats_updated', loadChats)
        }
    }, [])

    const formatTime = (timestamp) => {
        return new Date(timestamp).toLocaleDateString('fr-MA', {
            month: 'short', day: 'numeric'
        })
    }

    if (chats.length === 0) return null

    return (
        <div className="space-y-0.5">
            {chats.map(chat => (
                <Link
                    key={chat.id}
                    href={`/chat`}
                    onClick={() => {
                        localStorage.setItem('legal_ai_last_chat_id', chat.id)
                        // Dispatch event to notify ChatPage if we are already there
                        window.dispatchEvent(new Event('legal_ai_chat_selected'))
                        onClose()
                    }}
                    className="group flex items-center gap-2 px-2 py-2 rounded-lg hover:bg-accent transition-all cursor-pointer border border-transparent hover:border-border"
                >
                    <MessageSquareText className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary transition-colors flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                        <p className="truncate text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                            {chat.title}
                        </p>
                    </div>
                </Link>
            ))}
        </div>
    )
}
