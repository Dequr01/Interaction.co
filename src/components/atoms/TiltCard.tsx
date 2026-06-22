'use client';

import React, { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useMotionTemplate } from 'framer-motion';
import { cn } from '@/lib/utils/cn';

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
  perspective?: number;
  glare?: boolean;
}

export function TiltCard({
  children,
  className,
  maxTilt = 15,
  perspective = 800,
  glare = true,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  
  const glareOpacity = useMotionValue(0);
  
  const springConfig = { damping: 20, stiffness: 120 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);
  const smoothGlareOpacity = useSpring(glareOpacity, springConfig);
  
  const rotateX = useTransform(smoothTiltY, [-1, 1], [maxTilt, -maxTilt]);
  const rotateY = useTransform(smoothTiltX, [-1, 1], [-maxTilt, maxTilt]);
  
  function handleMouseMove(e: React.MouseEvent) {
    if (!ref.current) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const x = e.clientX - left;
    const y = e.clientY - top;
    
    mouseX.set(x);
    mouseY.set(y);
    glareOpacity.set(1);
    
    tiltX.set((x / width) * 2 - 1);
    tiltY.set((y / height) * 2 - 1);
  }
  
  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
    glareOpacity.set(0);
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={cn("relative transform-gpu", className)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective,
      }}
    >
      {/* Glare effect */}
      {glare && (
        <motion.div
          className="absolute inset-0 pointer-events-none rounded-[inherit] z-20"
          style={{
            opacity: smoothGlareOpacity,
            background: useMotionTemplate`
              radial-gradient(
                250px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.12),
                transparent 60%
              )
            `,
          }}
        />
      )}
      <div style={{ transform: 'translateZ(10px)', transformStyle: 'preserve-3d' }} className="h-full w-full rounded-[inherit]">
        {children}
      </div>
    </motion.div>
  );
}
