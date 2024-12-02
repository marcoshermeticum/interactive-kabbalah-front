type Theming<T = World | Regent | Sephirot> = {
  backgroundColor?: string;
  fontColor?: string;
  strokeColor?: string;
  startOffset?: Partial<T>;
};

type World = {
  title: string; //above
  aspect: string; //below
};

type Regent = {
  title: string; //above
  name: string;
  defect?: string;
};

type Sephirot = {
  name: string;
  valor: string;
};

type Planet = {
  icon?: string | ReactElement;
  number?: number;
  coordinates?: {
    icon?: { x?: number; y?: number };
    number?: { x?: number; y?: number };
  };
};

export type SimpleSephirot = {
  regent: Regent & Theming<Regent>;
  sephirot: Sephirot & Theming<Sephirot>;
  planet: Planet & Theming;
  className: string;
};

export type BiggerSephirot = {
  world: World & Theming<World>;
  regent: Regent & Theming<Regent>;
  sephirot: Sephirot & Theming<Sephirot>;
  planet: Planet & Theming<Planet>;
  className: string;
};

export type SephirotProps<T extends 'simple' | 'bigger'> = T extends 'simple'
  ? SimpleSephirot
  : BiggerSephirot;
