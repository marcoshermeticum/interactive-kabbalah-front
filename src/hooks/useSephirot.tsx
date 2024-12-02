import {
  BiggerSephirot,
  SimpleSephirot,
} from '@/components/Sephirot/Sephirot.types';
import { useTranslations } from 'next-intl';

export function useBiggerSephirot(object: BiggerSephirot): BiggerSephirot {
  const translation = useTranslations(object.sephirot.name.toLowerCase());
  return {
    ...object,
    world: {
      ...object.world,
      title: translation('world.title'),
      aspect: translation('world.aspect'),
    },
    regent: {
      ...object.regent,
      title: translation('regent.title'),
      name: translation('regent.name'),
      defect: translation('regent.defect'),
    },
    sephirot: {
      ...object.sephirot,
      name: translation('sephirot.name'),
      valor: translation('sephirot.valor'),
    },
  };
}

export default function useSephirot(object: SimpleSephirot): SimpleSephirot {
  const translation = useTranslations(object.sephirot.name.toLowerCase());
  return {
    ...object,
    regent: {
      ...object.regent,
      title: translation('regent.title'),
      name: translation('regent.name'),
      defect: translation('regent.defect'),
    },
    sephirot: {
      ...object.sephirot,
      name: translation('sephirot.name'),
      valor: translation('sephirot.valor'),
    },
  };
}
