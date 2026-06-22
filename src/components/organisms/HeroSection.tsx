'use client';

import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { BadgePill } from '../atoms/BadgePill';
import Link from 'next/link';
import Image from 'next/image';

export function HeroSection() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 3D Tilt Values
  const tiltX = useMotionValue(0);
  const tiltY = useMotionValue(0);
  
  // Glare Opacity
  const glareOpacity = useMotionValue(0);
  const smoothGlareOpacity = useSpring(glareOpacity, { damping: 20, stiffness: 100 });
  
  const springConfig = { damping: 25, stiffness: 150 };
  const smoothTiltX = useSpring(tiltX, springConfig);
  const smoothTiltY = useSpring(tiltY, springConfig);
  
  // Map mouse position to rotation (subtle 4 degree tilt)
  const rotateX = useTransform(smoothTiltY, [-1, 1], [4, -4]);
  const rotateY = useTransform(smoothTiltX, [-1, 1], [-4, 4]);
  
  // Map mouse position to subtitle parallax translation (subtle)
  const parallaxX = useTransform(smoothTiltX, [-1, 1], [-3, 3]);
  const parallaxY = useTransform(smoothTiltY, [-1, 1], [-3, 3]);

  function handleMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = clientX - left;
    const y = clientY - top;
    
    // For glare
    mouseX.set(x);
    mouseY.set(y);
    glareOpacity.set(1);
    
    // For tilt (-1 to 1 normalized)
    tiltX.set((x / width) * 2 - 1);
    tiltY.set((y / height) * 2 - 1);
  }

  function handleMouseLeave() {
    tiltX.set(0);
    tiltY.set(0);
    glareOpacity.set(0);
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-12 overflow-hidden snap-start">

      {/* Content */}
      <div className="relative z-10 max-w-[90rem] mx-auto px-6 text-center flex flex-col items-center mt-[-10vh]">
        

        {/* Glassmorphic Text with Cursor Reflection & 3D Tilt */}
        <motion.div
          className="relative mt-12 cursor-default"
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          style={{ 
            rotateX, 
            rotateY,
            transformStyle: "preserve-3d",
            perspective: 1000
          }}
        >
          {/* Base Layout Text (Invisible, provides sizing) */}
          <h1 className="font-display text-5xl md:text-[8rem] lg:text-[9rem] font-bold leading-[1.05] tracking-tight opacity-0 pointer-events-none select-none">
            Next-gen enterprise <br className="hidden lg:block" />
            with AI Agents
          </h1>

          {/* Layer 1: Glass Base (Translucent gradient that interacts with background) */}
          <h1 
            className="absolute inset-0 font-display text-5xl md:text-[8rem] lg:text-[9rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text pointer-events-none mix-blend-overlay bg-gradient-to-b from-black to-black/30 dark:from-white dark:to-white/30"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 4px 24px rgba(0,0,0,0.4))',
            }}
          >
            Next-gen enterprise <br className="hidden lg:block" />
            with AI Agents
          </h1>

          {/* Layer 2: Frosting & Edges */}
          <h1 
            className="absolute inset-0 font-display text-5xl md:text-[8rem] lg:text-[9rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text pointer-events-none bg-gradient-to-br from-black/40 via-transparent to-black/10 dark:from-white/40 dark:via-transparent dark:to-white/10"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              filter: 'drop-shadow(0 1px 1px rgba(0,0,0,0.2))',
            }}
          >
            Next-gen enterprise <br className="hidden lg:block" />
            with AI Agents
          </h1>

          {/* Layer 3: Cursor Glare (Highlights text where mouse hovers) */}
          <motion.h1
            className="absolute inset-0 font-display text-5xl md:text-[8rem] lg:text-[9rem] font-bold leading-[1.05] tracking-tight text-transparent bg-clip-text pointer-events-none"
            style={{
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              opacity: smoothGlareOpacity,
              backgroundImage: useMotionTemplate`
                radial-gradient(
                  500px circle at ${mouseX}px ${mouseY}px,
                  rgba(255,255,255,0.9),
                  transparent 40%
                )
              `,
            }}
          >
            Next-gen enterprise <br className="hidden lg:block" />
            with AI Agents
          </motion.h1>
        </motion.div>

        <motion.p 
          className="mt-12 text-base md:text-lg text-text-secondary/80 max-w-4xl font-medium tracking-wide leading-relaxed drop-shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ x: parallaxX, y: parallaxY }}
        >
          Accelerate the speed of business with the INTERACTION Platform and our AI solutions for work, service, and process.
        </motion.p>
      </div>

    </section>
  );
}
