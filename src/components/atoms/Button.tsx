'use client'

import { useMouseTrack } from '@/hooks/useMouseTrack'
import { cn } from '@/lib/utils/cn'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant:     'primary' | 'secondary' | 'info' | 'ghost' | 'danger' | 'rainbow'
  size:        'xs' | 'sm' | 'md' | 'lg'
  loading?:    boolean
  icon?:       React.ReactNode
  iconRight?:  React.ReactNode
  fullWidth?:  boolean
  children:    React.ReactNode
}

const variants = {
  primary:   'bg-white text-black font-mono text-[0.8rem] tracking-[0.1em] uppercase font-bold border-none relative overflow-hidden group/btn hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:-translate-y-px transition-all duration-300',
  secondary: 'bg-transparent text-text-primary font-mono text-[0.8rem] tracking-[0.1em] uppercase border border-white/20 relative overflow-hidden group/btn hover:border-white/40 hover:shadow-[0_0_15px_rgba(255,255,255,0.1)] transition-all duration-300',
  info:      'bg-accent-blue text-white shadow-sm border-none relative overflow-hidden group/btn',
  ghost:     'bg-transparent text-text-primary relative overflow-hidden group/btn hover:bg-white/5 transition-colors',
  danger:    'bg-red-500 text-white shadow-sm border-none relative overflow-hidden group/btn',
  rainbow:   'bg-transparent font-mono text-[0.8rem] tracking-[0.1em] uppercase font-bold border-none relative group/btn hover:shadow-[0_0_15px_rgba(255,255,255,0.2)] transition-all duration-300 text-white'
}

const sizes = {
  xs: 'h-[28px] px-3 text-[0.7rem] rounded-full',
  sm: 'h-[36px] px-4 text-xs rounded-full',
  md: 'h-[44px] px-6 text-sm rounded-full',
  lg: 'h-[52px] px-8 text-sm rounded-full'
}

export function Button({
  variant,
  size,
  loading,
  icon,
  iconRight,
  fullWidth,
  children,
  className,
  disabled,
  onMouseMove,
  onMouseEnter,
  onMouseLeave,
  ...props
}: ButtonProps) {
  const { ref, onMouseMove: trackMouseMove, onMouseEnter: trackMouseEnter, onMouseLeave: trackMouseLeave } = useMouseTrack<HTMLButtonElement>()

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackMouseMove(e)
    onMouseMove?.(e)
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackMouseEnter()
    onMouseEnter?.(e)
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    trackMouseLeave()
    onMouseLeave?.(e)
  }

  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center font-medium',
        'transition-all duration-200 ease-out',
        'outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)]',
        'active:scale-95',
        '[--cursor-x:50%] [--cursor-y:50%]',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        (disabled || loading) && 'opacity-60 cursor-not-allowed pointer-events-none',
        className
      )}
      disabled={disabled || loading}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {/* 
        ① RAINBOW BORDER (Only for rainbow variant)
      */}
      {variant === 'rainbow' && (
        <span
          className="absolute inset-0 pointer-events-none rounded-[inherit] transition-opacity duration-200 bg-gradient-to-r from-blue-400 via-fuchsia-400 to-orange-400 animate-rainbow opacity-100"
          style={{
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            maskComposite: 'exclude',
            padding: '2px',
          }}
          aria-hidden
        />
      )}

      {/* 
        ② BORDER REFRACTION GLOW
      */}
      <span
        className="absolute inset-0 pointer-events-none rounded-[inherit] opacity-0 group-hover/btn:opacity-100 transition-opacity duration-200"
        style={{
          background: 'radial-gradient(circle 80px at var(--cursor-x) var(--cursor-y), rgba(255,255,255,0.55), transparent 65%)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          maskComposite: 'exclude',
          padding: variant === 'rainbow' ? '2px' : '1px',
        }}
        aria-hidden
      />

      {/* 
        ③ INTERIOR REFRACTION GLOW
      */}
      <span
        className="absolute inset-0 pointer-events-none opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 rounded-[inherit]"
        style={{
          background: 'radial-gradient(circle 60px at var(--cursor-x) var(--cursor-y), rgba(255,255,255,0.15), transparent 70%)',
        }}
        aria-hidden
      />


      {loading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current relative z-10" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      )}
      {!loading && icon && <span className="mr-2 flex items-center relative z-10">{icon}</span>}
      <span className={cn(
        "relative z-10",
        variant === 'rainbow' && "text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-fuchsia-400 to-orange-400 animate-rainbow"
      )}>
        {children}
      </span>
      {!loading && iconRight && <span className="ml-2 flex items-center relative z-10">{iconRight}</span>}
    </button>
  )
}
