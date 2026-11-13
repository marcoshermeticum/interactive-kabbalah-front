# Arcanos Maiores — Catálogo de Regiões Interativas

> Complemento do guia [docs/interactive-tarot-cards.md](./interactive-tarot-cards.md):
> aquele documento explica **COMO** implementar uma carta; este define **O QUE** é
> interativo em cada uma. Use os dois juntos — os `points` dos polígonos continuam
> sendo desenhados manualmente conforme o Passo 4 do guia.
>
> **Automação:** o conteúdo multilíngue (nome, intro, ícones e textos em
> pt-BR, en-US, ja e he) fica em [`docs/tarot-content/<slug>.json`](./tarot-content/).
> `npm run tarot:new` lista as cartas pendentes e gera o arquivo de dados, as
> traduções e o registro no catálogo sem pedir nenhum texto. `--from-doc <slug>`
> ainda funciona como fallback: usa o JSON quando existir e, senão, lê a seção
> desta página. As coordenadas continuam sendo ajustadas no editor (Passo 4).

Seguindo o padrão da carta **A Temperança** (`src/data/tarot/temperance.ts`), este
catálogo reúne, para cada um dos 22 arcanos maiores Rider-Waite, as áreas da arte
que podem se tornar regiões interativas: hover/tap revela um texto educativo no
painel de leitura (desktop) ou no bottom sheet (mobile).

---

## Convenções (idênticas às da Temperança)

| Item | Regra |
|------|-------|
| `id` da região | kebab-case, único dentro da carta (ex.: `crown-halo`) |
| `id` da carta | camelCase, igual à chave do bloco i18n em `tarot` (ex.: `theFool`) — o `InteractiveTarotCard` deriva o `alt` da imagem de `${card.id}.name`; o arquivo de imagem, o `slug` do catálogo e a URL usam kebab-case (`the-fool`) |
| Chave i18n | camelCase, relativa ao namespace `tarot`: `<cartaCamelCase>.regions.<regiãoCamelCase>` (ex.: `white-rose` → `theFool.regions.whiteRose` → `tarot.theFool.regions.whiteRose.{title,description}`) |
| Ícone | emoji exibido no título do painel e na pílula de símbolos |
| Ordem das regiões | a ordem listada é a sugerida no array `regions`: formas grandes/ao fundo primeiro, detalhes pequenos por último (**o último ganha o clique nas sobreposições**) |
| Quantidade | 5–8 regiões por carta (recomendação do guia) |
| Imagens | todas as artes novas têm **1086×1810 px** (proporção 1,667) → **viewBox `{ width: 100, height: 166.7 }`** para todas |
| Traduções | os textos abaixo estão em **pt-BR** (idioma principal) e são rascunhos prontos para colar no `pt-BR.json`; devem ser replicados nos 4 idiomas (`en-US`, `ja`, `he`) — o inglês serve de placeholder |
| Numeração | padrão **Rider-Waite**: Força = VIII e Justiça = XI (invertidas em relação ao Tarô de Marselha) |

### Renomear as imagens

As artes já estão em `public/tarot/` com prefixo numérico. Renomeie para o
kebab-case da carta (`the-fool.jpg`), o mesmo usado na rota; o `id` no arquivo de
dados é camelCase (`theFool`) para bater com a chave i18n:

| Arquivo atual | Renomear para | Arquivo atual | Renomear para |
|---|---|---|---|
| `00_Fool.jpg` | `the-fool.jpg` | `11_Justice.jpg` | `justice.jpg` |
| `01_Magician.jpg` | `the-magician.jpg` | `12_Hanged_Man.jpg` | `the-hanged-man.jpg` |
| `02_High_Priestess.jpg` | `the-high-priestess.jpg` | `13_Death.jpg` | `death.jpg` |
| `14_Temperance.jpg` | (ver nota de calibração) | `15_Devil.jpg` | `the-devil.jpg` |
| `03_Empress.jpg` | `the-empress.jpg` | `16_Tower.jpg` | `the-tower.jpg` |
| `04_Emperor.jpg` | `the-emperor.jpg` | `17_Star.jpg` | `the-star.jpg` |
| `05_Hierophant.jpg` | `the-hierophant.jpg` | `18_Moon.jpg` | `the-moon.jpg` |
| `06_Lovers.jpg` | `the-lovers.jpg` | `19_Sun.jpg` | `the-sun.jpg` |
| `07_Chariot.jpg` | `the-chariot.jpg` | `20_Judgement.jpg` | `judgement.jpg` |
| `08_Strength.jpg` | `strength.jpg` | `21_World.jpg` | `the-world.jpg` |
| `09_Hermit.jpg` | `the-hermit.jpg` | `magician.jpg` | duplicata — remover |
| `10_Wheel_of_Fortune.jpg` | `wheel-of-fortune.jpg` | | |

