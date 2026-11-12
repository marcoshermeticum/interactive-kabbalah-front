# Criando cartas de Tarot interativas (na mão)

Guia passo a passo para adicionar uma nova carta interativa de Tarot ao portal.
Uma carta interativa é uma **arte raster (JPG/PNG)** com um **overlay SVG transparente**
por cima, onde cada região clicável (água, taças, anjo, etc.) revela um texto
explicativo num painel lateral.

Usamos a carta **A Temperança** como referência viva ao longo do guia.

---

## Visão geral da arquitetura

Cada carta é composta por quatro peças:

| Peça | Onde fica | O que é |
|------|-----------|---------|
| **Imagem** | `public/tarot/<id>.jpg` | A arte da carta (raster). |
| **Dados da carta** | `src/data/tarot/<id>.ts` | Geometria das regiões + referências de texto. |
| **Traduções** | `src/i18n/messages/*.json` (namespace `tarot`) | Os textos de cada região, por idioma. |
| **Registro no catálogo** | `src/data/tarot/majorArcana.ts` | A entrada do mosaico e o import em `cardData`. |
| **Rota/página** | `src/app/[locale]/tarot/[id]/page.tsx` | Rota **dinâmica compartilhada** — não crie página por carta. |

O componente `src/components/Tarot/InteractiveTarotCard.tsx` já cuida de toda a
interação e do visual responsivo. Você **não precisa mexer nele** para adicionar
cartas novas. Ele entrega:

- **Desktop (md+):** carta à esquerda e um painel de descrição fixo (sticky) à
  direita que atualiza no hover/foco.
- **Mobile:** ao tocar numa região, um *bottom sheet* desliza de baixo com o
  texto — sempre visível, sem precisar rolar. Tem handle de arrastar e botão de
  fechar.
- **Pílulas de símbolos:** uma linha de botões abaixo da carta lista todas as
  regiões; servem para descoberta e para navegar por teclado/toque sem precisar
  "caçar pixel" na imagem.
- **Destaque sutil:** por padrão as regiões têm um contorno dourado tracejado com
  leve pulsação; o botão "Destacar símbolos" realça todas de uma vez.

> **Atenção ao layout da página:** como no mobile o bottom sheet fica fixo na
> base, a `<div>` que envolve o conteúdo da página usa `paddingBottom: '9rem'`
> para o rodapé não ficar escondido atrás do sheet. Mantenha isso ao criar novas
> páginas (ver passo 6).

> **Por que a arte não é SVG?** A ilustração Rider-Waite é raster e tem textura
> (hachuras). Vetorizá-la deixaria o arquivo enorme ou perderia qualidade. Só o
> *overlay* das regiões é SVG — ele é transparente, leve e escala junto com a
> imagem por usar um `viewBox` normalizado.

---

## Pré-requisitos

- A imagem da carta, de preferência com proporção consistente com as demais.
- Saber a **proporção** da imagem (largura × altura em pixels). Você vai usar
  isso para definir o `viewBox`.

---

## Passo 1 — Adicionar a imagem

Salve a arte em `public/tarot/` usando o `id` da carta em kebab-case:

```
public/tarot/the-star.jpg
```

Formatos aceitos: `.jpg` ou `.png`. Anote o caminho público (`/tarot/the-star.jpg`)
e as dimensões em pixels (ex.: 600 × 990).

---

## Passo 2 — Definir o `viewBox`

O `viewBox` é o sistema de coordenadas do overlay. A **regra** é manter a mesma
proporção da imagem, escolhendo a largura como `100` e calculando a altura:

```
height = 100 × (alturaPx / larguraPx)
```

Exemplos:

| Imagem (px) | Proporção | viewBox |
|-------------|-----------|---------|
| 600 × 990 | 1,65 | `{ width: 100, height: 165 }` |
| 600 × 1050 | 1,75 | `{ width: 100, height: 175 }` |
| 500 × 850 | 1,70 | `{ width: 100, height: 170 }` |

Dentro do `viewBox`, as coordenadas são:
- **x**: `0` (esquerda) → `100` (direita)
- **y**: `0` (topo) → `height` (base)

