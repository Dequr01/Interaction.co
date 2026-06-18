import { useRef, MouseEvent } from 'react';

export function useMouseTrack<T extends HTMLElement>() {
  const ref = useRef<T>(null);

  const onMouseMove = (e: MouseEvent<T>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    ref.current.style.setProperty('--cursor-x', `${x}px`);
    ref.current.style.setProperty('--cursor-y', `${y}px`);
  };

  const onMouseEnter = () => {};
  const onMouseLeave = () => {};

  return { ref, onMouseMove, onMouseEnter, onMouseLeave };
}
