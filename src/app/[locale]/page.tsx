'use client';

import DraggableArea from '@/components/DraggableArea/DraggableArea';
import KabbalahTree from '@/components/KabbalahTree/KabbalahTree';
import LanguageSelector from '@/components/LanguageSelector';

export default function HomePage() {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0c0a13]/90 backdrop-blur border-b border-white/10 px-4 py-2 flex items-center justify-between">
        <h1 className="text-sm font-medium tracking-wide text-white/80">Interactive Kabbalah</h1>
        <LanguageSelector />
      </header>
      <DraggableArea>
        <KabbalahTree />
      </DraggableArea>
    </>
  );
}