---

## Passo 3 — Criar o arquivo de dados da carta

Crie `src/data/tarot/<id>.ts`. Use a Temperança como molde
(`src/data/tarot/temperance.ts`):

```ts
import type { TarotCard } from './types';

/**
 * The Star (XVII) — Rider-Waite major arcana.
 * viewBox 100 x 165 para a proporção ~600x990 da arte.
 */
export const theStar: TarotCard = {
  id: 'the-star',            // kebab-case, único; usado na rota e nas chaves i18n
  number: 17,                // número do arcano maior (0–21)
  name: 'The Star',          // nome canônico em inglês (fallback)
  image: '/tarot/the-star.jpg',
  viewBox: { width: 100, height: 165 },
  regions: [
    {
      id: 'star',            // único dentro da carta
      icon: '⭐',            // emoji opcional no título do painel
      // Forma simples: tipo + caixa (x, y, width, height) em unidades do viewBox.
      shape: { type: 'circle', x: 40, y: 10, width: 20, height: 20 },
      i18nKey: 'theStar.regions.star',     // chave relativa ao namespace `tarot`
    },
    {
      id: 'water',
      icon: '🌊',
      // Área irregular: use polígono livre (veja o passo 4).
      points: '0,150 30,146 50,150 70,146 100,150 100,167 0,167',
      i18nKey: 'theStar.regions.water',
    },
    // ...demais regiões
  ],
};
```

### Campos do `TarotCard`

A definição canônica está em `src/data/tarot/types.ts`:

- `id` — identificador em kebab-case. Precisa bater com o nome do arquivo, o
  segmento da rota e o prefixo das chaves i18n (ver passo 5).
- `number` — número do arcano (0–21).
- `name` — nome em inglês, usado como fallback de acessibilidade.
- `image` — caminho público da imagem.
- `viewBox` — do passo 2.
- `regions` — lista de regiões interativas.

### Campos de cada `TarotRegion`

- `id` — único dentro da carta.
- `shape` — **(recomendado)** uma forma primitiva + caixa delimitadora. É a
  maneira mais fácil de definir uma região. Veja abaixo.
- `points` — **(avançado)** vértices de polígono livre no formato SVG
  `"x1,y1 x2,y2 ..."`, para áreas orgânicas/irregulares que uma caixa não cobre
  bem. Use `shape` **ou** `points`.
- `i18nKey` — a chave **relativa ao namespace `tarot`** que aponta para um objeto
  com `title` e `description`. Ex.: `theStar.regions.star` resolve para
  `tarot.theStar.regions.star.title` / `.description`.
- `icon` — emoji opcional exibido antes do título.

### Formas (`shape`) — a maneira fácil

Em vez de listar vértices, basta informar o **tipo** e a **caixa** (x, y, largura,
altura) em coordenadas do `viewBox`. `x`/`y` são o canto superior-esquerdo da caixa.

```ts
// Círculo (vira uma elipse que preenche a caixa)
shape: { type: 'circle', x: 76, y: 4, width: 19, height: 26 }

// Retângulo (com cantos arredondados opcionais via `radius`)
shape: { type: 'rect', x: 40, y: 46, width: 20, height: 16, radius: 2 }

// Triângulo (apontando para cima, inscrito na caixa)
shape: { type: 'triangle', x: 40, y: 46, width: 20, height: 16 }
```

| `type` | Renderiza | Observação |
|--------|-----------|------------|
| `circle` | elipse preenchendo a caixa | use `width === height` para um círculo perfeito |
| `rect` | retângulo | `radius` (opcional) arredonda os cantos |
| `triangle` | triângulo apontando para cima | vértice no topo-centro, base na parte de baixo |

Exemplos reais no projeto:
- Sol do Louco → `circle` (`src/data/tarot/the-fool.ts`)
- Triângulo no Quadrado da Temperança → `triangle` (`src/data/tarot/temperance.ts`)

Para a maioria dos símbolos (sol, moeda, cálice, triângulo, janela), uma forma
primitiva já resolve. Só caia no `points` quando a área for realmente irregular
(água ondulada, asas, montanhas).