### Tabela-resumo

| # | Nome (PT) | Nome (EN) | `id` | Regiões |
|---|-----------|-----------|------|:-------:|
| 0 | O Louco | The Fool | `the-fool` | 7 |
| I | O Mago | The Magician | `the-magician` | 6 |
| II | A Sacerdotisa | The High Priestess | `the-high-priestess` | 8 |
| III | A Imperatriz | The Empress | `the-empress` | 6 |
| IV | O Imperador | The Emperor | `the-emperor` | 6 |
| V | O Hierofante | The Hierophant | `the-hierophant` | 6 |
| VI | Os Enamorados | The Lovers | `the-lovers` | 6 |
| VII | O Carro | The Chariot | `the-chariot` | 6 |
| VIII | A Força | Strength | `strength` | 6 |
| IX | O Eremita | The Hermit | `the-hermit` | 5 |
| X | A Roda da Fortuna | Wheel of Fortune | `wheel-of-fortune` | 6 |
| XI | A Justiça | Justice | `justice` | 5 |
| XII | O Enforcado | The Hanged Man | `the-hanged-man` | 6 |
| XIII | A Morte | Death | `death` | 7 |
| XIV | A Temperança | Temperance | `temperance` | ✅ pronta |
| XV | O Diabo | The Devil | `the-devil` | 6 |
| XVI | A Torre | The Tower | `the-tower` | 5 |
| XVII | A Estrela | The Star | `the-star` | 6 |
| XVIII | A Lua | The Moon | `the-moon` | 6 |
| XIX | O Sol | The Sun | `the-sun` | 5 |
| XX | O Julgamento | Judgement | `judgement` | 5 |
| XXI | O Mundo | The World | `the-world` | 5 |

Total: **128 regiões** novas + 7 da Temperança já implementada.

---
## 0 · O Louco (`the-fool`)

**`name`:** "O Louco" · **`intro`:** "No limiar do abismo, o eterno principiante parte sem bagagem visível — apenas fé, instinto e a luz que o guia. Explore cada símbolo da carta."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `sun` | ☀️ | O Sol Radiante | O sol brilha por trás do ombro do Louco: a bênção divina que acompanha quem ousa o salto. Sua luz é a certeza interior que dispensa planejamento. |
| `mountains` | 🏔️ | As Montanhas Geladas | Os picos nevados ao fundo são as alturas da aspiração espiritual — o objetivo distante que o viajante nem precisa encarar ainda; basta caminhar. |
| `cliff` | 🪨 | O Penhasco | O abismo à beira do passo é o desconhecido. O Louco não o nota — ou não se importa: fé não calcula, confia. É o ponto zero de toda jornada. |
| `bundle` | 🎒 | A Tralha no Cajado | A trouxa colorida pendurada no bastão carrega os arquétipos do inconsciente coletivo — a herança que todo viajante leva sem saber o que contém. |
| `white-rose` | 🌹 | A Rosa Branca | Na mão esquerda, a rosa branca é a pureza da intenção e a inocência intacta: o princípio sem mácula de cada começo. |
| `dog` | 🐕 | O Cãozinho Branco | O cão que salta aos pés do Louco é o instinto fiel — e também o aviso: a lealdade do corpo animal acompanha, late e protege, mas não decide o salto. |
| `feather` | 🪶 | A Pena Vermelha | A pena vermelha no gorro recorda a leveza necessária: coragem vibrante, sem o peso das certezas. |

## I · O Mago (`the-magician`)

**`name`:** "O Mago" · **`intro`:** "Como acima, embaixo: o Mago é o canal entre o céu e a terra, com todas as ferramentas da criação sobre a mesa."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `infinity` | ♾️ | O Símbolo do Infinito | A lemniscata vertical sobre a cabeça é a chave do arcano: mente ilimitada, o domínio completo do vocabulário da criação. |
| `wand` | 🪄 | A Varinha Erguida | A haste erguida na mão direita capta a força divina; o Mago não a possui, apenas a conduz. |
| `pointing-hand` | 🖐️ | A Mão que Aponta a Terra | O dedo da mão livre aponta ao chão: o princípio hermético "como acima, embaixo" — toda inspiração deve encarnar na matéria. |
| `table-tools` | ♠️ | A Mesa e os Quatro Naipes | Sobre a mesa, copa, espada, bastão e pantáculo: os quatro elementos — emoção, mente, vontade e corpo — as ferramentas da manifestação. |
| `rose-garden` | 🌹 | O Jardim de Rosas | Rosas e lírios florescem diante da mesa: desejo e pureza cultivados lado a lado — a matéria já transmutada em paraíso. |
| `serpent-belt` | 🐍 | O Cinto-Serpente | A serpente que morde a própria cauda (ouroboros) na cintura: eternidade e autorregeneração — o poder retido em círculo fechado. |

