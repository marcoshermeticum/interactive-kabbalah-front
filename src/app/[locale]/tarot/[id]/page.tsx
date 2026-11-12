import { redirect } from '@/i18n/routing';
import type { Locale } from '@/i18n/routing';
import { getMajorArcana } from '@/data/tarot/majorArcana';
import TarotCardDetail from './TarotCardDetail';

type Props = {
  params: Promise<{ locale: string; id: string }>;
};

/**
 * Single card route. Known slugs render the detail component (interactive
 * card or "coming soon"); unknown slugs fall back to the catalog mosaic.
 *
 * The two already-implemented cards also have their own static routes
 * (`/tarot/the-fool`, `/tarot/temperance`), which take precedence over this
 * dynamic segment.
 */
export default async function TarotCardPage({ params }: Props) {
  const { locale, id } = await params;
  const entry = getMajorArcana(id);

  if (!entry) {
    redirect({ href: '/tarot-waite', locale: locale as Locale });
    return null;
  }

  return <TarotCardDetail entry={entry} />;
}
