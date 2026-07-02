'use client';

import { ReactNode, useEffect, useRef, useState } from 'react';

export default function DraggableArea({ children }: { children: ReactNode }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);
  const lastPinchDist = useRef<number | null>(null);

  const getDistance = (t1: React.Touch, t2: React.Touch) => {
    const dx = t2.clientX - t1.clientX;
    const dy = t2.clientY - t1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if ('touches' in e) {
      const te = e as React.TouchEvent<HTMLDivElement>;
      if (te.touches.length >= 2) {
        lastPinchDist.current = getDistance(te.touches[0], te.touches[1]);
        return;
      }
      setIsDragging(true);
      setStartPos({ x: te.touches[0].clientX - offset.x, y: te.touches[0].clientY - offset.y });
    } else {
      setIsDragging(true);
      setStartPos({ x: e.clientX - offset.x, y: e.clientY - offset.y });
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    if ('touches' in e) {
      const te = e as React.TouchEvent<HTMLDivElement>;
      if (te.touches.length >= 2) {
        const dist = getDistance(te.touches[0], te.touches[1]);
        if (lastPinchDist.current !== null) {
          const delta = (dist - lastPinchDist.current) * 0.005;
          setScale(prev => Math.min(Math.max(0.3, prev + delta), 4));
        }
        lastPinchDist.current = dist;
        return;
      }
      if (!isDragging || te.touches.length === 0) return;
      setOffset({ x: te.touches[0].clientX - startPos.x, y: te.touches[0].clientY - startPos.y });
    } else {
      if (!isDragging) return;
      setOffset({ x: e.clientX - startPos.x, y: e.clientY - startPos.y });
    }
  };

  const handlePointerUp = () => {
    setIsDragging(false);
    lastPinchDist.current = null;
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? -0.1 : 0.1;
    setScale(prev => Math.min(Math.max(0.3, prev + delta), 4));
  };

  useEffect(() => {
    const prevent = (e: TouchEvent) => {
      if (e.touches.length >= 2) e.preventDefault();
      if (e.touches.length === 1 && window.scrollY === 0) e.preventDefault();
    };
    const handleKeyboard = (e: KeyboardEvent) => {
      if (e.key === '+' || e.key === '=') {
        e.preventDefault();
        setScale(prev => Math.min(prev + 0.1, 4));
      } else if (e.key === '-' || e.key === '_') {
        e.preventDefault();
        setScale(prev => Math.max(prev - 0.1, 0.3));
      }
    };
    document.addEventListener('touchmove', prevent, { passive: false });
    document.addEventListener('keydown', handleKeyboard);
    return () => {
      document.removeEventListener('touchmove', prevent);
      document.removeEventListener('keydown', handleKeyboard);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="w-full h-full overflow-hidden relative select-none"
      style={{ cursor: isDragging ? 'grabbing' : 'grab', background: 'var(--drag-bg)' }}
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