## II · A Sacerdotisa (`the-high-priestess`)

**`name`:** "A Sacerdotisa" · **`intro`:** "Guardiã do santuário atrás do véu, a Sacerdotisa é a memória silenciosa entre as duas colunas do Templo."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `pillar-b` | 🏛️ | A Coluna B (Boaz) | A coluna negra de Boaz representa a severidade, a contração e a forma. É o princípio que delimita e dá estrutura, sem o qual nenhuma manifestação pode existir. |
| `pillar-j` | 🏛️ | A Coluna J (Jachin) | A coluna branca de Jachin representa a misericórdia, a expansão e a força. É o princípio que doa e amplia, abrindo espaço para que a vida floresça. |
| `veil-pomegranates` | 🍈 | O Véu com Romãs | O véu bordado de romãs e palmeiras esconde o sanctum: o conhecimento só se revela a quem atravessa — não a quem espia. As romãs remetem a Perséfone e aos mundos subterrâneos. |
| `water` | 🌊 | O Mar Atrás do Véu | Entre as colunas, além do véu, estende-se o oceano: o inconsciente coletivo, matriz de toda forma ainda não manifestada. |
| `scroll` | 📜 | O Pergaminho de TORA | Parcialmente oculto em seu regaço, o rolo da Lei repousa: a sabedoria existe, mas permanece velada — intuição antes de letra. |
| `crown` | 👑 | A Coroa Lunar | Os chifres em crescente abraçam o disco solar: a Sacerdotisa une Lua e Sol, recepção e radiação, no mesmo gesto de Hathor. |
| `solar-cross` | ✚ | A Cruz Solar no Peito | A cruz de braços iguais sobre o coração: o eixo do equilíbrio entre os opostos, o ponto quieto do centro. |
| `crescent-moon` | 🌙 | A Lua aos Seus Pés | O crescente lunar sob suas vestes: tudo aqui é regido pela Lua — ciclos, marés, o inconsciente e o feminino profundo. |

## III · A Imperatriz (`the-empress`)

**`name`:** "A Imperatriz" · **`intro`:** "Soberana da natureza fecunda, a Imperatriz reina sobre o trigo, as águas e tudo o que floresce."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `star-crown` | 👑 | A Coroa de Doze Estrelas | Doze estrelas: o zodíaco completo — ela governa o tempo cíclico das estações e das gestações. |
| `venus-shield` | ♀️ | O Escudo de Vênus | O escudo em forma de coração com o símbolo de Vênus: o amor como fundação — beleza, afeição e magnetismo vital. |
| `scepter` | 🪄 | O Cetro | O cetro encimado pelo globo: autoridade suave sobre o mundo das formas — sua mão nem precisa segurá-lo com força. |
| `wheat-field` | 🌾 | O Campo de Trigo | O trigal maduro aos pés do trono: Deméter e a abundância da Mãe — o trabalho que frutifica sem pressa. |
| `pomegranate-robe` | 🍈 | As Romãs do Manto | O vestido estampado de romãs (ecoando o véu da Sacerdotisa): fertilidade, muitos filhos, muitas sementes — a multiplicação do uno. |
| `river-trees` | 🏞️ | O Rio e as Árvores | Ao fundo, a cachoeira e o bosque: a vida fluindo sem represa — a natureza que se renova dentro do próprio ritmo. |

## IV · O Imperador (`the-emperor`)

**`name`:** "O Imperador" · **`intro`:** "O arquétipo do Pai: estrutura, lei e vontade férrea assentados sobre o trono do poder."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `ram-heads` | 🐏 | Os Carneiros do Trono | As cabeças de carneiro esculpidas nos braços do trono: Áries e Marte — a força iniciadora, o ímpeto que abre cada novo ciclo. |
| `ankh` | ☥ | O Cetro Ankh | A cruz ansada é a vida que o Imperador outorga e sustenta: seu poder existe para organizar e preservar a existência, não para destruí-la. |
| `orb` | 🔮 | O Orbe | Na mão esquerda, o globo do domínio: o mundo sob controle consciente — visão completa, governo à distância. |
| `armor` | 🛡️ | A Armadura sob o Manto | Sob as vestes vermelhas, a couraça: o governante permanece guerreiro por dentro mesmo quando sereno por fora — a rigidez que protege e também aprisiona. |
| `beard-crown` | 👑 | A Barba e a Coroa | A longa barba branca é a sabedoria acumulada do tempo; a coroa de ouro, o direito de comandar herdado da experiência — não do capricho. |
| `mountains` | ⛰️ | As Montanhas Áridas | O deserto rochoso ao fundo: o reino da forma em seu estado mais seco e definido — limites claros, sem dissolução. |

## V · O Hierofante (`the-hierophant`)

