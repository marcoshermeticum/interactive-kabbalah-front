'use client';

import Sephirot, { BiggerSephirot } from '@/components/Sephirot';
import {
  binah,
  chesed,
  chokma,
  daath,
  gevurah,
  hod,
  kether,
  malkuth,
  netzach,
  tiferet,
  yesod,
} from '@/components/Sephirot/__mock__/sephirots.mock';
import PageUnderConstruction from '@/components/UnderConstruction/UnderConstruction';
import { useTranslations } from 'next-intl';
import { useEffect, useRef, useState } from 'react';
import Appbar from '@/components/Appbar';
import useSephirot, { useBiggerSephirot } from '@/hooks/useSephirot';

export default function HomePage() {
  const t = useTranslations();

  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [startPos, setStartPos] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [offset, setOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [scale, setScale] = useState<number>(1);

  // Para o gesto de pinça (zoom) no mobile
  const [initialPinchDistance, setInitialPinchDistance] = useState<number>(0);
  const [initialScale, setInitialScale] = useState<number>(1);

  // Função para calcular a distância entre dois pontos no toque
  const getDistance = (touch1: Touch, touch2: Touch) => {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  // Função para iniciar o arrasto (Mouse ou Toque)
  const handlePointerDown = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    // Verificar o tipo de evento
    if (e.type === 'mousedown' || e.type === 'touchstart') {
      const touchEvent = e as React.TouchEvent<HTMLElement>;
      const mouseEvent = e as React.MouseEvent<HTMLElement>;

      // Verificar se é um toque ou mouse
      const touch =
        'touches' in e
          ? touchEvent.touches[0]
          : { clientX: mouseEvent.clientX, clientY: mouseEvent.clientY };

      setIsDragging(true);
      setStartPos({ x: touch.clientX - offset.x, y: touch.clientY - offset.y });

      if (containerRef.current) containerRef.current.style.cursor = 'grabbing';
    }
  };

  // Função para arrastar (Mouse ou Toque)
  const handlePointerMove = (
    e: React.MouseEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    if (isDragging) {
      const mouseEvent = e as React.MouseEvent<HTMLElement>;

      // Verificar se é um toque ou mouse
      let touch: { clientX: number; clientY: number } = {
        clientX: mouseEvent.clientX,
        clientY: mouseEvent.clientY,
      };

      if ('touches' in e && e.touches.length > 0) {
        touch = e.touches[0];
      }

      setOffset({
        x: touch.clientX - startPos.x,
        y: touch.clientY - startPos.y,
      });
    }
  };

  // Função para terminar o arrasto (Mouse ou Toque)
  const handlePointerUp = () => {
    setIsDragging(false);
    if (containerRef.current) containerRef.current.style.cursor = 'grab';
  };

  // Função de zoom com a roda do mouse (para desktop) ou gesto de pinça (para mobile)
  const handleWheelOrPinch = (
    e: React.WheelEvent<HTMLElement> | React.TouchEvent<HTMLElement>
  ) => {
    e.preventDefault();

    // Para o zoom com a roda do mouse
    if (e.type === 'wheel') {
      const delta =
        (e as React.WheelEvent<HTMLElement>).deltaY > 0 ? -0.1 : 0.1;
      setScale((prevScale) => Math.min(Math.max(0.5, prevScale + delta), 3));
    }

    // Para o zoom com o gesto de pinça
    if (e.type === 'touchmove' && 'touches' in e && e.touches.length === 2) {
      const dist = getDistance(e.touches[0] as Touch, e.touches[1] as Touch);
      if (initialPinchDistance === 0) {
        setInitialPinchDistance(dist);
      } else {
        const scaleChange = dist / initialPinchDistance;
        setScale(() => Math.min(Math.max(0.5, initialScale * scaleChange), 3));
      }
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLElement>) => {
    if (e.touches.length === 2) {
      const touch1 = e.touches[0] as Touch;
      const touch2 = e.touches[1] as Touch;
      setInitialPinchDistance(getDistance(touch1, touch2));
      setInitialScale(scale);
    }
  };

  const handleTouchEnd = () => {
    setInitialPinchDistance(0);
    setInitialScale(scale);
  };

  // Estilos inline
  const contentStyle = {
    transform: `translate(${offset.x}px, ${offset.y}px) scale(${scale})`,
    transformOrigin: 'center',
  };

  //avoid reload options on mobile
  useEffect(() => {
    const preventPullToRefresh = (event: TouchEvent) => {
      if (event.touches.length > 1) return;

      const startY = event.touches[0].clientY;
      const isAtTop = window.scrollY === 0;

      if (isAtTop && startY > 0) {
        event.preventDefault();
      }
    };

    document.addEventListener('touchmove', preventPullToRefresh, {
      passive: false,
    });

    return () => {
      document.removeEventListener('touchmove', preventPullToRefresh);
    };
  }, []);
  return (
    <>
      <Appbar />
      <PageUnderConstruction />
      <section
        className="App"
        ref={containerRef}
        style={{
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          position: 'relative',
          cursor: 'grab',
          backgroundColor: '#f0f0f0',
        }}
        onMouseDown={handlePointerDown}
        onMouseMove={handlePointerMove}
        onMouseUp={handlePointerUp}
        onMouseLeave={handlePointerUp}
        onWheel={handleWheelOrPinch}
        onTouchStart={(e) => {
          handlePointerDown(e);
          handleTouchStart(e);
        }}
        onTouchMove={(e) => {
          handlePointerMove(e);
          handleWheelOrPinch(e);
        }}
        onTouchEnd={handleTouchEnd}
      >
        <div
          ref={contentRef}
          style={{
            ...contentStyle,
          }}
        >
          <div className="kether">
            <BiggerSephirot {...useBiggerSephirot(kether)} />
          </div>
          <div className="binah-chokma">
            <BiggerSephirot {...useBiggerSephirot(binah)} />
            <BiggerSephirot {...useBiggerSephirot(chokma)} />
          </div>

          <div className="daath">
            <Sephirot {...daath} />
          </div>

          <div className="gevura-chesed">
            <Sephirot {...useSephirot(gevurah)} />
            <Sephirot {...useSephirot(chesed)} />
          </div>

          <div className="tiferet">
            <Sephirot {...useSephirot(tiferet)} />
          </div>

          <div className="hod-netzach">
            <Sephirot {...useSephirot(hod)} />
            <Sephirot {...useSephirot(netzach)} />
          </div>

          <div className="yesod">
            <Sephirot {...useSephirot(yesod)} />
          </div>

          <div className="malkuth">
            <BiggerSephirot {...useBiggerSephirot(malkuth)} />
          </div>
        </div>
      </section>
    </>
  );
}
