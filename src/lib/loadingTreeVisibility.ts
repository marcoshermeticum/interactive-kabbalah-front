export function getTreeVisibilityStyle(isLoading: boolean) {
  return {
    opacity: isLoading ? 0 : 1,
    visibility: isLoading ? 'hidden' : 'visible',
    pointerEvents: isLoading ? 'none' : 'auto',
    transition: 'opacity 180ms ease, visibility 180ms ease',
  } as const;
}
