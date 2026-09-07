# Landing Page — Cassino Hermético Educativo

## Conceito

Plataforma educativa com estética de cassino/gaming. Cada "jogo" é um símbolo sagrado interativo.

---

## Estrutura da Página

### Header
- Logo (mrviniciux.png, h-8 w-auto)
- Barra de navegação com categorias (horizontal, scrollável no mobile)
- Busca por símbolo/entidade

### Hero Banner
- Carousel rotativo com destaques:
  - "Árvore da Vida Interativa — Explore as 10 Sephirots"
  - "72 Daemons da Goetia — Sigilos e Correspondências"
  - "Tarot de Waite — 78 Arcanos Interativos"
  - "Mapa Astral Mundi — Posições Planetárias em Tempo Real"

### Grid de "Jogos" (Símbolos Interativos)
Cards visuais estilo cassino (thumbnail animada, título, badge de categoria).

---

## Categorias

### 🌳 Símbolos Sagrados (os "jogos")
| Símbolo | Descrição | Status |
|---------|-----------|--------|
| Árvore da Vida | 10 Sephirots + 22 Caminhos + Qliphoth | ✅ Existente |
| 7 Chakras | Muladhara → Sahasrara, kundalini, correspondências | 🔜 Novo |
| Semente da Vida | 7 círculos sobrepostos, geometria sagrada | 🔜 Novo |
| Flor da Vida | Expansão da semente, 19 círculos | 🔜 Novo |
| Mapa Mundi Astrológico | Mapa interativo com casas, signos, planetas | 🔜 Novo |
| Cubo de Metatron | Geometria sagrada 3D interativa | 🔜 Novo |
| Sigillum Dei Aemeth | Selo de John Dee, sistema enoquiano | 🔜 Novo |

### 🔮 Magia Hermética
- Qabalah Hermética (Golden Dawn, A∴A∴, OTO)
- Alquimia (Nigredo, Albedo, Citrinitas, Rubedo)
- Correspondências planetárias e elementais
- Sistema de graus da Golden Dawn (Neophyte → Ipsissimus)
- As 7 leis herméticas (Caibalion)

### 👁️ Magia Enoquiana
- Tábuas de Vigia (Watchtowers) — 4 elementais
- 30 Aethyrs (Aires/regiões espirituais)
- Sigillum Dei Aemeth
- Alfabeto Enoquiano (21 letras)
- Sistema Heptárquico (7 reis e príncipes planetários)
- Chamadas Enoquianas (19 Calls)

### 🐉 Magia Draconiana
- Caminho das Qliphoth (Árvore Invertida)
- Corrente Draconiana (Temple of Ascending Flame)
- Túneis de Set (22 Túneis do Nightside)
- Deidades Draconianas (Tiamat, Leviathan, Apep, Typhon)
- Kundalini Negra / Fogo Negro

### 🃏 Oráculos
| Sistema | Cartas | Descrição |
|---------|--------|-----------|
| Tarot Rider-Waite | 78 | 22 Arcanos Maiores + 56 Menores (Golden Dawn) |
| Tarot de Thoth | 78 | Crowley/Harris, correspondências astrológicas |
| Baralho Cigano | 36 | Lenormand adaptado, tradição romani |
| Petit Lenormand | 36 | Combinações par-a-par, leitura narrativa |
| Runas (Elder Futhark) | 24 | Tradição nórdica, Odin |
| I Ching | 64 | Hexagramas, tradição chinesa |
| Búzios (Ifá) | 16 | Oráculo Yorubá, caídas dos búzios |

### 😈 Daemons & Espíritos
| Tradição | Entidades | Fonte |
|----------|-----------|-------|
| Goetia (Ars Goetia) | 72 daemons | Lesser Key of Solomon |
| Ars Theurgia-Goetia | Espíritos dos pontos cardeais | Lemegeton Livro 2 |
| Demonologia Draconiana | Entidades qliphóticas | Temple of Ascending Flame |
| Exus e Pombagiras | Guardiões de encruzilhada | Quimbanda |
| Espíritos Goéticos Femininos | Lilith, Naamah, Agrat bat Mahlat | Tradição cabalística |

### 🕯️ Bruxaria & Paganismo
- **Wicca**: Roda do Ano (8 Sabbats), Triple Goddess, Horned God
- **Bruxaria Tradicional**: Hedge witchcraft, bruxaria de cocheira
- **Bruxaria Hereditária**: Tradições familiares europeias
- **Stregheria**: Bruxaria italiana (Aradia)
- **Seiðr**: Magia nórdica (Freya, Odin)

### 🥁 Tradições Afro-Brasileiras
| Tradição | Divindades | Elementos |
|----------|-----------|-----------|
| Candomblé Ketu | Orixás (Yorubá) | Axé, ebós, jogo de búzios |
| Candomblé Jeje | Voduns (Fon/Ewe) | Tradição Dahomeana |
| Candomblé Angola | Inquices (Bantu) | Tradição Banto |
| Umbanda | Orixás + Guias | Caboclos, Pretos Velhos, Erês |
| Quimbanda | Exus e Pombagiras | Encruzilhadas, magia prática |
| Jurema Sagrada | Mestres, Caboclos | Tradição indígena nordestina |

### Sincretismo & Correspondências
- Orixás ↔ Santos Católicos ↔ Planetas ↔ Sephirots
- Ex: Oxalá = Jesus = Sol = Tiferet
- Ex: Exu = São Bartolomeu = Mercúrio = Hod
- Ex: Iansã = Santa Bárbara = Marte = Gevurah

---

## Layout (inspiração KTO)

```
┌─────────────────────────────────────────────────┐
│ [Logo]  Símbolos  Magia  Oráculos  Daemons  ... │ ← Header nav
├─────────────────────────────────────────────────┤
│          ┌─────────────────────────┐            │
│          │    HERO BANNER CAROUSEL │            │
│          └─────────────────────────┘            │
├──────┬──────────────────────────────────────────┤
│      │  🔥 Populares                            │
│ CAT  │  [Card][Card][Card][Card][Card]          │
│ BAR  │                                          │
│      │  🌳 Símbolos Sagrados                    │
│ 🌳   │  [Árvore][Chakras][Semente][Flor]       │
│ 🔮   │                                          │
│ 👁️   │  🃏 Oráculos                             │
│ 🐉   │  [Waite][Thoth][Cigano][Lenormand]      │
│ 🃏   │                                          │
│ 😈   │  😈 Daemons                              │
│ 🕯️   │  [Goetia][Qliphoth][Exus]               │
│ 🥁   │                                          │
└──────┴──────────────────────────────────────────┘
```

---

## Stack Técnica (existente)
- Next.js 15 + Turbopack
- Tailwind CSS
- next-intl (i18n: pt-BR, en-US)
- Componentes React client-side para interatividade

## Próximos Passos
1. Criar layout da landing page com grid de cards
2. Implementar componente de categorias lateral
3. Criar hero banner carousel
4. Adaptar página existente da Árvore para ser acessível via card
5. Criar páginas placeholder para novos símbolos
6. Implementar sistema de dados para oráculos e entidades
