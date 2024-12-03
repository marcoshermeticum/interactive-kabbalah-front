import { ReactElement, useEffect, useRef, useState } from 'react';
import { DraggableAreaStyled } from './DraggableArea.styled';

interface Props {
  children: ReactElement;
}

function DraggableArea({ children }: Props) {
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
      setScale((prevScale: number) =>
        Math.min(Math.max(0.5, prevScale + delta), 3)
      );
    }
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
    <DraggableAreaStyled
      className="App"
      ref={containerRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onWheel={handleWheelOrPinch}
      onTouchStart={(e) => {
        handlePointerDown(e);
      }}
      onTouchMove={(e) => {
        handlePointerMove(e);
        handleWheelOrPinch(e);
      }}
    >
      <div
        ref={contentRef}
        style={{
          ...contentStyle,
        }}
      >
        {children}
      </div>
    </DraggableAreaStyled>
  );
}

export default DraggableArea;
