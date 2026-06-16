// samplePixels.ts — pixel sampling for particle targets

export interface TargetParticleData {
  x: number;
  y: number;
  color?: string;
}

export function sampleTargetText(
  text: string,
  canvasW: number,
  canvasH: number,
  step: number = 4
): TargetParticleData[] {
  const offscreen = new OffscreenCanvas(canvasW, canvasH);
  const ctx = offscreen.getContext('2d')!;
  ctx.clearRect(0, 0, canvasW, canvasH);

  // Adaptive font: fit text to right 50% of screen
  const maxW = canvasW * 0.46;
  let fontSize = Math.min(canvasW / 10, 130);
  ctx.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  
  const measured = ctx.measureText(text);
  if (measured.width > maxW) {
    fontSize = fontSize * (maxW / measured.width);
    ctx.font = `700 ${fontSize}px "Cormorant Garamond", Georgia, serif`;
  }

  ctx.fillStyle = 'white';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';

  const isMobile = canvasW < 1024;
  const cx = isMobile ? canvasW / 2 : canvasW * 0.73;
  const cy = isMobile ? canvasH * 0.28 : canvasH / 2;
  ctx.fillText(text, cx, cy);

  const imgData = ctx.getImageData(0, 0, canvasW, canvasH).data;
  const particles: TargetParticleData[] = [];

  for (let y = 0; y < canvasH; y += step) {
    for (let x = 0; x < canvasW; x += step) {
      const idx = (y * canvasW + x) * 4;
      if (imgData[idx + 3] > 128) {
        particles.push({ x, y });
      }
    }
  }

  return particles;
}

export async function sampleTargetImage(
  src: string,
  canvasW: number,
  canvasH: number,
  step: number = 6
): Promise<TargetParticleData[]> {
  if (!src) return [];

  return new Promise((resolve) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const offscreen = new OffscreenCanvas(canvasW, canvasH);
      const ctx = offscreen.getContext('2d')!;
      ctx.clearRect(0, 0, canvasW, canvasH);

      const isMobile = canvasW < 1024;
      const targetW = isMobile ? canvasW * 0.7 : canvasW * 0.38;
      const aspectRatio = img.height / img.width;
      const targetH = targetW * aspectRatio;

      const offsetX = isMobile
        ? (canvasW - targetW) / 2
        : canvasW * 0.55;
      const offsetY = (canvasH - targetH) / 2;

      ctx.drawImage(img, offsetX, offsetY, targetW, targetH);

      const imgData = ctx.getImageData(0, 0, canvasW, canvasH).data;
      const particles: TargetParticleData[] = [];

      for (let y = 0; y < canvasH; y += step) {
        for (let x = 0; x < canvasW; x += step) {
          const idx = (y * canvasW + x) * 4;
          const alpha = imgData[idx + 3];
          if (alpha > 80) {
            const r = imgData[idx];
            const g = imgData[idx + 1];
            const b = imgData[idx + 2];
            particles.push({ x, y, color: `rgb(${r},${g},${b})` });
          }
        }
      }
      resolve(particles);
    };
    img.onerror = () => resolve([]);
    img.src = src;
  });
}
