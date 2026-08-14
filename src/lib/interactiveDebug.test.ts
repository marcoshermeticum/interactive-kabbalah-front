import { describe, expect, it } from 'vitest';
import { getDefaultDebugOffsets } from './interactiveDebug';

describe('getDefaultDebugOffsets', () => {
  it('exposes independent x, y and size values for each text layer', () => {
    const offsets = getDefaultDebugOffsets('chokmah');

    expect(offsets.icon).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
    expect(offsets.number).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
    expect(offsets.subtitle).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
    expect(offsets.title).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
    expect(offsets.valor).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
    expect(offsets.world).toMatchObject({ x: expect.any(Number), y: expect.any(Number), size: expect.any(Number) });
  });
});
