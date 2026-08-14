# Debug tools

Ative o modo visual com:

```text
?debug-sephirot-text=1
```

Isso exibe um painel draggable sobre cada sephirah com sliders de X, Y e Font-size para cada elemento de texto (icon, number, subtitle, title, valor, world). O JSON dos offsets aparece na parte inferior do painel — copie para aplicar valores calibrados.

A API pública fica em:

```js
window.InteractiveDebug
```

Compatibilidade antiga (thin wrapper):

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
window.InteractiveDebug.setDebugTextOffset('kether', 'title', { x: 0, y: -40, size: 15 });
window.InteractiveDebug.setDebugTextOffset('kether', 'number', { x: 0, y: 12, size: 24 });
window.InteractiveDebug.setDebugTextPosition('kether', 90, -80);
window.InteractiveDebug.resetDebugOffsets('kether');

// fonte da árvore
window.InteractiveDebug.getTreeTextFontFamily();
window.InteractiveDebug.getTreeTextFontOptions();
window.InteractiveDebug.setTreeTextFontFamily("'Cormorant Garamond', Georgia, serif");
window.InteractiveDebug.resetTreeTextFontFamily();

// dados da Sephirah
window.InteractiveDebug.getSephirotInformationByName('kether');
window.InteractiveDebug.getAllSephirotDebugData();

// cores de debug (aba design)
window.InteractiveDebug.setDebugColor('kether', 'outer', '#1a0033');
window.InteractiveDebug.setDebugColor('kether', 'middle', '#330066');
window.InteractiveDebug.setDebugColor('kether', 'inner', '#4d0099');
window.InteractiveDebug.setDebugColor('kether', 'stroke', 'gold');
window.InteractiveDebug.setDebugColor('kether', 'text', '#fff');
window.InteractiveDebug.setDebugColors('kether', { outer: '#1a0033', middle: 'rgb(51,0,102)' });
window.InteractiveDebug.getDebugColors('kether');
window.InteractiveDebug.resetDebugColors('kether');
window.InteractiveDebug.resetDebugColors(); // reset all

// borda decorativa (global)
window.InteractiveDebug.setTreeBorderOpacity(0.5); // 0 = oculta, 1 = total
window.InteractiveDebug.getTreeBorderOpacity();
window.InteractiveDebug.hideTreeBorders();
window.InteractiveDebug.showTreeBorders();
```

## Painel de debug visual

Ao ativar `?debug-sephirot-text=1`, cada sephirah exibe um painel draggable com duas abas:

- **texto**: sliders de X, Y e Font-size para cada elemento (icon, number, subtitle, title, valor, world)
- **design**: inputs de cor (hex, rgb, ou nome CSS) para cada camada visual (externo, médio, interno, borda, texto) + slider de opacidade da borda decorativa (override por sephirot)

Os valores são aplicados em tempo real. O JSON dos valores aparece na parte inferior de cada aba para fácil copy/paste.

O painel global "Tree font debug" (perto de Ain Soph, topo da árvore) controla:
- **Fonte**: dropdown com opções tipográficas
- **Borda global**: slider 0–100% que controla a opacidade de todas as bordas decorativas (anéis cinza das sephirots + contornos dos caminhos)

## Observações
- `showDebugText()` e `hideDebugText()` controlam a visibilidade do painel de edição visual.
- Os métodos disparam estado React via eventos globais `tree-tooltips-status-change` e `sephirot-debug-visibility-change`.
- Os offsets aceitam: `icon`, `number`, `subtitle`, `title`, `valor`, `world`.
- `setDebugTextOffset` aceita um número como atalho para `{ y: valor }` — ex: `setDebugTextOffset('kether', 'title', -42)` equivale a `{ ...current, y: -42 }`.
- `window.__sephirotTextDebug` é um thin wrapper que delega para `InteractiveDebug`. Prefira a API principal.

## Exemplo rápido

```js
window.InteractiveDebug.disableTreeTooltips();
window.InteractiveDebug.showDebugText('kether');
window.InteractiveDebug.setDebugTextOffset('kether', 'title', -42);
console.log(window.InteractiveDebug.getSephirotInformationByName('kether'));
```
