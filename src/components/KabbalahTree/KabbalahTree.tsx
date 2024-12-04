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
import useSephirot, { useBiggerSephirot } from '@/hooks/useSephirot';
import Path from '../Paths';
import { KabbalahTreeContainerStyled } from './KabbalahTree.styled';

function KabbalahTree() {
  return (
    <KabbalahTreeContainerStyled>
      <div className="sephirot-container kether">
        <Path className="path beth ב" type="diagonal" degree={140} />

        <BiggerSephirot {...useBiggerSephirot(kether)} />

        <Path className="path aleph א" type="diagonal" degree={35} />
      </div>
      <div className="sephirot-container binah-chokma">
        <Path className="path chet ד" type="vertical" />
        <BiggerSephirot {...useBiggerSephirot(binah)} />
        <Path className="path daleth ד" type="horizontal" />
        <BiggerSephirot {...useBiggerSephirot(chokma)} />
        <Path className="path vav ו" type="vertical" />
      </div>

      <div className="sephirot-container daath">
        <Sephirot {...daath} />
      </div>

      <div className="sephirot-container gevura-chesed">
        <Sephirot {...useSephirot(gevurah)} />
        <Sephirot {...useSephirot(chesed)} />
      </div>

      <div className="sephirot-container tiferet">
        <Sephirot {...useSephirot(tiferet)} />
      </div>

      <div className="sephirot-container hod-netzach">
        <Sephirot {...useSephirot(hod)} />
        <Sephirot {...useSephirot(netzach)} />
      </div>

      <div className="sephirot-container yesod">
        <Sephirot {...useSephirot(yesod)} />
      </div>

      <div className="sephirot-container malkuth">
        <BiggerSephirot {...useBiggerSephirot(malkuth)} />
      </div>
    </KabbalahTreeContainerStyled>
  );
}

export default KabbalahTree;
