'use client';

import PageUnderConstruction from '@/components/UnderConstruction/UnderConstruction';
import Appbar from '@/components/Appbar';
import useSephirot, { useBiggerSephirot } from '@/hooks/useSephirot';
import DraggableArea from '@/components/DragglableArea';
import Path from '@/components/Paths';
import KabbalahTree from '@/components/KabbalahTree';

export default function HomePage() {
  return (
    <>
      <Appbar />
      <PageUnderConstruction />
      <DraggableArea>
        <KabbalahTree />
      </DraggableArea>
    </>
  );
}
