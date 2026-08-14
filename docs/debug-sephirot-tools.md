# Debug tools

Ative o modo visual com:

```text
?debug-sephirot-text=1
```

A API pública fica em:

```js
window.InteractiveDebug
```

Compatibilidade antiga:

```js
window.__sephirotTextDebug
```

## Comandos úteis

```js
// arraste da árvore
window.InteractiveDebug.disableDrag();
window.InteractiveDebug.enableDrag();
window.InteractiveDebug.getDragEnabled();

// tooltips da árvore
window.InteractiveDebug.disableTreeTooltips();
window.InteractiveDebug.enableTreeTooltips();
window.InteractiveDebug.getTreeTooltipsEnabled();

// painel de debug das Sephirots
window.InteractiveDebug.showDebugText('kether');
window.InteractiveDebug.hideDebugText();
window.InteractiveDebug.toggleDebugText();
window.InteractiveDebug.setDebugTextVisible(true, 'kether');

// ajuste fino de texto
window.InteractiveDebug.getDebugOffsets('kether');
window.InteractiveDebug.setDebugTextOffset('kether', 'title', -40);
window.InteractiveDebug.setDebugTextPosition('kether', 90, -80);
window.InteractiveDebug.resetDebugOffsets('kether');

// dados da Sephirah
window.InteractiveDebug.getSephirotInformationByName('kether');
window.InteractiveDebug.getAllSephirotDebugData();
```

## Observações

- `disableTreeTooltips()` desliga hover e pin de tooltip da árvore e dos nodos de Sephirot.
- `showDebugText()` e `hideDebugText()` controlam a visibilidade do painel de edição visual.
- Os métodos também disparam o estado React por meio do evento global `tree-tooltips-status-change` e do `sephirot-debug-visibility-change`.
- Os offsets aceitam: `icon`, `number`, `subtitle`, `title`, `valor`, `world`.

## Exemplo rápido

```js
window.InteractiveDebug.disableTreeTooltips();
window.InteractiveDebug.showDebugText('kether');
window.InteractiveDebug.setDebugTextOffset('kether', 'title', -42);
console.log(window.InteractiveDebug.getSephirotInformationByName('kether'));
```
