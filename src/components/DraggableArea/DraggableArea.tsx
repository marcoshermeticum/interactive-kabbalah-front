'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export default function DraggableArea({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const handlePointerDown = (e: React.MouseEvent | React.TouchEvent) => {
    const point = 'touches' in e ? e.touches[0] : e;
    setIsDragging(true);
    setStartPos({ x: point.clientX - offset.x, y: point.clientY - offset.y });
  };

  const handlePointerMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDragging) return;
    const point = 'touches' in e && e.touches.length > 0 ? e.touches[0] : (e as React.MouseEvent);
    setOffset({ x: point.clientX - startPos.x, y: point.clientY - startPos.y });
  };

  const handlePointerUp = () => setIsDragging(false);

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(0.5, prev + delta), 3));
  };

  useEffect(() => {
    const prevent = (e: TouchEvent) => {
      if (e.touches.length === 1 && window.scrollY === 0) e.preventDefault();
    };
    document.addEventListener('touchmove', prevent, { passive: false });
    return () => document.removeEventListener('touchmove', prevent);
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative bg-[#1a1a2e] select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onWheel={handleWheel}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
    >
      <div style={{ transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`, transformOrigin: 'center' }}>
        {children}
      </div>
    </div>
  );
}
