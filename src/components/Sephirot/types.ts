export type SephirotData = {
  name: string;
  number: number;
  icon: string;
  planetName: string;
  valor: string;
  regent: {
    title: string;
    name: string;
    defect?: string;
  };
  world?: {
    title: string;
    aspect: string;
  };
  archetypes: string[];
  minorArcana: string[];
  colors: {
    outer: string;
    middle: string;
    inner: string;
    text: string;
    stroke: string;
  };
};
