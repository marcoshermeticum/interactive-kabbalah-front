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
import Appbar from '@/components/Appbar';
import useSephirot, { useBiggerSephirot } from '@/hooks/useSephirot';
import DraggableArea from '@/components/DragglableArea';

export default function HomePage() {
  return (
    <>
      <Appbar />
      <PageUnderConstruction />
      <DraggableArea>
        <>
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
        </>
      </DraggableArea>
    </>
  );
}