**`name`:** "O Hierofante" · **`intro`:** "O sacerdote da tradição: entre as colunas do templo, ele abençoa e guarda as chaves do mistério instituído."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `triple-crown` | 👑 | A Coroa Tripla | As três faixas da tiara: os três mundos — físico, mental e espiritual — sob uma só autoridade; papa, imperador e deus num só ofício. |
| `triple-cross` | ✝️ | A Cruz Tripla | O báculo de três travessas: a bênção desce por todos os níveis da existência, do céu à terra. |
| `crossed-keys` | 🔑 | As Chaves Cruzadas | De ouro e de prata, sol e lua: as chaves que abrem os mistérios exteriores e interiores — o exotérico e o esotérico postos em cruz. |
| `blessing-hand` | 🖐️ | A Mão em Bênção | Os dois dedos erguidos: o gesto de ensinar e abençoar — a doutrina transmitida de mão em mão, de geração em geração. |
| `acolytes` | 👥 | Os Dois Monges | Os iniciados tonsurados, de mantos bordados — obediência e devoção: a tradição só existe porque há quem a receba. |
| `pillars` | 🏛️ | As Colunas do Templo | Diferentes das da Sacerdotisa (J e B), estas pertencem ao estabelecido: a igreja visível, a estrutura que sustenta o sagrado na matéria. |

## VI · Os Enamorados (`the-lovers`)

**`name`:** "Os Enamorados" · **`intro`:** "Sob a bênção de Rafael, a alma escolhe: a árvore em chamas e a árvore da serpente, o homem e a mulher, o desejo e a consciência."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `angel` | 👼 | O Anjo Rafael | De asas abertas, Rafael — "Deus cura" — preside a união: o amor como força regeneradora e escolha consciente, não anseio cego. |
| `sun` | ☀️ | O Sol | O disco dourado atrás do anjo: a verdade que ilumina toda união autêntica — nada a esconder sob a luz plena. |
| `flaming-tree` | 🔥 | A Árvore em Chamas | Atrás do homem, a árvore flamejante é o zelo da vontade: o fogo yang, a paixão que ilumina e devora. |
| `serpent-tree` | 🐍 | A Árvore da Serpente | Atrás da mulher, a árvore do conhecimento com a serpente enroscada: a sabedoria recebida, o magnetismo yin — o desejo que seduz à experiência. |
| `couple` | 👫 | O Homem e a Mulher | Ele olha para ela; ela, para o anjo: consciência voltada ao inconsciente, inconsciente voltado ao espírito — o triângulo de toda relação transformadora. |
| `mountain` | ⛰️ | A Montanha | O pico distante entre os dois: a união como escalada — o objetivo sublime que se alcança a dois, nunca sozinho. |

## VII · O Carro (`the-chariot`)

**`name`:** "O Carro" · **`intro`:** "Vencedor sereno de batalhas passadas, o auriga conduz esfinges opostas sem rédeas — apenas pela vontade."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `starry-canopy` | 🌌 | O Dossel Estrelado | O céu tecido que cobre o carro: proteção celestial e os destinos — os astros que acompanham quem se move com propósito. |
| `sphinxes` | 🗿 | As Esfinges Branca e Preta | As forças opostas que o auriga não doma pela força, mas orquestra pela direção: sem rédeas, a intenção governa. |
| `winged-sun` | ☀️ | O Disco Solar Alado | O emblema egípcio à frente do carro: o coração elevado — a vitória de quem já dominou a si antes de vencer o mundo. |
| `shoulder-moons` | 🌙 | As Luas nos Ombros | Os crescentes nas espáduas: intuição e receptividade viajando junto à determinação — o lunar a serviço do solar. |
| `city-walls` | 🏰 | A Cidade à Retaguarda | As muralhas ficaram para trás: o que foi conquistado já está atrás; o Carro avança por terreno aberto — novos desafios, sem muros. |
| `square-emblem` | 🔷 | O Quadrado no Peito | O símbolo quadrado sobre o peito: a vontade quadrada — quatro elementos, quatro direções — firmeza geométrica no centro da ação. |

## VIII · A Força (`strength`)

**`name`:** "A Força" · **`intro`:** "Não a força que subjuga: a que domestica pela doçura — rosas onde haveriam correntes."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `infinity` | ♾️ | O Infinito sobre a Cabeça | A mesma lemniscata do Mago, agora na fronte da mulher: força espiritual — o poder que vem do alto, não do músculo. |
| `lion-mouth` | 🦁 | A Boca do Leão | Os dedos entrelaçados às mandíbulas do leão: o instinto bruto não é espancado, é abraçado — o ego animal domado pela firmeza afetuosa. |
| `rose-garland` | 🌹 | A Guirlanda de Rosas | As rosas coroam sua cabeça e cintura: os vínculos aqui são de beleza — o desejo (vermelho) transformado em ornamento consciente. |
| `red-ribbon` | 🎗️ | O Laço Vermelho | A faixa vermelha à cintura: o apetite não é eliminado na domesticação — apenas amarrado com laço gracioso. |
| `white-robe` | 👗 | A Veste Branca | A túnica simples: pureza de intenção — nada a defender, nenhuma armadura; a coragem desarmada. |
| `mountains` | ⛰️ | As Montanhas ao Fundo | O horizonte de picos ao fundo: a tarefa é longa — a domesticação do leão é prática diária, não evento único. |

