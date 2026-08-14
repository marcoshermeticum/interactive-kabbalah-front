import { describe, expect, it } from 'vitest';
import { getTreeVisibilityStyle } from './loadingTreeVisibility';

describe('getTreeVisibilityStyle', () => {
  it('hides the tree while the loading overlay is active', () => {
    expect(getTreeVisibilityStyle(true)).toMatchObject({
      opacity: 0,
      visibility: 'hidden',
      pointerEvents: 'none',
    });
  });

  it('restores the tree when loading ends', () => {
    expect(getTreeVisibilityStyle(false)).toMatchObject({
      opacity: 1,
      visibility: 'visible',
      pointerEvents: 'auto',
    });
  });
});
