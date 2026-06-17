'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useMouseTrack } from '@/hooks/useMouseTrack'
import { cn } from '@/lib/utils/cn'
import { Icon } from '@/components/atoms/Icon'

export interface GlassSelectorOption {
  label: string
  value: string
  icon?: any // using any to avoid strict type errors with Icon component if undefined
}

export interface GlassSelectorProps {
  options:    GlassSelectorOption[]
  value:      string
  onChange:   (value: string) => void
  onOptionHover?: (value: string | null) => void
  disabled?:  boolean
  className?: string
  size?:      'sm' | 'md'
}

export function GlassSelector({
  options,
  value,
  onChange,
  onOptionHover,
  disabled,
  className,
  size = 'md'
}: GlassSelectorProps) {
  const { ref, onMouseMove, onMouseEnter, onMouseLeave } = useMouseTrack<HTMLDivElement>()

  return (
    <div 
      ref={ref}
      className={cn(
        "relative flex w-full p-1 rounded-full overflow-hidden border backdrop-blur-xl group/selector transition-colors",
        "bg-[var(--bg-elevated)]/90 border-[var(--border-default)] shadow-sm",
        disabled && "opacity-50 pointer-events-none",
        "[--cursor-x:50%] [--cursor-y:50%]",
        className
      )}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={(e) => {
        onMouseLeave(e);
        if (onOptionHover) onOptionHover(null);
      }}
    >
      {/* Interactive Refraction Layer */}
      <div className="absolute inset-0 pointer-events-none opacity-0 group-hover/selector:opacity-100 transition-opacity duration-500 bg-[radial-gradient(circle_80px_at_var(--cursor-x)_var(--cursor-y),rgba(255,255,255,0.06),transparent_70%)]" />

      <AnimatePresence mode="popLayout">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onChange(opt.value)}
            onMouseEnter={() => onOptionHover?.(opt.value)}
            className={cn(
              "relative z-10 flex-1 flex items-center justify-center gap-2 transition-colors duration-300 font-semibold tracking-tight px-4",
              size === 'sm' ? "py-1.5 text-[10px]" : "py-2 text-sm",
              value === opt.value
                ? "text-white"
                : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            )}
          >
            {value === opt.value && (
              <motion.div
                layoutId={`glass-selector-highlight-${options.map(o => o.value).join('-')}`}
                className="absolute inset-0 bg-white/10 backdrop-blur-md border border-white/10 rounded-full z-[-1]"
                transition={{ 
                  type: "spring", 
                  bounce: 0.4,
                  duration: 0.6
                }}
              />
            )}
            {opt.icon && <Icon name={opt.icon} size={size === 'sm' ? 14 : 18} />}
            <span>{opt.label}</span>
          </button>
        ))}
      </AnimatePresence>
    </div>
  )
}