## IX · O Eremita (`the-hermit`)

**`name`:** "O Eremita" · **`intro`:** "No pico nevado da realização, o sábio procura dentro: a luz que carrega é a que encontra."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `lantern-star` | 🕯️ | A Lanterna e o Selo de Salomão | Erguida à altura dos olhos, a lanterna exibe o hexagrama: a sabedoria buscada lá fora brilha aqui dentro — procurar é lembrar. |
| `staff` | 🪄 | O Cajado | O bordão do peregrino é a coluna que sustenta a caminhada solitária — e o cetro humilde de quem já reina sobre si. |
| `gray-hood` | 🧥 | O Capuz Cinza | O manto apagado, sem brasão: o anonimato do mestre verdadeiro — o saber não se exibe, acende-se nos outros. |
| `mountain-peak` | 🏔️ | O Pico da Montanha | Ele está no cume que todos os arcanos anteriores escalaram: da altura, o que era urgente se vê pequeno — e ainda assim ele continua buscando. |
| `bearded-face` | 🧓 | O Rosto do Sábio | A barba branca e o olhar baixo: a idade que não pesa — tempo destilado em compreensão, o silêncio como língua materna. |

## X · A Roda da Fortuna (`wheel-of-fortune`)

**`name`:** "A Roda da Fortuna" · **`intro`:** "O eixo imóvel do eterno retorno: sobe Anúbis, desce Tífon — e a Esfinge espera no topo com a resposta."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `four-creatures` | 📖 | Os Quatro Viventes | Anjo, águia, leão e touro nos cantos, cada qual com seu livro: os quatro evangelistas e os signos fixos — a Lei que se lê em quatro testemunhos, girando sem jamais mover-se. |
| `wheel-letters` | 🔤 | As Letras da Roda | TARO (ou ROTA, TORAT) entremeada às letras hebraicas Yod-Heh-Vav-Heh: a Lei que gira — o Nome divino que vira mundo, o mundo que, girado, vira Nome outra vez. |
| `alchemical-rim` | ⚗️ | O Aro Alquímico | Enxofre, mercúrio, água e sal nos quadrantes externos: a roda é o próprio ateliê da Grande Obra — transmutação contínua. |
| `sphinx` | 🗿 | A Esfinge no Topo | Imóvel no ponto mais alto, com a espada erguida: o enigma e o equilíbrio — a única criatura que não sobe nem desce, porque já é o eixo. |
| `anubis` | 🐕 | Anúbis Ascendente | O psicopompo egípcio sobe com a roda: a evolução — a alma que sobe de giro em giro, guiada pelo que soube honrar. |
| `serpent-typhon` | 🐍 | A Serpente Tífon | Desce em espiral: a involução, o arrasto da matéria — toda subida tem seu contrapeso descendo. |

## XI · A Justiça (`justice`)

**`name`:** "A Justiça" · **`intro`:** "Entre as colunas da lei, a espada e a balança: cada ato pesado com a mesma pedra."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `pillars-veil` | 🏛️ | As Colunas e o Véu | Atrás dela, colunas e véu: a Justiça atua dentro da estrutura — o veredito é humano, mas o tribunal é cósmico. |
| `scales` | ⚖️ | A Balança | Na mão esquerda, o fiel no zero: equilíbrio exato entre o que se fez e o que se deve — a matemática sem piedade e sem crueldade do karma. |
| `sword` | ⚔️ | A Espada Erguida | Na mão direita, de fio impecável: a verdade que corta — decidir é separar, e julgar exige lâmina limpa de vaidade. |
| `crown` | 👑 | A Coroa | A coroa de três andares: pensamento, palavra e ato sob a mesma medida — a lei que reina antes de punir. |
| `red-mantle` | 🧥 | O Manto Vermelho | Sob a túnica clara, o manto vermelho: a paixão existe, mas subjacente — o juiz sente, e por isso mesmo pesa com as duas mãos. |

## XII · O Enforcado (`the-hanged-man`)

