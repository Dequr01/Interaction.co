'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';
// @ts-ignore
import webGLFluidEnhanced from 'webgl-fluid';

export function InkBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { resolvedTheme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const isDarkMode = resolvedTheme === 'dark';

    // We configure the WebGL fluid simulation for a thick, ink-like aesthetic.
    // The density dissipates relatively quickly to create a trailing brush effect,
    // and viscosity is tuned up to make the ripples feel like water/ink.
    const getConfig = (dark: boolean) => ({
      IMMEDIATE: true,
      TRIGGER: 'hover',
      SIM_RESOLUTION: 128,
      DYE_RESOLUTION: 512,
      CAPTURE_RESOLUTION: 512,
      DENSITY_DISSIPATION: 3.5, // Faster dissipation for fading ink
      VELOCITY_DISSIPATION: 2.0, // High viscosity
      PRESSURE: 0.1,
      PRESSURE_ITERATIONS: 20,
      CURL: 2,
      SPLAT_RADIUS: 0.25, // Thinner stroke
      SPLAT_FORCE: 6000,
      SHADING: true, // Crucial for refraction / specular highlights
      COLORFUL: false,
      COLOR_UPDATE_SPEED: 10,
      PAUSED: false,
      BACK_COLOR: dark ? { r: 4, g: 4, b: 5 } : { r: 255, g: 255, b: 255 },
      TRANSPARENT: false,
      BLOOM: dark ? true : false,
      BLOOM_ITERATIONS: 8,
      BLOOM_RESOLUTION: 256,
      BLOOM_INTENSITY: dark ? 0.4 : 0.0,
      BLOOM_THRESHOLD: 0.8,
      BLOOM_SOFT_KNEE: 0.7,
      SUNRAYS: false,
      SUNRAYS_RESOLUTION: 196,
      SUNRAYS_WEIGHT: 1.0,
      SPLAT_COLOR: dark 
        ? { r: 0.04, g: 0.04, b: 0.045 }
        : { r: 139 / 255, g: 92 / 255, b: 246 / 255 },
    });

    // Initialize fluid simulation with current theme config
    webGLFluidEnhanced(canvas, getConfig(isDarkMode));

    // Forward mouse events from window to canvas 
    // because the canvas is z-[-50] and covered by other DOM elements
    let lastMouseX = window.innerWidth / 2;
    let lastMouseY = window.innerHeight / 2;

    const forwardEvent = (e: MouseEvent | TouchEvent, type: string) => {
      if (!canvas) return;
      if (e.target === canvas) return; // Prevent infinite loop when event bubbles back to window
      
      if (e instanceof MouseEvent) {
        lastMouseX = e.clientX;
        lastMouseY = e.clientY;
      } else if (e.touches && e.touches.length > 0) {
        lastMouseX = e.touches[0].clientX;
        lastMouseY = e.touches[0].clientY;
      }

      const eventCtor = e instanceof MouseEvent ? MouseEvent : TouchEvent;
      const newEvent = new eventCtor(type, {
        bubbles: true,
        cancelable: true,
        // @ts-ignore
        clientX: e.clientX,
        // @ts-ignore
        clientY: e.clientY,
        // @ts-ignore
        touches: e.touches,
      });
      canvas.dispatchEvent(newEvent);
    };

    const onMouseMove = (e: MouseEvent) => forwardEvent(e, 'mousemove');
    const onTouchMove = (e: TouchEvent) => forwardEvent(e, 'touchmove');
    const onMouseDown = (e: MouseEvent) => forwardEvent(e, 'mousedown');
    const onTouchStart = (e: TouchEvent) => forwardEvent(e, 'touchstart');
    const onMouseUp = (e: MouseEvent) => forwardEvent(e, 'mouseup');
    const onTouchEnd = (e: TouchEvent) => forwardEvent(e, 'touchend');

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('touchmove', onTouchMove);
    window.addEventListener('mousedown', onMouseDown);
    window.addEventListener('touchstart', onTouchStart);
    window.addEventListener('mouseup', onMouseUp);
    window.addEventListener('touchend', onTouchEnd);

    // Add scroll animation to simulate fluid ripples when scrolling
    const scrollContainer = document.getElementById('main-scroll-container');
    if (!scrollContainer) return;
    
    let lastScrollY = scrollContainer.scrollTop;
    const onScroll = () => {
      if (!canvas) return;
      const currentScrollY = scrollContainer.scrollTop;
      const deltaY = currentScrollY - lastScrollY;
      lastScrollY = currentScrollY;

      if (Math.abs(deltaY) > 2) {
        // Move the fluid opposite to scroll direction
        lastMouseY -= deltaY * 1.5;
        
        // Add slight horizontal wiggle to make it look like a natural current
        lastMouseX += (Math.random() - 0.5) * 40;

        // Keep coordinates within bounds
        if (lastMouseY < 0) lastMouseY = window.innerHeight;
        if (lastMouseY > window.innerHeight) lastMouseY = 0;
        if (lastMouseX < 0) lastMouseX = window.innerWidth;
        if (lastMouseX > window.innerWidth) lastMouseX = 0;

        const fakeEvent = new MouseEvent('mousemove', {
          bubbles: true,
          cancelable: true,
          clientX: lastMouseX,
          clientY: lastMouseY,
        });
        canvas.dispatchEvent(fakeEvent);
      }
    };
    scrollContainer.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      // mediaQuery.removeEventListener('change', onThemeChange);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('mouseup', onMouseUp);
      window.removeEventListener('touchend', onTouchEnd);
      scrollContainer.removeEventListener('scroll', onScroll);
    };
  }, [resolvedTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-[-50] block pointer-events-none"
      style={{ 
        width: '100vw', 
        height: '100vh',
        transform: 'translate3d(0, 0, 0)',
        WebkitTransform: 'translate3d(0, 0, 0)'
      }}
    />
  );
}