---

## Passo 4 — Posicionar as regiões

Primeiro decida: **forma primitiva** ou **polígono livre**?

- **Forma (`shape`)** — preferível. Para símbolos compactos (sol, moeda, cálice,
  triângulo, janela), informe `type` + caixa `{ x, y, width, height }`. Veja a
  seção "Formas" no passo 3. Para descobrir a caixa, use o mapa de cores abaixo e
  leia os limites mín/máx de x e y do símbolo.
- **Polígono (`points`)** — para áreas orgânicas/irregulares (água, asas,
  montanhas) que uma caixa não cobre bem.

Em ambos os casos, chutar coordenadas "no olho" leva a destaques desalinhados.
Use o **mapa de cores** abaixo para acertar de primeira — é o método recomendado,
inclusive para IAs.

### Método recomendado: mapa de cores (assertivo)

A ideia: reduzir a imagem para a grade do `viewBox` e classificar cada célula por
cor dominante, gerando um "mapa ASCII" legível onde cada símbolo tem uma cor
distinta (céu amarelo, montanhas azuis, pele laranja, tinta preta, etc.). Assim
você lê as coordenadas exatas de cada símbolo em unidades do `viewBox`.

O script é `scripts/tarot-color-map.mjs` (requer `sharp`: `npm i -D sharp`).

**1. Gere o mapa completo** da carta na resolução do `viewBox`:

```
node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7
```

Saída (trecho) — cada caractere é uma célula do `viewBox`; a régua no topo marca
as colunas (x), o número à esquerda é a linha (y):

```
    |    +    |    +    |    +    |    +    |
...
113 ...YYYYY..kKKWWWWWWWWKk.YY.YYYY...   ← W = cachorro branco surgindo (x~43)
117 ...kkWWWWWWWWWWWWWWWWWWWWWWWWWWWWW   ← W = corpo do cachorro, x~22–55
...
```

Legenda das classes de cor:

| Char | Cor | Char | Cor |
|------|-----|------|-----|
| `W` | branco forte | `R` | vermelho |
| `w` | pálido/creme claro | `Y` | amarelo |
| `C` | creme quente | `S` | pele/laranja |
| `K`/`k` | preto/escuro | `G` | verde |
| `.` | misto/outro | `B` | azul |

**2. Isole um símbolo com o modo `runs`** — lista os intervalos contíguos de uma
ou mais cores por linha, revelando as bordas exatas:

```
node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7 runs B 90 152 3
```

```
y=100 x84-86:B
y=104 x74-76:B x80-87:B
y=117 x50-65:B        ← a faixa azul (montanhas) vai de x50 a x65 nesta linha
...
```

Isso te dá, com precisão, onde a cor começa e termina em cada altura — ou seja,
o contorno do símbolo.

**3. Dê zoom numa área** (resolução 2x) para detalhar formas pequenas:

```
node scripts/tarot-color-map.mjs public/tarot/the-fool.jpg 100 166.7 zoom 4 106 50 130
```

### Da leitura do mapa para uma FORMA (caixa)

1. Identifique a cor do símbolo (ex.: `Y` para o sol amarelo).
2. Pelos `runs`, encontre o **menor x**, **maior x**, **menor y** e **maior y**
   em que a cor aparece.
3. Monte a caixa: `x = menorX`, `y = menorY`, `width = maiorX − menorX`,
   `height = maiorY − menorY`.
4. Escolha o `type` conforme o símbolo (disco → `circle`, moldura → `rect`,
   triângulo → `triangle`).

### Da leitura do mapa para um POLÍGONO (área irregular)

1. Identifique a cor que representa o símbolo (ex.: `B` para montanhas azuis).
2. Pelos `runs`, anote os pares (x_início, x_fim) em algumas alturas (y)
   representativas: topo, meio, base do símbolo.
3. Monte o polígono ligando esses pontos **no sentido horário**, começando pelo
   canto superior-esquerdo. 4 a 8 vértices bastam.
4. As coordenadas já saem em unidades do `viewBox` — é só transcrever para
   `"x1,y1 x2,y2 ..."`.