**`name`:** "O Enforcado" · **`intro`:** "Suspenso entre o céu e a terra pelo tornozelo, o mysticus voluntário: rendição que não é derrota."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `beam` | 🪵 | A Trave em Tau | A forca em forma de T — o Tau, sinal de salvação: a mesma cruz que pune é a que redime, dependendo do lado em que se pendura. |
| `living-tree` | 🌳 | A Árvore Viva | O madeiro tem folhas verdes brotando: o sacrifício é feito em árvore viva, não em lenho morto — toda entrega aqui frutifica. |
| `halo` | 🌟 | O Halo Dourado | Ao redor da cabeça invertida: a luz não se perde com o sacrifício — intensifica-se. Iluminação pela entrega. |
| `crossed-leg` | 🦵 | A Perna Cruzada | As pernas desenham o algarismo 4 — o mundo da forma — e o corpo inteiro uma cruz invertida: a matéria pendurada na perspectiva virada do espírito, o mundo lido de cabeça para baixo. |
| `bound-hands` | 🔗 | As Mãos Atadas às Costas | Presas atrás do tronco em triângulo: a vontade que se entrega — as mãos que não agarram permitem que o alto as preencha. |
| `serene-face` | 😌 | O Rosto Sereno | Nenhuma angústia no rosto: a rendição é plena e consciente — quem escolheu pender não é vítima da corda, mas seu parceiro de dança. |

## XIII · A Morte (`death`)

**`name`:** "A Morte" · **`intro`:** "Não o fim, mas a passagem: o sol nasce entre duas torres enquanto toda hierarquia se ajoelha."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `rising-sun` | 🌅 | O Sol entre as Torres | Entre duas torres, o sol nasce — e não se põe: a promessa escondida do arcano XIII. Toda travessia termina em amanhecer. |
| `river-boat` | ⛵ | O Rio e o Barco | A barca parada no rio: a travessia que toda alma faz — o barqueiro de outrora agora aguarda; o rio não para de correr, só nós paramos. |
| `skeleton-armor` | 💀 | O Esqueleto Armadurado | Ossos sob armadura negra: o que sobra quando toda forma cai — a estrutura última, o invencível que já é osso e por isso não teme. |
| `black-horse` | 🐎 | O Cavalo Branco | A montaria "pálida" das escrituras, branca como nenhum outro animal do arcano: a morte cavalga sobre o puro — nada impuro chega ao outro lado. |
| `banner-rose` | 🏴 | O Estandarte da Rosa Branca | A rosa de cinco pétalas no pano negro: a vida que persiste no símbolo da morte — transformação, não aniquilação; os cinco sentidos que se rendem. |
| `kneeling-figures` | 🧎 | Os que se Ajoelham | Rei, mulher e criança: poder, apego e inocência — as três reações humanas diante do inevitável: resistência, dor e aceitação. |
| `child-flowers` | 💐 | A Criança e as Flores | Só a criança ergue flores ao cavaleiro: a inocência acolhe a transformação como primavera — morte vista por olhos sem medo é metamorfose. |

## XV · O Diabo (`the-devil`)

**`name`:** "O Diabo" · **`intro`:** "No antro escuro, o Bode de Mendes preside: as correntes estão frouxas — a prisão é opcional."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `inverted-pentagram` | ⛧ | O Pentagrama Invertido | A estrela de cinco pontas virada: o espírito voltado para baixo — a matéria adorada como deus. O símbolo não é mau; apenas aponta na direção errada. |
| `bat-wings` | 🦇 | As Asas de Morcego | Asas noturnas que não voam ao alto, apenas sombreiam: o poder confinado ao subterrâneo — a sombra que prefere o porão ao céu. |
| `torch` | 🔥 | A Tocha | A chama na mão erguida desce sobre os cativos: a "iluminação" invertida — a consciência usada para escravizar, o fogo que queima em vez de clarear. |
| `chains` | ⛓️ | As Correntes Frouxas | Postas ao alcance dos cativos, mas soltas: a revelação central do arcano — o cativeiro é autoposto; ninguém precisa permanecer; basta erguer-se e sair. |
| `captives` | 👫 | Os Dois Cativos | O homem e a mulher nus, com chifres e caudas — os mesmos de Os Enamorados, agora na sombra: a relação que era comunhão virou grilhão; o desejo, possessão. |
| `dark-cave` | 🕳️ | A Caverna Escura | O cenário sem céu nem horizonte: o mundo fechado da adoração material — aqui não há estrelas porque ninguém olha para cima. |

## XVI · A Torre (`the-tower`)

**`name`:** "A Torre" · **`intro`:** "O raio que derruba a coroa falsa: ninguém cai da Torre por acaso — cai de si mesmo."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `tower-crag` | 🗼 | A Torre no Rochedo | Sobre a rocha nua, sem alicerces visíveis: a estrutura que se julgava eterna — construída sobre o que não se via; cai quando o invisível se move. |
| `lightning` | ⚡ | O Raio | Desce exatamente pela coroa da torre: a intervenção súbita — a verdade que não pede licença e atinge primeiro o que estava mais alto porque estava mais falso. |
| `falling-crown` | 👑 | A Coroa que Cai | Despregada do alto da torre, ainda em queda: todo poder fundado no erro se decora com o que não pode sustentar — a autoridade desabando junto com a estrutura. |
| `falling-figures` | 🙇 | Os Dois que Caem | De cabeça para baixo, como o Enforcado — mas sem halo e sem escolha: aqui a rendição não foi voluntária; o despertar chegou como terremoto. |
| `flames-yods` | 🔥 | Os Yods de Fogo | 22 línguas de fogo em forma da letra hebraica Yod: a semente divina espalhada na ruína — o mesmo fogo que derruba a Torre semeia o alfabeto da reconstrução (22 letras, 22 caminhos). |

