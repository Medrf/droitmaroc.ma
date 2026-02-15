'use client'

import { useState } from 'react'
import Sidebar, { MobileHeader } from './Sidebar'

export default function AppLayout({ children, fullWidth = false }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const openSidebar = () => setIsSidebarOpen(true)
    const closeSidebar = () => setIsSidebarOpen(false)

    return (
        <div className="min-h-screen bg-slate-900">
            <div className="bg-red-600 text-white text-center p-2 font-bold z-[100] relative">
                DEBUG: APP LAYOUT IS ACTIVE
            </div>
            {/* Mobile Header */}
            <MobileHeader onMenuClick={openSidebar} />

            {/* Sidebar */}
            <Sidebar isOpen={isSidebarOpen} onClose={closeSidebar} />

            {/* Main Content */}
            <main
                className={`
                    min-h-screen
                    pt-14 lg:pt-0
                    ${fullWidth ? '' : 'lg:pl-[280px]'}
                    transition-[padding] duration-300
                `}
            >
                {children}
            </main>
        </div>
    )
}
