# Assistente de nova carta — `npm run tarot:new`

Cria o **esqueleto completo** de uma carta de Tarot interativa: arquivo de dados
com as regiões em caixas provisórias, bloco de traduções nos quatro idiomas e
registro no catálogo (`majorArcana.ts`).

**O script não pergunta nome, intro, título nem descrição.** Todo o conteúdo
multilíngue fica em [`docs/tarot-content/<slug>.json`](#conteúdo-multilíngue-docstarot-content)
— pt-BR, en-US, ja e he — e o comando apenas lê esse arquivo e gera o código.

O fluxo completo é:

```
npm run tarot:new  →  escolher a carta  →  arquivos gerados  →  posicionar destaques
```

---

## O que ele faz — e o que não faz

| Faz | Não faz |
|-----|---------|
| Lê todo o conteúdo de `docs/tarot-content/<slug>.json`. | Não pergunta título, descrição, intro ou nome. |
| Cria `src/data/tarot/<slug>.ts` com as regiões em grade provisória. | Não posiciona as regiões na arte. |
| Insere o bloco `tarot.<camel>` nos 4 arquivos de idioma. | Não traduz: as 4 línguas já precisam estar preenchidas no JSON. |
| Adiciona import e entrada em `cardData`. | Não baixa nem move a imagem (ela já precisa existir em `public/tarot/`). |
| Adiciona a entrada no mosaico, se ainda não existir. | Não altera o documento de regiões. |
| Calcula o `viewBox` a partir das dimensões reais do JPG/PNG. | Não ajusta o enquadramento além da proporção. |
| Deixa a rota `/[locale]/tarot/<slug>` funcionando (é dinâmica). | — |
| Inclui as 4 URLs da carta no `sitemap.xml` (via `cardData`). | — |

Depois de criar, o posicionamento é feito com o botão **"🎯 Posicionar
destaques"** na própria single e o JSON exportado é colado de volta no arquivo
de dados — exatamente como no passo 4 do guia manual.

> **Rota:** não existe arquivo de rota por carta. A página
> [`src/app/[locale]/tarot/[id]/page.tsx`](../src/app/[locale]/tarot/[id]/page.tsx)
> resolve qualquer slug pelo catálogo, então a carta já abre em
> `/pt-BR/tarot/<slug>` assim que o comando termina.

---

## Pré-requisitos

1. O conteúdo está em `docs/tarot-content/<slug>.json`, completo nos 4 idiomas.
2. A arte já está em `public/tarot/` (`.jpg` ou `.png`).
3. A carta existe no mosaico (`majorArcana`) **ou** o número escolhido está livre.
4. Rode o comando na raiz do projeto.

O comando aceita o caminho da imagem como `/tarot/17_Star.jpg`,
`public/tarot/17_Star.jpg` ou `tarot/17_Star.jpg` — normaliza para o caminho
público `/tarot/17_Star.jpg`.

---

## Conteúdo multilíngue (`docs/tarot-content`)

Cada carta tem um arquivo JSON com a estrutura abaixo. É a **única fonte de
texto** do comando:

```jsonc
{
  "slug": "the-star",              // kebab-case, igual ao nome do arquivo
  "number": 17,                    // inteiro 0–21 — vira o romano automaticamente
  "image": "/tarot/17_Star.jpg",   // precisa existir em public/
  "regions": [                     // ordem = fundo → frente (a última vence o clique)
    { "id": "great-star", "icon": "⭐" },
    { "id": "seven-stars", "icon": "✨" }
    // ...
  ],
  "locales": {
    "pt-BR": {
      "name": "A Estrela",
      "intro": "Sob o céu noturno...",
      "regions": {
        "great-star": { "title": "A Grande Estrela", "description": "Oito raios..." }
      }
    },
    "en-US": { "name": "The Star", "intro": "...", "regions": { "great-star": { "title": "...", "description": "..." } } },
    "ja":    { "name": "星",       "intro": "...", "regions": { "great-star": { "title": "...", "description": "..." } } },
    "he":    { "name": "הכוכב",    "intro": "...", "regions": { "great-star": { "title": "...", "description": "..." } } }
  }
}
```

Regras validadas antes de gerar qualquer arquivo:

- `slug`, `number` e `image` obrigatórios; `image` precisa existir.
- `regions` é uma lista ordenada de `{ id, icon }`; os ids são kebab-case,
  únicos, e definem a ordem das regiões na carta.
- Os quatro idiomas são obrigatórios, com `name`, `intro` e **todas** as regiões
  da lista — cada uma com `title` e `description` não vazios.
- As chaves de região no JSON de idioma são camelCase (`great-star` →
  `greatStar`); o script faz a conversão.
- Os ícones ficam no topo (`regions[].icon`), não por idioma.

O documento [`tarot-major-arcana-regions.md`](./tarot-major-arcana-regions.md)
continua sendo a referência dos símbolos em pt-BR; os arquivos de
`docs/tarot-content/` acrescentam as traduções e os nomes nos 4 idiomas.

---

## Uso interativo — menu de cartas pendentes

```bash
npm run tarot:new
```

O comando lista apenas as cartas que ainda **não** têm arquivo de dados nem
entrada em `cardData`:

```
Cartas pendentes em docs/tarot-content:
  1) IV · O Imperador — the-emperor
  2) V · O Hierofante — the-hierophant
  3) VI · Os Enamorados — the-lovers
  ...

Escolha a carta (número ou slug) [1]:
```

- `Enter` escolhe a primeira; também aceita o número da lista ou o slug.
  Entradas inválidas são recusadas com uma mensagem — sem reiniciar o menu.
- Se houver **exatamente uma** carta pendente, ela é selecionada sozinha,
  sem prompt.
- Cartas com conteúdo incompleto (algum idioma ou região vazio) ficam **fora da
  lista** e são mencionadas abaixo dela. O erro só aparece se todas estiverem
  incompletas, apontando o arquivo e os campos que faltam.
- Se todas as cartas do documento já estiverem implementadas:
  `Nenhuma carta pendente: todas as cartas de docs/tarot-content já estão implementadas.`

> O modo interativo exige um terminal real (TTY). Em scripts/CI, use
> `--card <slug>`.

---

## Criar direto por slug ou número (`--card`)

```bash
npm run tarot:new -- --card the-star
npm run tarot:new -- --card 17
npm run tarot:new -- --card the-star --dry-run
```

Lê `docs/tarot-content/the-star.json` e gera os arquivos sem abrir nenhum
prompt. Aceita o slug ou o número do arcano. Se a carta já estiver implementada,
o comando avisa em vez de sobrescrever.

---

## Importar do documento de regiões (`--from-doc`)

```bash
npm run tarot:new -- --from-doc the-star
```

- Se existir `docs/tarot-content/<slug>.json`, o comando usa esse conteúdo
  completo — o mesmo caminho do `--card`.
- Se **não** existir, ele lê a seção `## XVII · A Estrela (\`the-star\`)` de
  [`docs/tarot-major-arcana-regions.md`](./tarot-major-arcana-regions.md):
  nome pt-BR, intro, número e nome em inglês (tabela-resumo), regiões na ordem
  da tabela e imagem (pelo mapa de renomeação). Como o documento só tem pt-BR,
  as outras três línguas recebem o texto em português como placeholder e o
  aviso de revisão é exibido.

Use `--dry-run` para conferir a leitura antes de gravar.

Limitações do modo só-documento:

- A carta precisa ter uma seção com tabela de regiões no documento (a
  Temperança, por exemplo, ainda não tem — use `--config`).
- A imagem precisa existir em `public/tarot/` com o nome do mapa ou `<slug>.jpg`.
- O documento não tem coordenadas — as caixas continuam provisórias até você
  passar pelo editor (passo 4).

---

## Uso com JSON completo (`--config`)

Para automação ou para gerar a carta a partir de um JSON avulso no formato
"resolvido" (nome por idioma + regiões já por locale):

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
| *(nenhuma)* | Menu das cartas pendentes em `docs/tarot-content` (TTY). |
| `--card <slug\|número>` | Cria a carta direto do conteúdo, sem prompts. |
| `--from-doc <slug>` | Usa o conteúdo do JSON quando existir; senão importa do documento de regiões. |
| `--config <arquivo>` | Lê a carta de um JSON completo e não abre prompts. |
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
      id: 'great-star',
      icon: '⭐',
      // TODO: position — placeholder box, replace with the editor output.
      shape: { type: 'rect', x: 6, y: 8, width: 14, height: 10 },
      i18nKey: 'theStar.regions.greatStar',
    },
    // ...
  ],
};
```

A ordem das regiões é a ordem do JSON e vale como **fundo → frente**: em
sobreposições, a última região vence o clique.

### 2. `src/i18n/messages/{pt-BR,en-US,ja,he}.json`

Insere `tarot.<camel>` imediatamente antes de `"tarotWaite"`, preservando a
formatação e o tipo de quebra de linha (LF/CRLF) do arquivo. As chaves de
região no JSON são camelCase (`greatStar`, `sevenStars`), e o conteúdo é
validado com `JSON.parse` antes de qualquer gravação.

### 3. `src/data/tarot/majorArcana.ts`

- Adiciona `import { <camel> } from './<slug>';` após os imports existentes.
- Adiciona `'<slug>': <camel>,` ao `cardData`.
- Se a carta ainda não estava no mosaico, cria a entrada
  `{ slug, i18nKey, number, roman, image }` no array `majorArcana`.
- Se já existia, valida `i18nKey` e `number` e atualiza `image` se estiver
  diferente (com aviso).

Todas as alterações no catálogo são verificadas antes de gravar.

### 4. Rota e sitemap

Nada a fazer: a página dinâmica
[`src/app/[locale]/tarot/[id]/page.tsx`](../src/app/[locale]/tarot/[id]/page.tsx)
consulta o catálogo e passa a servir `/pt-BR/tarot/<slug>` (e os demais locales)
automaticamente. O comando imprime a rota pronta no final.

O [`src/app/sitemap.ts`](../src/app/sitemap.ts) lista as cartas que estão em
`cardData` — ou seja, as cartas já criadas. Como o comando adiciona a carta
nesse objeto, as 4 URLs (`/pt-BR`, `/en-US`, `/ja`, `/he` + `/tarot/<slug>`)
entram no `sitemap.xml` no próximo `npm run build`, sem editar nenhum arquivo
de sitemap. Cartas ainda não criadas (estado "em breve") ficam fora dele.

---

## Próximos passos depois de criar

O próprio comando imprime esta lista:

1. `npm run dev`
2. Abra `http://localhost:3000/pt-BR/tarot/<slug>`.
3. Clique em **"🎯 Posicionar destaques"** e ajuste as caixas.
4. **"Copiar JSON"** e substitua o array `regions` em `src/data/tarot/<slug>.ts`.
5. `npx tsc --noEmit && npm run build`