> **Dica para IAs:** sempre rode o modo `full` primeiro para entender a
> composição, depois `runs` na cor de cada símbolo para extrair bordas. Prefira
> uma **forma** (`shape`) quando o símbolo couber numa caixa; só use `points`
> para áreas irregulares. Não estime coordenadas sem consultar o mapa. Se um
> símbolo não tiver cor distinta (ex.: um detalhe branco sobre fundo claro), use
> `zoom` na região aproximada e procure a transição de classe (`W`→`k`).

### Método alternativo (sem script)

Se não puder rodar o script, abra a imagem num editor que mostre coordenadas do
cursor (Figma, Inkscape, GIMP). Trabalhe em porcentagem (largura = `100`, altura
= valor do `viewBox`) e converta cada ponto:

```
x = (xPx / larguraPx) × 100
y = (yPx / alturaPx) × viewBoxHeight
```

### Ajuste fino no navegador

Depois de montar tudo e rodar a página (passo 6), clique no botão
**"Destacar símbolos"**: todas as regiões aparecem em dourado sobre a arte. Assim
você confere o alinhamento e corrige os `points` até encaixar.

### Dicas

- Polígonos podem se sobrepor levemente; o que estiver **por último** na lista
  `regions` ganha o clique na área sobreposta. Ordene os menores/mais específicos
  por último.
- Formas orgânicas (água, asas) não precisam seguir a borda exata — um contorno
  envolvente basta.
- Mantenha de 5 a 8 regiões por carta. Muitas regiões pequenas ficam difíceis de
  acertar com o toque.
- O classificador de cores em `scripts/tarot-color-map.mjs` é calibrado para a
  paleta Rider-Waite. Se uma edição imprimir com cores diferentes, ajuste os
  limiares na função `classify()`.

---

## Passo 5 — Adicionar as traduções

Os textos de cada região ficam no namespace `tarot` dos **quatro** arquivos de
idioma:

```
src/i18n/messages/pt-BR.json   (português — principal)
src/i18n/messages/en-US.json   (inglês)
src/i18n/messages/ja.json      (japonês)
src/i18n/messages/he.json      (hebraico)
```

> **Importante:** o `next-intl` exige que a chave exista no idioma ativo. Se você
> adicionar a carta só no `pt-BR`, a página vai quebrar nos outros idiomas. O
> mínimo seguro é replicar a estrutura nos quatro arquivos — pode começar com o
> texto em inglês como placeholder nos que você ainda não traduziu.

Dentro do objeto `"tarot"`, adicione um bloco com o `id` da carta **em camelCase**
(ex.: `the-star` → `theStar`). A estrutura espelha o `i18nKey` das regiões:

```jsonc
"tarot": {
  // ...chaves existentes (backToHome, hint, showRegions, temperance, etc.)
  "theStar": {
    "name": "A Estrela",
    "intro": "Texto introdutório exibido no cabeçalho da página.",
    "regions": {
      "star": {
        "title": "A Grande Estrela",
        "description": "O significado simbólico desta região da carta."
      }
      // ...uma entrada por região, com a MESMA chave usada no i18nKey
    }
  }
}
```

### Chaves compartilhadas (já existem, não duplique)

Estas ficam na raiz do namespace `tarot` e são reaproveitadas por todas as cartas:

- `backToHome`, `hint`, `showRegions`, `hideRegions`, `panelEmptyTitle`,
  `panelEmptyHint`.

### Regra de correspondência das chaves

O `i18nKey` no arquivo de dados é **relativo** ao namespace `tarot`:

```
i18nKey: 'theStar.regions.star'
        └── resolve para → tarot.theStar.regions.star.{title,description}
```

Então: `<idCamelCase>.regions.<regionId>`. Se não bater exatamente, o painel
mostra a chave crua em vez do texto.

---

## Passo 6 — Registrar a carta no catálogo

Não existe mais uma página por carta: a rota dinâmica
`src/app/[locale]/tarot/[id]/page.tsx` renderiza qualquer carta registrada. Falta
apenas registrar os dados em `src/data/tarot/majorArcana.ts`, em duas partes.

