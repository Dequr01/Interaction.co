'use client'

import { useMouseTrack } from '@/hooks/useMouseTrack'
import { spacing, radius } from '@/design-system/tokens'
import { cn } from '@/lib/utils/cn'

export interface GlassCardProps {
  children:          React.ReactNode
  className?:        string
  contentClassName?: string
  padding?:          keyof typeof spacing
  radius?:           keyof typeof radius
  hover?:            boolean
  tilt?:             boolean // API compat — logic intentionally omitted
  onClick?:          () => void
  as?:               'div' | 'article' | 'li' | 'section'
  'data-aos'?:       string
  style?:            React.CSSProperties
  /** Legacy: delay prop forwarded for compatibility with old GlassCard usage */
  delay?:            number
}

export function GlassCard({
  children,
  className,
  contentClassName,
  padding = 'md',
  radius: rad = 'lg',
  hover = false,
  tilt = false,
  onClick,
  as: Component = 'div',
  'data-aos': dataAos,
  style,
  delay: _delay, // consumed silently for compat
}: GlassCardProps) {
  const { ref, onMouseMove, onMouseEnter, onMouseLeave } = useMouseTrack<HTMLElement>()

  const inlineStyles: React.CSSProperties = {
    padding:      spacing[padding],
    borderRadius: radius[rad],
    ...style,
  }

  return (
    <Component
      ref={ref as any}
      className={cn(
        'glass-panel group/card relative overflow-hidden w-full min-w-0 transition-all duration-300',
        '[--cursor-x:50%] [--cursor-y:50%]',
        hover && 'cursor-pointer hover:shadow-[var(--glow-sm)] hover:border-[var(--border-accent)]',
        className
      )}
      style={inlineStyles}
      onClick={onClick}
      data-aos={dataAos}
      onMouseMove={onMouseMove}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      {/* ① BORDER REFRACTION — mask-composite paints only the 1px edge */}
      {/* Opacity is fully Tailwind-controlled (opacity-0 → group-hover:opacity-100).  */}
      {/* Subtlety is encoded in the gradient alpha so inline style never conflicts.   */}
      <span
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 transition-opacity duration-300 z-[1] hidden md:block group-hover/card:opacity-100"
        style={{
          background: 'radial-gradient(circle 120px at var(--cursor-x) var(--cursor-y), color-mix(in srgb, var(--accent) 40%, transparent), transparent 65%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: '1px',
        }}
        aria-hidden
      />

      {/* ② INTERIOR REFRACTION GLOW */}
      <span
        className="absolute inset-0 pointer-events-none opacity-0 transition-opacity duration-300 rounded-[inherit] z-[1] hidden md:block group-hover/card:opacity-100"
        style={{
          background: 'radial-gradient(circle 100px at var(--cursor-x) var(--cursor-y), var(--accent-glow), transparent 70%)',
        }}
        aria-hidden
      />

      {/* Card content — sits above overlays */}
      <div className={cn('relative z-[2] w-full min-w-0', contentClassName)}>
        {children}
      </div>
    </Component>
  )
}