## XVII · A Estrela (`the-star`)

**`name`:** "A Estrela" · **`intro`:** "Depois da tempestade, o céu se abre: a Donadora despeja suas águas sobre a terra e sobre o lago."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `great-star` | ⭐ | A Grande Estrela | A estrela maior de oito raios: a esperança que não depende de circunstância — Vênus, a estrela da manhã, que anuncia o Sol sem ser o Sol. |
| `seven-stars` | ✨ | As Sete Estrelas Menores | Sete pequenos sóis ao redor: os sete chakras, os sete planetas clássicos — a hierarquia intermediária entre você e a Grande Estrela. |
| `two-jugs` | 🫗 | Os Dois Jarros | A água vertida em duas direções — sobre a terra (o corpo, o prático) e sobre o lago (a alma, o inconsciente): nutrir os dois mundos com a mesma fonte. |
| `ibis` | 🐦 | O Íbis na Árvore | A ave de Thoth à beira da água: o pensamento que se renova — após a purificação da Torre, o primeiro pássaro a voltar é a reflexão serena. |
| `pool` | 💦 | O Lago | A água parada que recebe: o inconsciente reabastecido — a psique que não pede para entender, apenas para ser banhada. |
| `horizon` | 🌱 | A Terra e o Horizonte | O chão e o limite do céu: a promessa de integração — o que desceu do alto vai crescer no chão; esperança que vira planta. |

## XVIII · A Lua (`the-moon`)

**`name`:** "A Lua" · **`intro`:** "No caminho entre duas torres, o que sobe do lago ainda não tem nome: cão, lobo e lagostim respondem ao mesmo silêncio."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `moon-face` | 🌙 | A Lua com Rosto | O disco com semblante, entre raios retos e ondulados: a luz emprestada, cambiante — a verdade lunar muda de fase conforme quem olha. |
| `dew-drops` | 💧 | As Gotas de Orvalho | Caem do céu à terra: inspiração e intuição — o orvalho que só se recolhe de madrugada, em silêncio. |
| `dog-wolf` | 🐺 | O Cão e o Lobo | O doméstico e o selvagem uivam para a mesma Lua: a natureza treinada e a natureza intacta reagem ao que não controlam — revelam-se na noite. |
| `crayfish` | 🦞 | O Lagostim | Emergindo do lago, entre as águas e o caminho: o fundo mais antigo do inconsciente — os medos primitivos, couraçados, que só sobem quando a luz diminui. |
| `two-towers` | 🗼 | As Duas Torres | A entrada do desconhecido: portais incompletos — a passagem entre o conhecido e o jamais mapeado; o caminho segue entre elas, não por fora. |
| `winding-path` | ➰ | O Caminho Sinuoso | Sobe, vira, some e reaparece: a jornada noturna não é linha reta — atravessa-se confiando em quem desenhou a trilha assim. |

## XIX · O Sol (`the-sun`)

**`name`:** "O Sol" · **`intro`:** "A criança renascida cavalga ao amanhecer: nada a provar, tudo a brilhar."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `sun-rays` | ☀️ | O Sol de Raios Retos | Diferente da Lua, os raios aqui não ondulam — são lanças de luz: a consciência plena, sem distorção nem luz emprestada — a fonte é o próprio centro. |
| `child-horse` | 🧒 | A Criança no Cavalo Branco | Despida e livre sobre a montaria branca: o eu renascido — a inocência recuperada depois de toda travessia; o cavalo é a força purificada a serviço da alegria. |
| `red-banner` | 🚩 | O Estandarte Vermelho | A criança segura a bandeira da vitória — mas não olha para ela: o triunfo que não precisa ser mostrado; o vermelho da vitalidade esvoaçando sem guerra. |
| `sunflower-wall` | 🌻 | O Muro de Girassóis | Quatro girassóis virados para a criança — e não para o sol: a natureza inteira reconhece o que está mais alto; quando o Sol é interno, até as flores se voltam para ele. |
| `red-plume` | 🪶 | A Plumagem Vermelha | A única pena na cabeça da criança: um toque de vontade — a liberdade não é passividade; exige um ponto de fogo. |

## XX · O Julgamento (`judgement`)

