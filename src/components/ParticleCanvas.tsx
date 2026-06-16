"use client";

import React, { createContext, useContext, useEffect, useRef } from 'react';
import { ParticleEngine, ParticleState } from '@/lib/particleEngine';
import { themeEngine } from '@/lib/themeEngine';
import teamData from '../../public/team.json';

interface ParticleContextType {
  setState: (state: ParticleState) => void;
}

const ParticleContext = createContext<ParticleContextType | null>(null);

export const useParticleEngine = () => {
  const ctx = useContext(ParticleContext);
  if (!ctx) throw new Error('useParticleEngine must be within ParticleCanvasProvider');
  return ctx;
};

export const ParticleCanvasProvider = ({ children }: { children: React.ReactNode }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ParticleEngine | null>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!canvasRef.current) return;

    const pe = new ParticleEngine(teamData);
    pe.init(canvasRef.current, themeEngine.isDark);
    engineRef.current = pe;

    // Spawn chaos particles immediately so there's life on screen
    // HeroSection will call setState('text:INTERACTION') after 800ms
    pe.spawnChaos();

    const unsubTheme = themeEngine.subscribe((isDark) => pe.onThemeChange(isDark));

    const handleMouseMove  = (e: MouseEvent)  => pe.setMouse(e.clientX, e.clientY);
    const handleMouseLeave = ()                => pe.clearMouse();
    const handleTouchMove  = (e: TouchEvent)  => {
      const t = e.touches[0];
      pe.setMouse(t.clientX, t.clientY);
    };
    const handleTouchEnd = () => pe.clearMouse();

    window.addEventListener('mousemove',  handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('touchmove',  handleTouchMove,  { passive: true });
    window.addEventListener('touchend',   handleTouchEnd);

    return () => {
      pe.destroy();
      unsubTheme();
      window.removeEventListener('mousemove',  handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('touchmove',  handleTouchMove);
      window.removeEventListener('touchend',   handleTouchEnd);
    };
  }, []);

  const setState = React.useCallback((state: ParticleState) => {
    engineRef.current?.setState(state);
  }, []);

  return (
    <ParticleContext.Provider value={{ setState }}>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none w-full h-full"
        style={{ zIndex: 1 }}
      />
      <div className="relative z-[2] w-full">
        {children}
      </div>
    </ParticleContext.Provider>
  );
};
