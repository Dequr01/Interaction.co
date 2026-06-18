import React from 'react';

export function HeroBackground() {
  // Generate static deterministic rays to avoid hydration mismatch and ensure it looks exactly like the reference
  const rays = [
    { left: '10%', height: '60%', width: '4px', blur: '4px', color: '#F97316', opacity: 0.6 },
    { left: '15%', height: '85%', width: '12px', blur: '8px', color: '#F59E0B', opacity: 0.8 },
    { left: '18%', height: '45%', width: '2px', blur: '2px', color: '#F97316', opacity: 0.5 },
    { left: '22%', height: '95%', width: '20px', blur: '12px', color: '#FCD34D', opacity: 0.9 },
    { left: '28%', height: '70%', width: '6px', blur: '6px', color: '#F59E0B', opacity: 0.7 },
    { left: '32%', height: '50%', width: '3px', blur: '3px', color: '#FCD34D', opacity: 0.6 },
    { left: '38%', height: '100%', width: '25px', blur: '15px', color: '#FEF3C7', opacity: 1 },
    { left: '42%', height: '65%', width: '8px', blur: '6px', color: '#E879F9', opacity: 0.7 },
    { left: '47%', height: '90%', width: '15px', blur: '10px', color: '#D8B4FE', opacity: 0.9 },
    { left: '52%', height: '100%', width: '22px', blur: '14px', color: '#E0E7FF', opacity: 1 },
    { left: '57%', height: '75%', width: '10px', blur: '8px', color: '#93C5FD', opacity: 0.8 },
    { left: '62%', height: '55%', width: '4px', blur: '4px', color: '#60A5FA', opacity: 0.6 },
    { left: '68%', height: '95%', width: '18px', blur: '12px', color: '#3B82F6', opacity: 0.9 },
    { left: '73%', height: '60%', width: '6px', blur: '5px', color: '#60A5FA', opacity: 0.7 },
    { left: '78%', height: '85%', width: '14px', blur: '10px', color: '#2563EB', opacity: 0.8 },
    { left: '85%', height: '50%', width: '3px', blur: '3px', color: '#3B82F6', opacity: 0.5 },
    { left: '90%', height: '70%', width: '8px', blur: '6px', color: '#1D4ED8', opacity: 0.7 },
  ];

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-white dark:bg-[#040405] transition-colors duration-700">
      
      {/* Starfield */}
      <div className="absolute inset-0 opacity-10 dark:opacity-30 mix-blend-difference dark:mix-blend-normal transition-opacity duration-700"
           style={{ 
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='300' height='300' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='30' cy='30' r='1' fill='white'/%3E%3Ccircle cx='100' cy='150' r='1.5' fill='white'/%3E%3Ccircle cx='250' cy='80' r='0.5' fill='white'/%3E%3Ccircle cx='180' cy='250' r='1' fill='white'/%3E%3Ccircle cx='280' cy='200' r='1.5' fill='white'/%3E%3C/svg%3E")`,
             backgroundSize: '300px 300px'
           }} 
      />

      {/* Massive ambient glow behind everything */}
      <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] flex opacity-20 dark:opacity-60 blur-[100px] mix-blend-multiply dark:mix-blend-screen transition-opacity duration-700">
        <div className="w-1/3 h-full bg-[#F59E0B]" />
        <div className="w-1/3 h-full bg-[#A855F7]" />
        <div className="w-1/3 h-full bg-[#3B82F6]" />
      </div>

      {/* Vertical Rays Container */}
      <div className="absolute bottom-[35%] left-0 w-full h-[50vh] mask-rays transition-opacity duration-700 opacity-40 dark:opacity-100"
           style={{ maskImage: 'linear-gradient(to top, black 20%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to top, black 20%, transparent 100%)' }}>
        {rays.map((ray, i) => (
          <div 
            key={i}
            className="absolute bottom-0 mix-blend-multiply dark:mix-blend-screen"
            style={{
              left: ray.left,
              height: ray.height,
              width: ray.width,
              backgroundColor: ray.color,
              filter: `blur(${ray.blur})`,
              opacity: ray.opacity,
            }}
          />
        ))}
      </div>

      {/* Planet Horizon Edge (Crisp curving line) */}
      <div className="absolute top-[65%] left-1/2 -translate-x-1/2 w-[200vw] h-[100vw] rounded-[50%] bg-surface shadow-[0_-20px_80px_rgba(0,0,0,0.05)] dark:bg-[#040405] dark:shadow-[0_-20px_80px_rgba(0,0,0,0.9)] transition-colors duration-700">
        
        {/* Glowing Rim on the edge */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full rounded-[50%] border-t-[2px] border-transparent opacity-50 dark:opacity-100 transition-opacity duration-700"
             style={{
               background: 'linear-gradient(to right, #F59E0B, #FEF3C7 50%, #3B82F6) border-box',
               WebkitMask: 'linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)',
               WebkitMaskComposite: 'xor',
               maskComposite: 'exclude',
               boxShadow: '0 -10px 30px rgba(0,0,0,0.1)'
             }}
        />

        {/* Thick glow immediately under the rim */}
        <div className="absolute top-0 left-0 w-full h-[20px] rounded-[50%] bg-gradient-to-r from-[#F59E0B] via-[#FEF3C7] to-[#3B82F6] blur-[10px] opacity-20 dark:opacity-80 mix-blend-multiply dark:mix-blend-screen transition-opacity duration-700" />
      </div>

      {/* Noise Texture Overlay */}
      <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.05] mix-blend-overlay transition-opacity duration-700"
           style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }} />
    </div>
  );
}