**`name`:** "O Julgamento" · **`intro`:** "A trombeta soa sobre os caixões abertos: ressuscitar é lembrar de onde se veio."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `angel-trumpet` | 🎺 | O Anjo e a Trombeta | O som que desperta os mortos: o chamado — não ameaça, convoca; a mesma nota que é terror para a estrutura é alvorada para a alma. |
| `flag-cross` | ✝️ | O Estandarte na Trombeta | A bandeira com a cruz presa ao instrumento: a mensagem que desce — o eixo entre céu e terra por onde a ressurreição trafega. |
| `risen-family` | 🙋 | Os que Ressuscitam | Homem, mulher e criança erguem-se dos caixões de braços abertos: memória, acolhimento e recomeço — o eu inteiro saindo da velha forma como quem sai de uma cama antiga. |
| `coffins` | ⚰️ | Os Caixões Flutuantes | Sobre a água, abertos, não afundam: o passado que serviu de berço vira casca — a velha forma respeitada por tudo o que permitiu, e deixada para trás com gratidão. |
| `sea-mountains` | 🌊 | O Mar e as Montanhas | Ao fundo, o inconsciente (mar) e a jornada por vir (montanhas): o despertar não é o fim — é a partida de novo, agora com os olhos abertos. |

## XXI · O Mundo (`the-world`)

**`name`:** "O Mundo" · **`intro`:** "Dentro da coroa de louros, a dançarina contém tudo: os quatro viventes testemunham a síntese."

| `id` | Ícone | `title` | `description` |
|------|-------|---------|---------------|
| `laurel-wreath` | 🌿 | A Coroa de Louros | O oval vivo que envolve tudo: a mandorla da vitória e da matriz — o útero cósmico onde tudo o que foi vivido se conclui, e de onde tudo recomeça. |
| `four-creatures` | 🦁 | Os Quatro Viventes | Anjo, águia, leão e touro nas nuvens dos cantos: os mesmos da Roda da Fortuna, agora sem livros — a Lei virou corpo; o que se estudou, encarnou. |
| `dancer` | 💃 | A Dançarina | A alma celebrando a síntese: nada para conquistar, tudo para dançar — o centro que só existe em movimento, sustentando os opostos em rotação. |
| `two-wands` | 🪄 | As Duas Varinhas | Uma em cada mão: a vontade que não se divide mais — evocação e invocação, fazer e receber, ambas metades da mesma dança. |
| `clouds` | ☁️ | As Nuvens nos Cantos | Os bancos de nuvem sustentam os viventes: o testemunho que flutua — o mundo visto de cima e de dentro ao mesmo tempo; a matéria rarefeita em consciência. |

---

## Notas de calibração e implantação

### A arte da Temperança (ajuste pendente)

A arte atual `public/tarot/temperance.jpg` tem **900×1554 px** (proporção 1,727),
mas `temperance.ts` usa `viewBox 100×165` (proporção 1,65 — herdada de uma arte
antiga de ~600×990). Com `object-contain`, a imagem ganha faixas laterais e os
polígonos se estendem um pouco além da arte nas bordas. Ao tocar nas novas cartas,
recalibre a Temperança para `viewBox: { width: 100, height: 172.7 }` e ajuste os
`points`, ou substitua por uma arte com proporção igual às novas (1086×1810).

### Checklist por carta (resumo do guia)

- [ ] Imagem renomeada em `public/tarot/<id>.jpg`
- [ ] `src/data/tarot/<id>.ts` criado com `viewBox { width: 100, height: 166.7 }`
- [ ] Regiões nesta ordem (fundo → primeiro plano), com `id`, `icon`, `points`, `i18nKey`
- [ ] Polígonos desenhados (Passo 4) e conferidos com "Destacar símbolos"
- [ ] Bloco de tradução (`name`, `intro`, `regions.*`) nos **4** idiomas
- [ ] Carta registrada em `src/data/tarot/majorArcana.ts` (entrada no mosaico + `cardData`)
- [ ] `npx tsc --noEmit` e `npm run build` passam

### Ordem sugerida de implantação

As cartas compartilham símbolos entre si e com a Árvore da Vida — implementar em
pares temáticos maximiza o reuso de textos e a coerência do conjunto:

1. **A Sacerdotisa** e **O Hierofante** (colunas B/J — ponte direta com a Kabbalah)
2. **A Roda da Fortuna** e **O Mundo** (os quatro viventes se repetem)
3. **O Mago**, **A Força** e **Os Enamorados** (a lemniscata e o jardim de rosas)
4. **A Morte**, **O Diabo**, **A Torre** (arcanos noturnos da transformação)
5. **O Louco** e **O Eremita** (início e fim da jornada)
6. **O Carro**, **A Justiça**, **O Enforcado** e os astros (**A Estrela**, **A Lua**, **O Sol**, **O Julgamento**)