Passo 3 e 4 em detalhe: [guia manual, passo 4](./interactive-tarot-cards.md#passo-4--posicionar-as-regiões-editor-visual).

> ⚠ **Placeholders:** só acontecem no modo `--from-doc` sem JSON de conteúdo.
> Nesse caso `en-US`, `ja` e `he` ficam com o texto em português, o comando
> avisa, mas não impede a criação — revise os três arquivos antes de publicar.
> No fluxo normal (`--card`/menu) isso não ocorre: o JSON exige as 4 línguas.

---

## Erros comuns

| Mensagem | Causa / solução |
|----------|-----------------|
| `Não encontrei docs/tarot-content/<slug>.json...` | O arquivo de conteúdo não existe — crie-o ou use `--from-doc`. |
| `O conteúdo de docs/tarot-content/<slug>.json está incompleto:` | Preencha os campos listados (idioma/região) antes de rodar. |
| `A carta "<slug>" já está implementada...` | A carta já tem arquivo de dados ou `cardData`; edite o código existente. |
| `Nenhuma carta pendente está com o conteúdo completo.` | Todos os rascunhos têm traduções faltando; complete um arquivo. |
| `Nenhuma carta pendente: todas as cartas...` | Não há nada para criar — o catálogo já cobre todo o conteúdo. |
| `Imagem não encontrada: /tarot/x.jpg (procurada em ...)` | Coloque a arte em `public/tarot/` ou corrija `image` no JSON. |
| `Não encontrei a carta "<slug>" em docs/tarot-major-arcana-regions.md.` | `--from-doc` não achou a seção e não há JSON de conteúdo — confira a grafia. |
| `A seção de "<slug>" não tem uma tabela de regiões no documento.` | Adicione a tabela ou use `--config`. |
| `Não encontrei o número de "<slug>" na tabela-resumo do documento.` | Inclua ou corrija a linha da carta na tabela-resumo. |
| `Imagem não encontrada para "<slug>"...` | O mapa de renomeação não resolveu; adicione `public/tarot/<slug>.jpg` ou use `--config`. |
| `Slug inválido: "The-Star"` | Use kebab-case: `the-star`. |
| `O arquivo src/data/tarot/<slug>.ts já existe.` | A carta já foi criada; edite o arquivo existente. |
| `A carta "<slug>" já está registrada em cardData.` | Remova a entrada antiga ou use outro slug. |
| `Já existe o bloco tarot.<camel> em <locale>.json.` | Apague o bloco antes de rodar de novo (ou use outro slug). |
| `Falta a região "x" em locales["ja"].regions.` | Todos os idiomas precisam das mesmas regiões do pt-BR. |
| `Regiões extras em locales["en-US"]: ...` | Remova as regiões que não existem em pt-BR. |
| `O catálogo usa i18nKey "..." para "<slug>", mas o esperado é "..."` | O `i18nKey` do mosaico precisa ser o camelCase do slug. |
| `O catálogo associa "<slug>" ao número N...` | O número informado precisa bater com a entrada existente. |
| `O número N já pertence a "<outra>" no catálogo.` | Escolha o número correto da carta. |
| `O modo interativo precisa de um terminal.` | Rode direto no terminal ou use `--card <slug>`. |
| `Argumento desconhecido: --x` | Confira as flags; use `--help`. |

---

## Relação com o guia manual

- [Guia manual](./interactive-tarot-cards.md) — referência completa da
  arquitetura, do `viewBox`, do catálogo e do posicionamento das regiões.
- [Catálogo de regiões](./tarot-major-arcana-regions.md) — fonte dos símbolos em
  pt-BR e resumo das 22 cartas.
- `docs/tarot-content/` — fonte multilíngue consumida pelo `--card` e pelo menu.
- `scripts/new-tarot-card.mjs` — implementação do assistente.
- `scripts/tarot-color-map.mjs` — mapa de cores para estimar posições iniciais e
  desenhar polígonos (alternativa ao editor).
- `src/components/Tarot/TarotRegionEditor.tsx` — editor visual usado no passo 4.
