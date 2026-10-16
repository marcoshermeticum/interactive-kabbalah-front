import { describe, expect, it } from 'vitest';
import { alchemicalSymbols } from './alchemicalSymbols';
import { getAlchemicalSymbolName, getAlchemicalSymbolTranslationCount } from './alchemicalSymbolTranslations';
import { treeOfLifeCelestialSymbols } from './treeOfLifeCelestialSymbols';

describe('alchemical Unicode symbols', () => {
  it('contains every symbol in the Unicode Alchemical Symbols block', () => {
    expect(alchemicalSymbols).toHaveLength(116);
    expect(alchemicalSymbols[0]).toMatchObject({
      codePoint: 0x1f700,
      character: '🜀',
      name: 'ALCHEMICAL SYMBOL FOR QUINTESSENCE',
    });
    expect(alchemicalSymbols[alchemicalSymbols.length - 1]).toMatchObject({
      codePoint: 0x1f773,
      character: '🝳',
      name: 'ALCHEMICAL SYMBOL FOR HALF OUNCE',
    });
  });

  it('has a unique code point, character, and official name for every entry', () => {
    expect(new Set(alchemicalSymbols.map(({ codePoint }) => codePoint)).size).toBe(116);
    expect(new Set(alchemicalSymbols.map(({ character }) => character)).size).toBe(116);
    expect(new Set(alchemicalSymbols.map(({ name }) => name)).size).toBe(116);
    expect(alchemicalSymbols.every(({ name }) => name.startsWith('ALCHEMICAL SYMBOL FOR '))).toBe(true);
  });

  it('has a localized name for every symbol in each supported language', () => {
    for (const locale of ['en-US', 'pt-BR', 'ja', 'he'] as const) {
      expect(getAlchemicalSymbolTranslationCount(locale)).toBe(alchemicalSymbols.length);
      expect(alchemicalSymbols.every((symbol) => getAlchemicalSymbolName(locale, symbol.translationIndex).length > 0)).toBe(true);
    }

    expect(getAlchemicalSymbolName('en-US', 26)).toBe('Gold');
    expect(getAlchemicalSymbolName('pt-BR', 26)).toBe('Ouro');
    expect(getAlchemicalSymbolName('ja', 26)).toBe('金');
    expect(getAlchemicalSymbolName('he', 26)).toBe('זהב');
  });

  it('keeps the Tree of Life celestial sequence separate and in the requested order', () => {
    expect(treeOfLifeCelestialSymbols.map(({ character }) => character)).toEqual([
      '⊕', '☽', '☿', '♀', '☉', '♂', '♃', '♄', '♅', '♆',
    ]);
    expect(treeOfLifeCelestialSymbols).toHaveLength(10);
    expect(new Set(treeOfLifeCelestialSymbols.map(({ codePoint }) => codePoint)).size).toBe(10);
    expect(treeOfLifeCelestialSymbols.every(({ codePoint, character }) => String.fromCodePoint(codePoint) === character)).toBe(true);
    expect(treeOfLifeCelestialSymbols.some(({ codePoint }) => alchemicalSymbols.some((symbol) => symbol.codePoint === codePoint))).toBe(false);
  });
});
