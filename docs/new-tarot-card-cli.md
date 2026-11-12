# Assistente de nova carta — `npm run tarot:new`

Cria o **esqueleto completo** de uma carta de Tarot interativa: arquivo de dados
com as regiões em caixas provisórias, bloco de traduções nos quatro idiomas e
registro no catálogo (`majorArcana.ts`).

Ele automatiza os passos 1, 3, 5 e 6 do [guia manual](./interactive-tarot-cards.md)
e deixa o passo 4 (posicionar as regiões) para o **editor visual** no navegador.

```
npm run tarot:new
```

---

## O que ele faz — e o que não faz

| Faz | Não faz |
|-----|---------|
| Cria `src/data/tarot/<slug>.ts` com as regiões em grade provisória. | Não posiciona as regiões na arte. |
| Insere o bloco `tarot.<camel>` nos 4 arquivos de idioma. | Não traduz o texto — em modo rápido, copia o pt-BR como placeholder. |
| Adiciona import e entrada em `cardData`. | Não baixa nem move a imagem (ela já precisa existir em `public/tarot/`). |
| Adiciona a entrada no mosaico, se ainda não existir. | Não cria página/rota (a rota é dinâmica e compartilhada). |
| Calcula o `viewBox` a partir das dimensões reais do JPG/PNG. | Não ajusta o enquadramento nem o `viewBox` além da proporção. |

Depois de criar, o posicionamento é feito com o botão **"🎯 Posicionar
destaques"** na própria single e o JSON exportado é colado de volta no arquivo
de dados — exatamente como no passo 4 do guia manual.

---

## Pré-requisitos

1. A arte já está em `public/tarot/` (`.jpg` ou `.png`).
2. A carta existe no mosaico (`majorArcana`) **ou** o número escolhido está livre.
3. Rode o comando na raiz do projeto.

O comando aceita o caminho da imagem como `/tarot/17_Star.jpg`,
`public/tarot/17_Star.jpg` ou `tarot/17_Star.jpg` — normaliza para o caminho
público `/tarot/17_Star.jpg`.

---

## Uso interativo (recomendado)

```bash
npm run tarot:new
```

O assistente pergunta, em ordem:

```
Slug da carta (kebab-case, ex.: the-star): the-star
Nome em inglês [The Star]:
Número do arcano (0–21) [17]:
Imagem (JPG/PNG) [/tarot/17_Star.jpg]:

Regiões — os textos abaixo são o conteúdo do painel em pt-BR.
Região 1 — id kebab-case: star
Ícone (emoji, opcional): ⭐
Título (pt-BR): A Grande Estrela
Descrição (pt-BR): Oito raios: a estrela de oito pontas é a luz que guia...

Região 2 — id kebab-case (Enter para concluir): water
Ícone (emoji, opcional): 💧
Título (pt-BR): As Águas
Descrição (pt-BR): A água derramada na terra e no lago...

Região 3 — id kebab-case (Enter para concluir):
```

Detalhes:

- **Slug:** kebab-case, minúsculas e hífens. Vira o nome do arquivo, a chave de
  rota e a chave do `cardData`. O id i18n é o camelCase dele (`theStar`).
- **Nome em inglês:** usado como `name` no arquivo de dados e como fallback do
  nome em `en-US`. Se a carta já estiver no `tarotWaite.cards`, o assistente
  sugere o nome existente.
- **Número:** inteiro de 0 a 21; o romano (`XVII`) é derivado automaticamente.
  Se a carta já está no catálogo, o número precisa bater com o do catálogo.
- **Imagem:** precisa existir; as dimensões são lidas do próprio arquivo (sem
  dependências externas) e o `viewBox` é calculado como
  `{ width: 100, height: 100 * altura / largura }`.
- **Regiões:** uma por vez. `Enter` com o id vazio encerra (é preciso pelo menos
  uma). O guia recomenda de **5 a 8**; fora disso o assistente avisa, mas
  aceita até 12. O ícone é opcional.
- **Nome/intro em pt-BR:** o nome sugere o que existir em `tarotWaite`.
- **Traduções:** ao final, ele pergunta se você quer preencher `en-US`, `ja` e
  `he` agora. Se responder **não** (padrão), os títulos e descrições em pt-BR
  são copiados como placeholder (os nomes localizados do `tarotWaite` são
  preservados, quando existirem) e um aviso fica registrado.
