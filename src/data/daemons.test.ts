import { describe, it, expect } from 'vitest';
import { existsSync } from 'fs';
import { resolve } from 'path';
import { daemons } from './daemons';

describe('Daemon sigil images', () => {
  const localSigils = daemons.filter((d) => d.sigilUrl.startsWith('/sigils/'));
  const externalSigils = daemons.filter((d) => !d.sigilUrl.startsWith('/sigils/'));

  it('all local sigil files exist in public/', () => {
    const missing: string[] = [];
    for (const daemon of localSigils) {
      const filePath = resolve(__dirname, '../../public', daemon.sigilUrl.slice(1)); // remove leading /
      if (!existsSync(filePath)) {
        missing.push(`${daemon.canonicalName}: ${daemon.sigilUrl} → ${filePath}`);
      }
    }
    expect(missing).toEqual([]);
  });

  it('all daemons have a non-empty sigilUrl', () => {
    const invalid = daemons.filter((d) => !d.sigilUrl || d.sigilUrl.trim() === '');
    expect(invalid.map((d) => d.canonicalName)).toEqual([]);
  });

  it('local sigil URLs use correct format (/sigils/{name}.png)', () => {
    for (const daemon of localSigils) {
      expect(daemon.sigilUrl).toMatch(/^\/sigils\/[a-z0-9-]+\.png$/);
    }
  });

  it('all daemons with qliphah associations have at least one local sigil OR valid external URL', () => {
    const qliphahDaemons = daemons.filter((d) =>
      d.associations.some((a) => a.type === 'qliphah')
    );
    for (const daemon of qliphahDaemons) {
      expect(daemon.sigilUrl).toBeTruthy();
      // Either local or external
      expect(
        daemon.sigilUrl.startsWith('/sigils/') || daemon.sigilUrl.startsWith('https://')
      ).toBe(true);
    }
  });

  it('reports which daemons are using external URLs (expected to show fallback)', () => {
    // This is informational — shows which daemons will show the 🔏 fallback
    console.log(`\nDaemons with LOCAL sigils (${localSigils.length}):`);
    localSigils.forEach((d) => console.log(`  ✓ ${d.canonicalName} → ${d.sigilUrl}`));
    console.log(`\nDaemons with EXTERNAL sigils (${externalSigils.length}) — will show fallback if unreachable:`);
    externalSigils.forEach((d) => console.log(`  ⚠ ${d.canonicalName} → ${d.sigilUrl}`));
    expect(true).toBe(true);
  });
});