**1. Entrada no mosaico** — adicione o objeto na posição da ordem RWS (o array
`majorArcana` já contém as 22 cartas; cartas ainda sem arte própria usam o
arquivo existente em `public/tarot/`):

```ts
{ slug: 'the-star', i18nKey: 'theStar', number: 17, roman: 'XVII', image: '/tarot/17_Star.jpg' },
```

**2. Dados interativos** — importe a carta e registre-a em `cardData`. Sem esse
registro a single mostra o estado "Carta em preparação":

```ts
import { theStar } from './the-star';

const cardData: Record<string, TarotCard> = {
  'the-fool': theFool,
  'the-high-priestess': theHighPriestess,
  temperance,
  'the-star': theStar,
};
```

O `slug` é o mesmo em todos os idiomas e é o parâmetro `[id]` da URL. A rota
resultante é `/<locale>/tarot/<slug>` — por exemplo
`http://localhost:3000/pt-BR/tarot/the-star`. Slugs desconhecidos são
redirecionados de volta para `/tarot`.

---

## Passo 7 — Testar e validar

1. Rode o servidor de desenvolvimento:
   ```
   npm run dev
   ```
2. Acesse `http://localhost:3000/pt-BR/tarot/<id>`.
3. Clique em **"Destacar símbolos"** e confira o alinhamento dos polígonos.
   Ajuste os `points` em `src/data/tarot/<id>.ts` conforme necessário.
4. Passe o mouse por cada região e confirme que o painel mostra o texto certo.
5. Valide os tipos e a build:
   ```
   npx tsc --noEmit
   npm run build
   ```
6. Teste os outros idiomas trocando o locale na URL (`/en-US/tarot/<id>`, etc.)
   para garantir que não falta nenhuma chave de tradução.

---

## Checklist rápido

- [ ] Imagem em `public/tarot/<id>.jpg`
- [ ] `viewBox` calculado a partir da proporção da imagem
- [ ] `src/data/tarot/<id>.ts` criado, exportando um `TarotCard`
- [ ] Cada região tem `shape` (forma) **ou** `points` (polígono)
- [ ] Bloco de tradução adicionado nos **4** arquivos de idioma
- [ ] `i18nKey` de cada região bate com a estrutura das traduções
- [ ] Entrada adicionada em `majorArcana` e carta registrada em `cardData`
- [ ] Testado no navegador com "Destacar símbolos"
- [ ] `npx tsc --noEmit` e `npm run build` passam
- [ ] Verificado em todos os idiomas

---

## Problemas comuns

| Sintoma | Causa provável | Solução |
|---------|----------------|---------|
| Painel mostra `theStar.regions.star.title` cru | `i18nKey` não bate com o JSON | Confira o caminho relativo ao namespace `tarot` e o camelCase do id |
| Página quebra em `/en-US` mas funciona em `/pt-BR` | Faltou a chave no idioma | Replique o bloco nos 4 arquivos de idioma |
| Polígono no lugar errado | Coordenadas fora do `viewBox` | Reveja a conversão px → viewBox; lembre que a altura não é 100 |
| Imagem distorcida | Proporção do `viewBox` ≠ da imagem | Recalcule `height = 100 × alturaPx / larguraPx` |
| Região não clica | Outra forma/polígono por cima | Reordene em `regions` (o último vence a sobreposição) |
| Círculo saiu "achatado" (elipse) | `width ≠ height` | Para círculo perfeito, use largura = altura |
| Triângulo apontando para o lado errado | `triangle` só aponta para cima | Se precisar de outra orientação, use `points` |

---

## Arquivos de referência

- Tipos: `src/data/tarot/types.ts`
- Exemplo de carta: `src/data/tarot/temperance.ts`
- Catálogo/registro: `src/data/tarot/majorArcana.ts`
- Rota compartilhada (não criar por carta): `src/app/[locale]/tarot/[id]/page.tsx`
- Componente (não precisa editar): `src/components/Tarot/InteractiveTarotCard.tsx`
- Traduções: `src/i18n/messages/{pt-BR,en-US,ja,he}.json` → namespace `tarot`
