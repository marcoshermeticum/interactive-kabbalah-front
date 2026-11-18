import { getMajorArcana, type MajorArcanaEntry } from './majorArcana';
import { getMinorArcana, type MinorArcanaEntry } from './minorArcana';

/** Any card of the 78-card deck, tagged by arcana. */
export type TarotEntry =
  | { kind: 'major'; entry: MajorArcanaEntry }
  | { kind: 'minor'; entry: MinorArcanaEntry };

/** Resolves a URL slug to a major or minor arcana entry. */
export function getTarotEntry(slug: string): TarotEntry | undefined {
  const major = getMajorArcana(slug);
  if (major) return { kind: 'major', entry: major };

  const minor = getMinorArcana(slug);
  if (minor) return { kind: 'minor', entry: minor };

  return undefined;
}
