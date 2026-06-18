'use client'

import React, { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Sun, Moon, Monitor } from 'lucide-react'
import { cn } from '@/lib/utils/cn'

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  // Avoid hydration mismatch
  useEffect(() => setMounted(true), [])

  if (!mounted) {
    return (
      <div className="fixed bottom-6 right-6 z-50 p-3 rounded-full bg-white/5 border border-white/10 backdrop-blur-xl shadow-lg w-[46px] h-[46px]">
        {/* Placeholder to prevent layout shift */}
      </div>
    )
  }

  const toggleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  return (
    <button
      onClick={toggleTheme}
      className={cn(
        "fixed bottom-6 right-6 z-50 p-3 rounded-full overflow-hidden transition-all duration-300",
        "bg-white/5 border border-white/10 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.3)]",
        "hover:bg-white/10 hover:border-white/20 hover:scale-110 active:scale-95 group"
      )}
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        <AnimatePresence mode="wait" initial={false}>
          {theme === 'light' && (
            <motion.div
              key="light"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="absolute text-[var(--text-primary)]"
            >
              <Sun size={20} strokeWidth={2} />
            </motion.div>
          )}
          {theme === 'dark' && (
            <motion.div
              key="dark"
              initial={{ y: 20, opacity: 0, rotate: -90 }}
              animate={{ y: 0, opacity: 1, rotate: 0 }}
              exit={{ y: -20, opacity: 0, rotate: 90 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="absolute text-[var(--text-primary)]"
            >
              <Moon size={20} strokeWidth={2} />
            </motion.div>
          )}
          {theme === 'system' && (
            <motion.div
              key="system"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.3, ease: "backOut" }}
              className="absolute text-[var(--text-primary)]"
            >
              <Monitor size={20} strokeWidth={2} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.15),transparent_70%)]" />
    </button>
  )
}