- **Confirmação:** mostra o resumo e só grava depois de `Criar a carta com
  esses dados? [S/n]`.

> O modo interativo exige um terminal real (TTY). Em scripts/CI, use
> `--config`.

---

## Uso com JSON (`--config`)

Para automação ou para preparar o conteúdo fora do terminal:

```bash
npm run tarot:new -- --config caminho/da/carta.json
npm run tarot:new -- --config caminho/da/carta.json --dry-run
```

> O `--` depois de `npm run` é necessário para o npm repassar as flags ao
> script.

### Esquema do arquivo

```jsonc
{
  "slug": "the-star",              // obrigatório, kebab-case
  "name": "The Star",              // obrigatório, nome em inglês
  "number": 17,                    // obrigatório, inteiro 0–21
  "image": "public/tarot/17_Star.jpg", // obrigatório, precisa existir
  "meta": { "placeholders": false },   // opcional; true só emite o aviso
  "locales": {
    "pt-BR": {
      "name": "A Estrela",
      "intro": "Sob o céu noturno...",
      "regions": {
        "star": {
          "icon": "⭐",            // opcional, só é lido de pt-BR
          "title": "A Grande Estrela",
          "description": "Oito raios..."
        }
      }
    },
    "en-US": { "name": "...", "intro": "...", "regions": { "star": { "title": "...", "description": "..." } } },
    "ja":    { "name": "...", "intro": "...", "regions": { "star": { "title": "...", "description": "..." } } },
    "he":    { "name": "...", "intro": "...", "regions": { "star": { "title": "...", "description": "..." } } }
  }
}
```

Regras de validação:

- Os quatro idiomas são obrigatórios, com `name`, `intro` e `regions`.
- Os ids de região vêm de `locales["pt-BR"].regions`; todos os outros idiomas
  precisam ter **exatamente** os mesmos ids (sem faltar, sem sobrar).
- Ids de região e o slug precisam ser kebab-case; cada região exige `title` e
  `description` em todos os idiomas.
- `meta.placeholders` não altera nada nos arquivos — só adiciona o aviso de
  revisão de tradução na saída.

### Exemplo mínimo

```json
{
  "slug": "the-star",
  "name": "The Star",
  "number": 17,
  "image": "public/tarot/17_Star.jpg",
  "locales": {
    "pt-BR": {
      "name": "A Estrela",
      "intro": "Explore cada símbolo da carta.",
      "regions": {
        "star": { "icon": "⭐", "title": "A Grande Estrela", "description": "A luz que guia." },
        "water": { "icon": "💧", "title": "As Águas", "description": "A cura que flui." }
      }
    },
    "en-US": {
      "name": "The Star",
      "intro": "Explore each symbol of the card.",
      "regions": {
        "star": { "title": "The Great Star", "description": "The guiding light." },
        "water": { "title": "The Waters", "description": "Healing that flows." }
      }
    },
    "ja": {
      "name": "星",
      "intro": "カードの象徴を探求しましょう。",
      "regions": {
        "star": { "title": "大きな星", "description": "導く光。" },
        "water": { "title": "水", "description": "流れる癒し。" }
      }
    },
    "he": {
      "name": "הכוכב",
      "intro": "גלו כל אחד מסמלי הקלף.",
      "regions": {
        "star": { "title": "הכוכב הגדול", "description": "האור המנחה." },
        "water": { "title": "המים", "description": "ריפוי שזורם." }
      }
    }
  }
}
```

---

## Flags

| Flag | O que faz |
|------|-----------|
| *(nenhuma)* | Modo interativo no terminal. |
| `--config <arquivo>` | Lê a carta de um JSON e não abre prompts. |
| `--dry-run`, `-n` | Valida tudo e mostra os arquivos que seriam alterados + o conteúdo do arquivo de dados, **sem gravar nada**. |
| `--help`, `-h` | Mostra a ajuda. |

---

## O que é gerado

### 1. `src/data/tarot/<slug>.ts`

Exporta o componente em camelCase com as regiões em **caixas provisórias** numa
grade (5 por linha). Cada caixa vem marcada para ser substituída:

```ts
import type { TarotCard } from './types';

export const theStar: TarotCard = {
  id: 'theStar',
  number: 17,
  name: 'The Star',
  image: '/tarot/17_Star.jpg',
  viewBox: { width: 100, height: 166.7 },
  regions: [
    {
      id: 'star',
      icon: '⭐',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 6, y: 8, width: 14, height: 10 },
      i18nKey: 'theStar.regions.star',
    },
    // ...
  ],
};
```

A ordem das regiões é a ordem informada e vale como **fundo → frente**: em
sobreposições, a última região vence o clique.

### 2. `src/i18n/messages/{pt-BR,en-US,ja,he}.json`

Insere `tarot.<camel>` imediatamente antes de `"tarotWaite"`, preservando a
formatação e o tipo de quebra de linha (LF/CRLF) do arquivo. As chaves de
região no JSON são camelCase (`starCrown`, `riverTrees`), e o conteúdo é
validado com `JSON.parse` antes de qualquer gravação.

### 3. `src/data/tarot/majorArcana.ts`

- Adiciona `import { <camel> } from './<slug>';` após os imports existentes.
- Adiciona `'<slug>': <camel>,` ao `cardData`.
- Se a carta ainda não estava no mosaico, cria a entrada
  `{ slug, i18nKey, number, roman, image }` no array `majorArcana`.
- Se já existia, valida `i18nKey` e `number` e atualiza `image` se estiver
  diferente (com aviso).

Todas as alterações no catálogo são verificadas antes de gravar.

---

## Próximos passos depois de criar

O próprio comando imprime esta lista:

1. `npm run dev`
2. Abra `http://localhost:3000/pt-BR/tarot/<slug>`.
3. Clique em **"🎯 Posicionar destaques"** e ajuste as caixas.
4. **"Copiar JSON"** e substitua o array `regions` em `src/data/tarot/<slug>.ts`.
5. `npx tsc --noEmit && npm run build`

Passo 3 e 4 em detalhe: [guia manual, passo 4](./interactive-tarot-cards.md#passo-4--posicionar-as-regiões-editor-visual).

> ⚠ **Placeholders:** se você respondeu "não" para preencher as traduções (ou
> não definiu `meta.placeholders: false` no JSON), `en-US`, `ja` e `he` estarão
> com o texto em português. O comando avisa, mas não impede a criação — revise
> os três arquivos antes de publicar.

---

## Erros comuns

| Mensagem | Causa / solução |
|----------|-----------------|
| `Imagem não encontrada: /tarot/x.jpg (procurada em ...)` | Coloque a arte em `public/tarot/` ou corrija o caminho. |
| `Slug inválido: "The-Star"` | Use kebab-case: `the-star`. |
| `O arquivo src/data/tarot/<slug>.ts já existe.` | A carta já foi criada; edite o arquivo existente. |
| `A carta "<slug>" já está registrada em cardData.` | Remova a entrada antiga ou use outro slug. |
| `Já existe o bloco tarot.<camel> em <locale>.json.` | Apague o bloco antes de rodar de novo (ou use outro slug). |
| `Falta a região "x" em locales["ja"].regions.` | Todos os idiomas precisam das mesmas regiões do pt-BR. |
| `Regiões extras em locales["en-US"]: ...` | Remova as regiões que não existem em pt-BR. |
| `O catálogo usa i18nKey "..." para "<slug>", mas o esperado é "..."` | O `i18nKey` do mosaico precisa ser o camelCase do slug. |
| `O catálogo associa "<slug>" ao número N...` | O número informado precisa bater com a entrada existente. |
| `O número N já pertence a "<outra>" no catálogo.` | Escolha o número correto da carta. |
| `O modo interativo precisa de um terminal.` | Rode direto no terminal ou use `--config`. |
| `Argumento desconhecido: --x` | Confira as flags; use `--help`. |

---

## Relação com o guia manual

- [Guia manual](./interactive-tarot-cards.md) — referência completa da
  arquitetura, do `viewBox`, do catálogo e do posicionamento das regiões.
- `scripts/new-tarot-card.mjs` — implementação do assistente.
- `scripts/tarot-color-map.mjs` — mapa de cores para estimar posições iniciais e
  desenhar polígonos (alternativa ao editor).
- `src/components/Tarot/TarotRegionEditor.tsx` — editor visual usado no passo 4.
