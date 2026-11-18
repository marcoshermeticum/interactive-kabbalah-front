# Arcanos Menores — Catálogo de Regiões Interativas

> Complemento do guia [docs/interactive-tarot-cards.md](./interactive-tarot-cards.md) e do
> [catálogo dos arcanos maiores](./tarot-major-arcana-regions.md): este documento define **O QUE**
> é interativo em cada uma das 56 cartas dos arcanos menores do Rider-Waite. Os textos estão em
> **pt-BR**; as versões em en-US, ja e he ficam nos arquivos de conteúdo.
>
> **Fonte da verdade:** [`docs/tarot-content/<slug>.json`](./tarot-content/). Este arquivo é um
> espelho legível desses JSONs (gerado a partir deles). Para mudar um texto, edite o JSON e
> regenere este documento com `npm run tarot:doc`.
>
> **Como criar uma carta:** `npm run tarot:new -- --card ace-of-wands` (ou `npm run tarot:new` para
> o menu; `--suit cups` filtra por naipe). O comando gera o arquivo de dados com **caixas
> provisórias**, os textos nos 4 idiomas e o registro em `minorArcana.ts`. O posicionamento dos
> destaques é feito depois, no editor ("🎯 Posicionar destaques"). Veja
> [new-tarot-card-cli.md](./new-tarot-card-cli.md).

---

## Convenções

| Item | Regra |
|------|-------|
| `slug` | `<posição>-of-<naipe>`, em inglês e kebab-case: `ace-of-wands`, `two-of-cups`, `page-of-swords`, `king-of-pentacles`. É também o trecho da URL e o nome do arquivo da arte |
| `id` da carta / chave i18n | camelCase do slug (`aceOfWands`), igual ao bloco `tarot.<id>` |
| Posições (`rank`) | 1 Ás · 2 a 10 numeradas · 11 Valete (Page) · 12 Cavaleiro (Knight) · 13 Rainha (Queen) · 14 Rei (King) |
| Naipes (`suit`) | `wands` Paus (fogo) · `cups` Copas (água) · `swords` Espadas (ar) · `pentacles` Ouros (terra) |
| Arte | `public/tarot/minor/<slug>.jpg`, 1086×1810 px → viewBox `{ width: 100, height: 166.7 }` |
| Regiões por carta | **3 a 6** (cada uma destas tem 4). Menos símbolos que os arcanos maiores, que têm 5 a 8 |
| `id` da região | kebab-case, único dentro da carta |
| Ícone | emoji exibido no painel e na pílula, guardado em `regions[].icon` |
| Ordem das regiões | do fundo para a frente: **a última vence o clique** nas sobreposições |
| Textos | `title` e `description` obrigatórios nos 4 idiomas; `intro` é o resumo que aparece sob o título da carta |
| Posicionamento | **não feito**: o comando cria as caixas em grade e o editor ajusta |

### Correspondências (Golden Dawn)

As correspondências aparecem como chips na página da carta e ficam em `src/data/tarot/minorArcana.ts`.

- **Ases a Dez:** a sephirah do número (Ás = Kether … Dez = Malkuth).
- **Dois a Dez:** o decã (planeta + signo) do elemento do naipe, na ordem caldaica.
- **Corte** (Valete, Cavaleiro, Rainha, Rei): letra do Tetragrama e elemento dentro do elemento do naipe. Rei = Yod (fogo), Rainha = Heh (água), Cavaleiro = Vav (ar), Valete = Heh final (terra). É a leitura da Golden Dawn com os nomes de Waite: o "Cavaleiro" da Golden Dawn é o Rei, e o "Príncipe" é o Cavaleiro.

| Posição | Paus (fogo) | Copas (água) | Espadas (ar) | Ouros (terra) |
|---------|-------------|--------------|--------------|----------------|
| Ás | Kether | Kether | Kether | Kether |
| 2 | Chokmah · Marte em Áries | Chokmah · Vênus em Câncer | Chokmah · Lua em Libra | Chokmah · Júpiter em Capricórnio |
| 3 | Binah · Sol em Áries | Binah · Mercúrio em Câncer | Binah · Saturno em Libra | Binah · Marte em Capricórnio |
| 4 | Chesed · Vênus em Áries | Chesed · Lua em Câncer | Chesed · Júpiter em Libra | Chesed · Sol em Capricórnio |
| 5 | Gevurah · Saturno em Leão | Gevurah · Marte em Escorpião | Gevurah · Vênus em Aquário | Gevurah · Mercúrio em Touro |
| 6 | Tiferet · Júpiter em Leão | Tiferet · Sol em Escorpião | Tiferet · Mercúrio em Aquário | Tiferet · Lua em Touro |
| 7 | Netzach · Marte em Leão | Netzach · Vênus em Escorpião | Netzach · Lua em Aquário | Netzach · Saturno em Touro |
| 8 | Hod · Mercúrio em Sagitário | Hod · Saturno em Peixes | Hod · Júpiter em Gêmeos | Hod · Sol em Virgem |
| 9 | Yesod · Lua em Sagitário | Yesod · Júpiter em Peixes | Yesod · Marte em Gêmeos | Yesod · Vênus em Virgem |
| 10 | Malkuth · Saturno em Sagitário | Malkuth · Marte em Peixes | Malkuth · Sol em Gêmeos | Malkuth · Mercúrio em Virgem |
| Valete | ה Heh · Terra | ה Heh · Terra | ה Heh · Terra | ה Heh · Terra |
| Cavaleiro | ו Vav · Ar | ו Vav · Ar | ו Vav · Ar | ו Vav · Ar |
| Rainha | ה Heh · Água | ה Heh · Água | ה Heh · Água | ה Heh · Água |
| Rei | י Yod · Fogo | י Yod · Fogo | י Yod · Fogo | י Yod · Fogo |

### Tabela-resumo

| Naipe | Cartas | Regiões |
|-------|:------:|:-------:|
| Paus (Wands) | 14 | 56 |
| Copas (Cups) | 14 | 56 |
| Espadas (Swords) | 14 | 56 |
| Ouros (Pentacles) | 14 | 56 |
| **Total** | **56** | **224** |

---

## Paus (Wands) — Fogo

### Ás de Paus (`ace-of-wands`)

- **Nome (EN):** Ace of Wands · **Arte:** `/tarot/minor/ace-of-wands.jpg` · **Posição:** Ás
- **Correspondências:** Elemento: Fogo · Sephirah: Kether
- **Resumo (`intro`):** Uma mão surge da nuvem e oferece um cajado em flor: o impulso inicial, a faísca criativa e a coragem de começar. É o fogo em estado puro, ainda sem forma e cheio de promessa.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `hand-cloud` | ✋ | A Mão na Nuvem | O dom que vem de cima: a inspiração chega como presente, não como conquista. A mão oferece o cajado, mas cabe a você segurá-lo. |
| `budding-wand` | 🌱 | O Cajado em Botão | Um bastão vivo que ainda brota: a vontade não é madeira morta, é força que cresce. Cada folha é uma ideia pronta para se desdobrar. |
| `falling-leaves` | 🍃 | As Folhas que Caem | Folhas em forma de iode (י), a primeira letra do Nome divino, flutuam no ar: centelhas espalhadas, sementes de possibilidade que o vento leva adiante. |
| `castle-landscape` | 🏰 | O Castelo e a Paisagem | Ao longe, um castelo sobre a colina e um vale fértil: o destino que o primeiro passo ainda não alcançou, mas já enxerga. |

### Dois de Paus (`two-of-wands`)

- **Nome (EN):** Two of Wands · **Arte:** `/tarot/minor/two-of-wands.jpg` · **Posição:** 2
- **Correspondências:** Elemento: Fogo · Sephirah: Chokmah · Decã: Marte em Áries
- **Resumo (`intro`):** Um homem no alto da muralha segura o mundo na mão e um cajado na outra, olhando o mar. Planejar, escolher o rumo e decidir entre o que já se tem e o que se pode conquistar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `globe` | 🌍 | O Globo na Mão | O mundo cabe na palma de quem planeja: poder, alcance e responsabilidade. A esfera lembra que ainda é preciso escolher onde pousá-la. |
| `two-wands` | 🪄 | Os Dois Cajados | Um empunhado, outro fixo na parede: a vontade em movimento e a vontade enraizada. Entre o que se leva e o que se deixa firme, nasce a estratégia. |
| `sea-horizon` | 🌊 | O Mar e o Horizonte | O olhar do homem vai além das muralhas, para o mar aberto: a ambição de ir além do território conhecido, ainda sem saber o que há do outro lado. |
| `rose-lily-emblem` | 🌹 | A Rosa e o Lírio | Rosas e lírios cruzados na parede: o desejo (rosa) e a pureza (lírio) unidos na mesma decisão. A vontade que escolhe com o coração e a clareza juntos. |

### Três de Paus (`three-of-wands`)

- **Nome (EN):** Three of Wands · **Arte:** `/tarot/minor/three-of-wands.jpg` · **Posição:** 3
- **Correspondências:** Elemento: Fogo · Sephirah: Binah · Decã: Sol em Áries
- **Resumo (`intro`):** De costas, um homem no alto do penhasco vê seus barcos partirem para o mar. Os primeiros frutos de um plano em marcha: visão ampliada, espera confiante e expansão.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `man-from-behind` | 🧍 | O Homem de Costas | Ele já fez sua parte e agora observa: a confiança de quem plantou o plano e aceita esperar. Voltado ao horizonte, deixa o passado atrás. |
| `three-wands` | 🪄 | Os Três Cajados | Três hastes firmes no chão: a base já está plantada. Um cajado serve de apoio à mão, mostrando que a vontade agora se sustenta sozinha. |
| `ships-sea` | ⛵ | Os Navios no Mar | As embarcações carregam o que foi investido rumo a terras distantes: o trabalho que sai de suas mãos e volta, um dia, com retorno. |
| `golden-sky` | 🌅 | O Céu Dourado | Um céu amarelo e aberto sobre o mar: a luz do otimismo, a promessa de que o caminho escolhido tem espaço para crescer. |

### Quatro de Paus (`four-of-wands`)

- **Nome (EN):** Four of Wands · **Arte:** `/tarot/minor/four-of-wands.jpg` · **Posição:** 4
- **Correspondências:** Elemento: Fogo · Sephirah: Chesed · Decã: Vênus em Áries
- **Resumo (`intro`):** Quatro cajados sustentam uma guirlanda de flores sobre um casal que celebra diante do castelo. A festa depois do esforço: estabilidade, lar, acolhimento e comunidade.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `garland-canopy` | 💐 | A Guirlanda | Flores e frutos pendem entre os cajados como um dossel de festa: o fruto do esforço virou celebração compartilhada. |
| `four-wands` | 🪄 | Os Quatro Cajados | Quatro pilares erguidos formam um portal: as quatro direções, os quatro elementos, uma base firme que protege a alegria. |
| `celebrating-couple` | 💃 | O Casal em Festa | Duas figuras erguem buquês de braços abertos: a alegria que se divide dobra. A conquista só se completa quando é celebrada em companhia. |
| `castle-gate` | 🏰 | O Castelo e a Ponte | Ao fundo, o castelo com sua ponte e o grupo que se aproxima: o lar como refúgio e ponto de encontro, aberto a quem chega. |

### Cinco de Paus (`five-of-wands`)

- **Nome (EN):** Five of Wands · **Arte:** `/tarot/minor/five-of-wands.jpg` · **Posição:** 5
- **Correspondências:** Elemento: Fogo · Sephirah: Gevurah · Decã: Saturno em Leão
- **Resumo (`intro`):** Cinco jovens brandem cajados num embate sem vencedor claro. Competição, atrito e a energia confusa de muitas vontades colidindo, que pode desgastar ou afiar quem participa.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `crossed-staves` | ⚔️ | Os Cajados Cruzados | Nenhum golpe acerta: os bastões se cruzam no ar e se anulam. A disputa gasta força sem produzir uma direção. |
| `five-youths` | 🧑‍🤝‍🧑 | Os Cinco Jovens | Ninguém é vilão: cada um luta por seu lugar. A carta mostra o atrito natural de quem tem ideias fortes e ainda não aprendeu a cooperar. |
| `mixed-clothing` | 🎨 | As Roupas Díspares | Cada jovem veste cores e estilos diferentes: não há uniforme nem equipe. A diversidade, quando não é organizada, vira confusão em vez de força. |
| `uneven-ground` | ⛰️ | O Terreno Irregular | O chão acidentado e a clareira aberta: um campo de treino, não de guerra. O conflito aqui é um teste de força, e não uma batalha mortal. |

### Seis de Paus (`six-of-wands`)

- **Nome (EN):** Six of Wands · **Arte:** `/tarot/minor/six-of-wands.jpg` · **Posição:** 6
- **Correspondências:** Elemento: Fogo · Sephirah: Tiferet · Decã: Júpiter em Leão
- **Resumo (`intro`):** Um cavaleiro coroado de louros volta em triunfo, cercado por uma multidão de cajados. Vitória pública, reconhecimento e o orgulho de ter vencido à vista de todos.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `laurel-wreath` | 🏆 | A Coroa de Louros | Uma coroa de louros no cajado e na cabeça do cavaleiro: a vitória conquistada que se reconhece na honra. O mérito é de quem o merece. |
| `victorious-rider` | 🏇 | O Cavaleiro Vitorioso | Ele cavalga de cabeça erguida, com a capa vermelha ao vento: a confiança de quem venceu e sabe que o sucesso vem acompanhado de responsabilidade. |
| `white-horse` | 🐴 | O Cavalo Branco | A montaria branca, enfeitada de verde: a energia domada e a pureza do propósito que levou à conquista, conduzida pelo cavaleiro e não o contrário. |
| `crowd-of-staves` | 👥 | A Multidão de Cajados | Seguidores marcham a pé ao redor, erguendo seus cajados: o sucesso pessoal depende do apoio de muitos. A glória é compartilhada com quem caminhou ao lado. |

### Sete de Paus (`seven-of-wands`)

- **Nome (EN):** Seven of Wands · **Arte:** `/tarot/minor/seven-of-wands.jpg` · **Posição:** 7
- **Correspondências:** Elemento: Fogo · Sephirah: Netzach · Decã: Marte em Leão
- **Resumo (`intro`):** No alto de uma colina, um homem defende sua posição contra seis cajados que sobem de baixo. Coragem, firmeza e a decisão de manter o que é seu mesmo em desvantagem.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `defender` | 🛡️ | O Defensor | Ele está sozinho e em guarda, olhando para baixo: quem sustenta uma convicção quase sempre se vê assim, em desvantagem, mas de pé. |
| `six-wands-below` | 🪄 | Os Seis Cajados | Seis hastes surgem de baixo: desafios que não dão trégua e obrigam a escolher o que vale a pena defender. A pressão revela o que realmente importa. |
| `mismatched-shoes` | 👞 | Os Sapatos Desiguais | Ele calça sapatos diferentes, como se tivesse se levantado às pressas: a defesa nem sempre é perfeita nem preparada, e ainda assim se mantém. |
| `high-ground` | ⛰️ | A Posição Elevada | A colina dá vantagem a quem a ocupa: ver mais longe e ter apoio no chão. A firmeza interior é o terreno mais seguro que existe. |

### Oito de Paus (`eight-of-wands`)

- **Nome (EN):** Eight of Wands · **Arte:** `/tarot/minor/eight-of-wands.jpg` · **Posição:** 8
- **Correspondências:** Elemento: Fogo · Sephirah: Hod · Decã: Mercúrio em Sagitário
- **Resumo (`intro`):** Oito cajados cortam o céu em voo veloz rumo ao chão, sem nenhuma figura humana. Rapidez, mensagens e acontecimentos que chegam de uma vez, com a energia de quem não pode parar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `eight-wands` | 🪄 | Os Oito Cajados | Paralelos e em movimento, os bastões avançam todos na mesma direção: ações alinhadas que ganham velocidade e chegam ao destino com força. |
| `open-sky` | ☁️ | O Céu Aberto | Um céu azul e limpo, sem nuvens a bloquear: nada atrapalha a passagem. É a fase em que os caminhos se abrem e os obstáculos recuam. |
| `river` | 🏞️ | O Rio | Um curso de água corre pela paisagem na mesma direção dos cajados: o fluxo natural das coisas, quando se está em sintonia com ele, acelera tudo. |
| `green-hills` | 🌿 | As Colinas Verdes | Terra fértil e uma casa discreta ao fundo: o ponto de chegada é acolhedor. A pressa leva a algo concreto, com raízes e lugar para pousar. |

### Nove de Paus (`nine-of-wands`)

- **Nome (EN):** Nine of Wands · **Arte:** `/tarot/minor/nine-of-wands.jpg` · **Posição:** 9
- **Correspondências:** Elemento: Fogo · Sephirah: Yesod · Decã: Lua em Sagitário
- **Resumo (`intro`):** Ferido e enfaixado, um homem se apoia no cajado diante de uma cerca de bastões. Cansaço, cautela e a persistência de quem já enfrentou muito e ainda não desiste.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `bandaged-head` | 🤕 | A Cabeça Enfaixada | A atadura revela batalhas passadas: a experiência que deixa marcas, mas também ensina. Cada ferida é uma lição que o torna mais atento. |
| `leaning-wand` | 🪄 | O Cajado de Apoio | Ele se apoia no bastão que já foi arma: a força que antes servia ao ataque agora sustenta o descanso. Resistir também é saber usar o que se tem. |
| `wand-fence` | 🚧 | A Cerca de Cajados | Oito hastes enfileiradas atrás dele formam uma barreira: as defesas que construiu, uma a uma, ao longo do caminho. Elas protegem, mas também limitam. |
| `wary-gaze` | 👁️ | O Olhar Vigilante | Ele olha de lado, atento a uma ameaça que pode ou não vir: a desconfiança de quem já foi surpreendido e agora mede cada passo. |

### Dez de Paus (`ten-of-wands`)

- **Nome (EN):** Ten of Wands · **Arte:** `/tarot/minor/ten-of-wands.jpg` · **Posição:** 10
- **Correspondências:** Elemento: Fogo · Sephirah: Malkuth · Decã: Saturno em Sagitário
- **Resumo (`intro`):** Curvado sob o peso de dez cajados amarrados, um homem caminha em direção à vila ao longe. Sobrecarga, responsabilidade assumida demais e a necessidade de repartir o peso.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `bundle-of-wands` | 🪵 | O Feixe de Cajados | Dez hastes carregadas juntas escondem o rosto do homem: quando se acumula demais, a tarefa passa a ofuscar quem a realiza. |
| `bent-back` | 🧎 | As Costas Curvadas | O corpo vergado mostra o custo do esforço sem pausa: o sucesso conquistado cobra seu preço quando não se sabe soltar o que já foi cumprido. |
| `distant-village` | 🏘️ | A Vila ao Longe | As casas ainda estão distantes, mas visíveis: o fim do trabalho está à vista. Só resta decidir como chegar lá sem se quebrar no caminho. |
| `dusty-path` | 🛤️ | O Caminho de Terra | A trilha estreita leva direto à porta: não há atalhos. Cada passo é inevitável e cada um conta, mesmo com o fardo nos ombros. |

### Valete de Paus (`page-of-wands`)

- **Nome (EN):** Page of Wands · **Arte:** `/tarot/minor/page-of-wands.jpg` · **Posição:** Valete
- **Correspondências:** Elemento: Fogo · Letra: ה Heh · Elemento da corte: Terra
- **Resumo (`intro`):** Um jovem de túnica ornada de salamandras fita o cajado que segura, em meio ao deserto. Curiosidade, entusiasmo e a mensagem de uma ideia nova que pede para ser explorada.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `salamander-tunic` | 🦎 | A Túnica de Salamandras | A salamandra, criatura do fogo, estampa a roupa do jovem: o elemento da carta vive nele, ainda sem dominar a própria chama. |
| `wand-gaze` | 🪄 | O Cajado Contemplado | Ele observa o bastão como quem examina uma possibilidade: antes de agir, olha para a própria vontade e se pergunta o que fazer com ela. |
| `feathered-hat` | 🪶 | O Chapéu com Pena | A pena no chapéu é leveza e liberdade: a mente aberta do aprendiz, pronta para ser levada pelo vento de uma nova ideia. |
| `desert-pyramids` | 🏜️ | O Deserto e as Pirâmides | Areia e pirâmides ao fundo: terreno árido e antigo onde só o fogo da iniciativa pode fazer algo brotar. Tudo ainda está por ser feito. |

### Cavaleiro de Paus (`knight-of-wands`)

- **Nome (EN):** Knight of Wands · **Arte:** `/tarot/minor/knight-of-wands.jpg` · **Posição:** Cavaleiro
- **Correspondências:** Elemento: Fogo · Letra: ו Vav · Elemento da corte: Ar
- **Resumo (`intro`):** Um cavaleiro de armadura e túnica de salamandras avança a galope num cavalo empinado. Impulso, aventura e entusiasmo que não mede riscos, mas pode atropelar o que está no caminho.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `rearing-horse` | 🐎 | O Cavalo Empinado | O cavalo avança em fúria, pronto para disparar: a energia bruta do fogo, que ainda espera a mão firme que a direcione. |
| `red-plume` | 🪶 | A Pluma Vermelha | A pluma ardente no elmo é a ousadia à mostra: o cavaleiro quer ser visto e reconhecido, e seu entusiasmo contagia quem o segue. |
| `salamander-surcoat` | 🦎 | A Túnica de Fogo | As salamandras amarelas cobrem o peito: ele veste o próprio elemento. A paixão está à flor da pele, sem filtros entre desejo e ação. |
| `desert-ride` | 🏜️ | O Deserto Aberto | A cavalgada cruza areia e pirâmides: uma jornada longa e sem sombra, onde só o ímpeto mantém o ânimo, e o destino ainda não está claro. |

### Rainha de Paus (`queen-of-wands`)

- **Nome (EN):** Queen of Wands · **Arte:** `/tarot/minor/queen-of-wands.jpg` · **Posição:** Rainha
- **Correspondências:** Elemento: Fogo · Letra: ה Heh · Elemento da corte: Água
- **Resumo (`intro`):** Sentada num trono de leões com um girassol na mão e um gato preto aos pés, a rainha irradia confiança e calor. Magnetismo, generosidade e uma vontade que atrai em vez de impor.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `sunflower` | 🌻 | O Girassol | A flor que acompanha o Sol: vitalidade, otimismo e abundância. A rainha o segura sem esforço, como quem faz brilhar o que toca. |
| `wand-in-hand` | 🪄 | O Cajado da Rainha | O bastão em flor, firme na mão direita: a criatividade e a vontade sob controle, a energia posta a serviço de um propósito claro. |
| `black-cat` | 🐈‍⬛ | O Gato Preto | O felino atento aos pés do trono: intuição, independência e o lado misterioso da rainha, que sente antes de ver e confia no que percebe. |
| `lion-throne` | 🦁 | O Trono de Leões | Leões entalhados no encosto: coragem e domínio de si. Ela governa com a força serena de quem não precisa provar nada a ninguém. |

### Rei de Paus (`king-of-wands`)

- **Nome (EN):** King of Wands · **Arte:** `/tarot/minor/king-of-wands.jpg` · **Posição:** Rei
- **Correspondências:** Elemento: Fogo · Letra: י Yod · Elemento da corte: Fogo
- **Resumo (`intro`):** O rei de manto estampado de salamandras empunha o cajado em flor, sentado num trono de leões. Visão, liderança carismática e o domínio do fogo que inspira outros a segui-lo.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `budding-sceptre` | 🪄 | O Cetro em Flor | O cajado ainda dá brotos: o rei não esqueceu que o poder nasce de algo vivo. Seu comando é criador, e não apenas administrador. |
| `salamander-mantle` | 🦎 | O Manto de Salamandras | O manto bordado com salamandras mostra o fogo incorporado: ele não teme a chama porque a atravessou e a transformou em autoridade. |
| `lion-throne` | 🦁 | O Trono de Leões e Salamandras | Leões e salamandras decoram o trono: realeza fundada em coragem e paixão. O poder do rei é a soma das forças que aprendeu a conduzir. |
| `crown-gaze` | 👑 | A Coroa e o Olhar | Coroa em chamas e olhar voltado ao lado, adiante: ele enxerga longe e decide pelo futuro, não só pelo momento. |

## Copas (Cups) — Água

### Ás de Copas (`ace-of-cups`)

- **Nome (EN):** Ace of Cups · **Arte:** `/tarot/minor/ace-of-cups.jpg` · **Posição:** Ás
- **Correspondências:** Elemento: Água · Sephirah: Kether
- **Resumo (`intro`):** Uma mão sai da nuvem oferecendo um cálice transbordante, enquanto uma pomba deposita a hóstia sobre ele. O início de um amor, de uma intuição ou de uma graça que se derrama sem medida.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `hand-cloud` | ✋ | A Mão na Nuvem | O dom que desce do alto: o amor e a graça não se conquistam, são oferecidos. A mão apresenta o cálice e espera que você o receba. |
| `overflowing-chalice` | 🏆 | O Cálice Transbordante | A taça cheia de que a água escorre: a abundância emocional que não cabe em si e precisa ser compartilhada para continuar viva. |
| `dove-wafer` | 🕊️ | A Pomba e a Hóstia | A pomba traz o disco sagrado marcado com uma cruz: o espírito que abençoa a matéria. O sentimento puro é também uma forma de comunhão. |
| `lotus-pond` | 🪷 | O Lago de Lótus | Cinco fios de água caem num lago de lírios: os cinco sentidos alimentando a alma. Do fundo calmo da emoção brotam as flores da percepção. |

### Dois de Copas (`two-of-cups`)

- **Nome (EN):** Two of Cups · **Arte:** `/tarot/minor/two-of-cups.jpg` · **Posição:** 2
- **Correspondências:** Elemento: Água · Sephirah: Chokmah · Decã: Vênus em Câncer
- **Resumo (`intro`):** Um homem e uma mulher trocam taças sob o caduceu alado de Hermes. Atração mútua, parceria e o pacto de dois que se reconhecem em igualdade e respeito.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `cup-exchange` | 🥂 | A Troca das Taças | Cada um oferece e recebe ao mesmo tempo: o vínculo verdadeiro é uma troca, nunca uma posse. As taças se encontram no centro. |
| `winged-caduceus` | 🦁 | O Caduceu e o Leão Alado | Duas serpentes enlaçadas e uma cabeça de leão com asas: o desejo apaixonado (leão) elevado pela comunicação e pela consciência (o caduceu). |
| `couple-wreaths` | 💞 | O Casal Coroado | Ambos usam coroas de folhagem: uma união que celebra a vida e não nega a natureza. Estão frente a frente, no mesmo nível, sem hierarquia. |
| `house-hill` | 🏡 | A Casa na Colina | Ao fundo, uma casa entre colinas: o lugar que essa união pode construir. A carta aponta para um futuro compartilhado, ainda em formação. |

### Três de Copas (`three-of-cups`)

- **Nome (EN):** Three of Cups · **Arte:** `/tarot/minor/three-of-cups.jpg` · **Posição:** 3
- **Correspondências:** Elemento: Água · Sephirah: Binah · Decã: Mercúrio em Câncer
- **Resumo (`intro`):** Três mulheres dançam com as taças erguidas entre frutos e guirlandas. A alegria compartilhada, a amizade e a celebração de uma colheita que ninguém conquistou sozinho.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `raised-cups` | 🥂 | As Taças Erguidas | Três brindes no ar, reunidos no centro: a alegria se multiplica ao ser compartilhada. Um brinde à vida, ao encontro e ao que já se alcançou. |
| `dancing-women` | 💃 | As Três Dançarinas | Mãos dadas em roda, vestidas de cores diferentes: três pessoas, três temperamentos, uma só harmonia. A amizade que une sem anular as diferenças. |
| `flower-garlands` | 🌸 | As Guirlandas de Flores | Coroas e guirlandas de flores enfeitam a dança: a festa é também um ritual de beleza, em que a natureza participa do encontro. |
| `harvest-fruits` | 🎃 | Os Frutos da Colheita | Abóboras e frutas aos pés das dançarinas: a abundância que veio do trabalho e do tempo. A festa é a gratidão por aquilo que amadureceu. |

### Quatro de Copas (`four-of-cups`)

- **Nome (EN):** Four of Cups · **Arte:** `/tarot/minor/four-of-cups.jpg` · **Posição:** 4
- **Correspondências:** Elemento: Água · Sephirah: Chesed · Decã: Lua em Câncer
- **Resumo (`intro`):** Um jovem de braços cruzados medita sob uma árvore, ignorando as três taças à frente enquanto uma mão oferece uma quarta. Apatia, contemplação e a oportunidade que passa despercebida.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `hand-fourth-cup` | ✋ | A Mão e a Quarta Taça | Uma mão sai da nuvem oferecendo mais uma taça: a vida continua trazendo novas possibilidades, mesmo quando não estamos olhando para elas. |
| `three-cups-ground` | 🥤 | As Três Taças no Chão | Alinhadas à frente dele, as taças que já tem: o que foi dado se torna invisível quando a mente só quer o que falta. |
| `crossed-arms` | 🧘 | Os Braços Cruzados | Postura fechada e olhar baixo: ele se protege do mundo. A introspecção ajuda, mas pode virar muro quando impede de receber. |
| `tree` | 🌳 | A Árvore | Ele repousa ao pé de uma árvore robusta: o refúgio da pausa. É um tempo legítimo de reflexão, desde que não se transforme em estagnação. |

### Cinco de Copas (`five-of-cups`)

- **Nome (EN):** Five of Cups · **Arte:** `/tarot/minor/five-of-cups.jpg` · **Posição:** 5
- **Correspondências:** Elemento: Água · Sephirah: Gevurah · Decã: Marte em Escorpião
- **Resumo (`intro`):** Uma figura de capa preta chora três taças derramadas, sem ver as duas que ainda estão de pé atrás dela. Luto, arrependimento e a escolha de olhar para o que ainda resta.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `black-cloak` | 🖤 | A Capa Negra | O corpo envolto em luto, de costas para o que ainda tem: a dor ocupa todo o espaço e impede de ver além dela. |
| `spilled-cups` | 🍷 | As Taças Derramadas | Três taças caídas e o líquido escorrido: a perda é real e merece ser sentida. A carta não pede para negar o luto, e sim para atravessá-lo. |
| `standing-cups` | 🏆 | As Duas Taças em Pé | Cheias e firmes atrás dele: o que sobrou, esperando ser notado. Uma mudança de postura basta para perceber que nem tudo se perdeu. |
| `river-bridge` | 🌉 | O Rio e a Ponte | Uma ponte sobre o rio leva a uma casa ao longe: a travessia do luto é possível. A água separa, mas há caminho para o outro lado. |

### Seis de Copas (`six-of-cups`)

- **Nome (EN):** Six of Cups · **Arte:** `/tarot/minor/six-of-cups.jpg` · **Posição:** 6
- **Correspondências:** Elemento: Água · Sephirah: Tiferet · Decã: Sol em Escorpião
- **Resumo (`intro`):** Duas crianças trocam um cálice de flores num pátio de aldeia antiga. Nostalgia, inocência e a doçura de gestos simples que lembram quem fomos e o que ainda podemos dar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `flower-cups` | 🌼 | As Taças de Flores | Seis cálices transbordam de flores brancas: lembranças que florescem. O que um dia foi guardado com carinho continua dando frutos. |
| `children-gift` | 🧒 | As Crianças e o Presente | O mais velho oferece uma taça ao menor: generosidade sem interesse, cuidado entre gerações. A bondade mais pura se aprende cedo. |
| `village-courtyard` | 🏘️ | O Pátio da Aldeia | Casas de pedra, um brasão e um chão conhecido: o cenário da infância. Um lugar seguro ao qual a memória volta em busca de afeto. |
| `background-figure` | 🚶 | O Vulto ao Fundo | Uma figura caminha ao longe, de costas: o tempo que passa e o adulto que o menino será. A lembrança convive com a vida que segue. |

### Sete de Copas (`seven-of-cups`)

- **Nome (EN):** Seven of Cups · **Arte:** `/tarot/minor/seven-of-cups.jpg` · **Posição:** 7
- **Correspondências:** Elemento: Água · Sephirah: Netzach · Decã: Vênus em Escorpião
- **Resumo (`intro`):** Diante de uma silhueta sombria, sete taças flutuam entre as nuvens, cada uma com uma visão diferente. Fantasia, múltiplas opções e a necessidade de distinguir o sonho do possível.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `dark-silhouette` | 👤 | A Silhueta Escura | De costas e sem rosto, a figura somos nós diante das opções: contemplamos tudo e ainda não escolhemos nada. A dúvida é parte do desejo. |
| `veiled-figure` | 🫥 | A Figura Velada | Um vulto coberto por um pano na taça do centro: o mistério que atrai e assusta. O que ainda não se revelou pede coragem para ser descoberto. |
| `serpent-dragon` | 🐉 | A Serpente e o Dragão | Visões ameaçadoras entre as promessas: nem tudo o que brilha é seguro. As ilusões trazem riscos escondidos junto ao encanto. |
| `jewels-laurel` | 💎 | As Joias e os Louros | Joias, uma coroa de louros e uma torre: riqueza, glória e poder prometidos. Desejos grandiosos que nem sempre têm base na realidade. |

### Oito de Copas (`eight-of-cups`)

- **Nome (EN):** Eight of Cups · **Arte:** `/tarot/minor/eight-of-cups.jpg` · **Posição:** 8
- **Correspondências:** Elemento: Água · Sephirah: Hod · Decã: Saturno em Peixes
- **Resumo (`intro`):** Sob uma lua eclipsada, um homem de manto vermelho deixa para trás oito taças arrumadas e sobe em direção às montanhas. Partir do que não satisfaz mais, em busca de um sentido maior.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `departing-man` | 🚶 | O Caminhante | Ele parte de cajado na mão, sem olhar para trás: a decisão silenciosa de quem sabe que ficar seria trair a própria necessidade. |
| `stacked-cups` | 🥃 | As Oito Taças | Arrumadas, completas, mas com um vão no meio: tudo parece em ordem, e ainda assim falta o essencial. O que foi construído não preenche. |
| `eclipsed-moon` | 🌘 | A Lua Eclipsada | A lua com rosto, em parte coberta pelo sol: a intuição e a razão se encontram. O ciclo emocional se encerra e outro está para começar. |
| `mountains-river` | ⛰️ | As Montanhas e o Rio | O caminho cruza água e sobe a rocha: a busca espiritual exige travessias e esforço. O destino ainda está fora de vista. |

### Nove de Copas (`nine-of-cups`)

- **Nome (EN):** Nine of Cups · **Arte:** `/tarot/minor/nine-of-cups.jpg` · **Posição:** 9
- **Correspondências:** Elemento: Água · Sephirah: Yesod · Decã: Júpiter em Peixes
- **Resumo (`intro`):** Um homem satisfeito, de braços cruzados, senta diante de nove taças dispostas em arco. A carta dos desejos realizados: contentamento, prazer merecido e a alegria de poder desfrutar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `content-man` | 😌 | O Homem Satisfeito | Barriga à frente e sorriso discreto: ele reconhece o que conquistou. Há um prazer legítimo em simplesmente aproveitar o que se construiu. |
| `arc-of-cups` | 🏆 | O Arco de Taças | As nove taças alinhadas na prateleira, todas à vista: um desejo cumprido é exibido com orgulho, como símbolo do que se alcançou. |
| `blue-drape` | 🟦 | O Pano Azul | Um tecido azul cobre a mesa e o fundo: conforto, proteção e calma emocional. Tudo está no lugar e nada precisa ser escondido. |
| `golden-backdrop` | 🌟 | O Fundo Dourado | Um fundo amarelo intenso: a luz do otimismo e da recompensa. A vida mostra sua face mais generosa a quem soube esperar. |

### Dez de Copas (`ten-of-cups`)

- **Nome (EN):** Ten of Cups · **Arte:** `/tarot/minor/ten-of-cups.jpg` · **Posição:** 10
- **Correspondências:** Elemento: Água · Sephirah: Malkuth · Decã: Marte em Peixes
- **Resumo (`intro`):** Sob um arco-íris de dez taças, um casal ergue os braços enquanto duas crianças brincam diante de uma casa. Plenitude afetiva, harmonia familiar e a felicidade que se estende a todos.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `rainbow-cups` | 🌈 | O Arco-íris de Taças | Dez taças desenham o arco que une céu e terra: a bênção que recompensa e abriga. Depois da chuva, a promessa de uma vida em paz. |
| `embracing-couple` | 💑 | O Casal de Braços Erguidos | Abraçados, de costas e com os braços para o alto: gratidão compartilhada. Eles não olham um para o outro, mas na mesma direção. |
| `playing-children` | 🧒 | As Crianças que Dançam | Duas crianças brincam sem pressa: a felicidade que se renova nas gerações. A casa só é completa quando há alegria para continuar. |
| `home-valley` | 🏡 | A Casa e o Vale | Uma casa entre árvores à beira do rio: o lar que abriga e o campo que sustenta. Raízes, estabilidade e a paz de pertencer a um lugar. |

### Valete de Copas (`page-of-cups`)

- **Nome (EN):** Page of Cups · **Arte:** `/tarot/minor/page-of-cups.jpg` · **Posição:** Valete
- **Correspondências:** Elemento: Água · Letra: ה Heh · Elemento da corte: Terra
- **Resumo (`intro`):** Um jovem de túnica florida fita um peixe que emerge de sua taça diante do mar. Mensagem inesperada, sensibilidade criativa e o convite a levar a sério a imaginação.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `fish-in-cup` | 🐟 | O Peixe na Taça | Uma criatura do inconsciente surge sem aviso: uma ideia, um sentimento ou um sonho que quer ser olhado. Ele a encara com espanto e ternura. |
| `lotus-tunic` | 🪷 | A Túnica de Lótus | Flores de lótus bordadas na roupa: pureza e sensibilidade espiritual. O jovem carrega a delicadeza como parte de sua identidade. |
| `sea-waves` | 🌊 | O Mar Agitado | As ondas ao fundo trazem o mundo emocional em movimento: o fluxo de onde saem as mensagens e as intuições que mudam o dia. |
| `blue-hat` | 🎩 | O Chapéu Azul | Um turbante azul com tecido solto: a mente leve e criativa de quem ainda brinca com as formas e sonha acordado. |

### Cavaleiro de Copas (`knight-of-cups`)

- **Nome (EN):** Knight of Cups · **Arte:** `/tarot/minor/knight-of-cups.jpg` · **Posição:** Cavaleiro
- **Correspondências:** Elemento: Água · Letra: ו Vav · Elemento da corte: Ar
- **Resumo (`intro`):** Um cavaleiro de armadura alada avança com calma, trazendo a taça diante de si. Romance, proposta sincera e a delicadeza de quem age com o coração, sem pressa de conquistar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `offered-cup` | 🏆 | A Taça Oferecida | Ele a estende com as duas mãos: um gesto de entrega, e não de exigência. O presente é o sentimento, apresentado com respeito. |
| `winged-helmet` | 🪽 | O Elmo Alado | Asas no elmo e nos calcanhares, como Mercúrio: imaginação e mensagens que voam. A cavalaria aqui serve ao ideal e à inspiração. |
| `white-horse` | 🐴 | O Cavalo Branco Calmo | A montaria anda a passo, sem pressa: ele escolhe a ternura e a paciência. A emoção guia o ritmo, em vez da ambição. |
| `river-mountains` | 🏞️ | O Rio e a Colina | Um riacho serpenteia entre colinas distantes: o fluxo do sentimento que atravessa a paisagem e leva a cavalgada em direção ao destino. |

### Rainha de Copas (`queen-of-cups`)

- **Nome (EN):** Queen of Cups · **Arte:** `/tarot/minor/queen-of-cups.jpg` · **Posição:** Rainha
- **Correspondências:** Elemento: Água · Letra: ה Heh · Elemento da corte: Água
- **Resumo (`intro`):** A rainha contempla uma taça ornamentada e fechada, sentada num trono à beira-mar. Intuição profunda, compaixão e a capacidade de sentir o outro sem perder o próprio centro.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `ornate-cup` | 🏺 | A Taça Fechada | Diferente das outras, esta taça tem tampa e anjos nas alças: o sentimento sagrado guardado com cuidado. Ela o sustenta, sem derramá-lo. |
| `shell-throne` | 🐚 | O Trono de Conchas | Um trono decorado com conchas e crianças aladas: o mar o molda. Seu poder é sensível e nasce da sintonia com os ciclos da emoção. |
| `tide-shore` | 🌊 | A Orla do Mar | Seus pés repousam sobre seixos, com a água a lamber a base do trono: ela vive no limiar entre o consciente (terra) e o inconsciente (mar). |
| `crown-veil` | 👑 | A Coroa e o Olhar | Um olhar fixo e absorto na taça, sob uma coroa discreta: a atenção interior vale mais do que o domínio sobre os outros. |

### Rei de Copas (`king-of-cups`)

- **Nome (EN):** King of Cups · **Arte:** `/tarot/minor/king-of-cups.jpg` · **Posição:** Rei
- **Correspondências:** Elemento: Água · Letra: י Yod · Elemento da corte: Fogo
- **Resumo (`intro`):** O rei senta num trono flutuante sobre o mar agitado, com taça e cetro nas mãos. Domínio das emoções, sabedoria compassiva e a calma de quem governa sem negar a profundidade.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `cup-and-sceptre` | 🏆 | A Taça e o Cetro | Uma mão guarda o sentimento, a outra, a autoridade: o rei equilibra coração e comando e não deixa um sufocar o outro. |
| `floating-throne` | 🪨 | O Trono nas Águas | O trono boia entre ondas: ele mantém a estabilidade no meio da turbulência. Serenidade não é ausência de tempestade, é presença nela. |
| `leaping-fish` | 🐟 | O Peixe que Salta | Um peixe pula ao lado do trono: o inconsciente é visitante bem-vindo, não ameaça. O rei convive com seus impulsos profundos. |
| `ship-horizon` | 🚢 | O Navio no Horizonte | Um barco cruza ao longe: as aventuras do mundo exterior continuam, enquanto o rei guarda a calma interior que lhes serve de porto. |

## Espadas (Swords) — Ar

### Ás de Espadas (`ace-of-swords`)

- **Nome (EN):** Ace of Swords · **Arte:** `/tarot/minor/ace-of-swords.jpg` · **Posição:** Ás
- **Correspondências:** Elemento: Ar · Sephirah: Kether
- **Resumo (`intro`):** Uma mão emerge da nuvem empunhando uma espada coroada, ladeada por louros e palmas. O momento da clareza: uma verdade que corta a confusão e a vitória do pensamento sobre a dúvida.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `hand-cloud` | ✋ | A Mão na Nuvem | A lucidez chega como dom e como responsabilidade: a mão oferece a espada, mas a verdade só serve a quem a empunha com firmeza. |
| `crowned-sword` | ⚔️ | A Espada Coroada | A coroa no alto da lâmina: o intelecto elevado a serviço do bem. A mente que decide com justiça tem autoridade de verdade. |
| `laurel-palm` | 🌿 | O Louro e a Palma | Os ramos de vitória e de paz pendem da coroa: a verdade que vence sem destruir. O triunfo do pensamento traz também reconciliação. |
| `barren-peaks` | 🏔️ | Os Picos Áridos | Montanhas nuas ao fundo: a paisagem do pensamento puro é fria e exigente. Clareza tem altitude, e o ar rarefeito não perdoa a ilusão. |

### Dois de Espadas (`two-of-swords`)

- **Nome (EN):** Two of Swords · **Arte:** `/tarot/minor/two-of-swords.jpg` · **Posição:** 2
- **Correspondências:** Elemento: Ar · Sephirah: Chokmah · Decã: Lua em Libra
- **Resumo (`intro`):** Uma mulher de olhos vendados cruza duas espadas sobre o peito, diante de um mar calmo sob a lua crescente. Impasse, equilíbrio forçado e a decisão adiada por medo de olhar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `blindfold` | 🙈 | A Venda nos Olhos | Ela escolhe não ver: a venda protege da dor imediata, mas impede de conhecer as opções. Decidir às cegas é adiar a decisão. |
| `crossed-swords` | ⚔️ | As Espadas Cruzadas | Duas lâminas em equilíbrio tenso contra o peito: o coração protegido pela razão, mas também preso por ela. Nada avança nem recua. |
| `crescent-moon` | 🌙 | A Lua Crescente | A lua nova no céu aponta para a intuição ainda por se manifestar: algo está prestes a crescer, desde que ela se permita enxergar. |
| `calm-sea-rocks` | 🌊 | O Mar e as Rochas | Um mar calmo com rochas à vista: a superfície tranquila esconde perigos. A paz aparente depende de enfrentar o que está submerso. |

### Três de Espadas (`three-of-swords`)

- **Nome (EN):** Three of Swords · **Arte:** `/tarot/minor/three-of-swords.jpg` · **Posição:** 3
- **Correspondências:** Elemento: Ar · Sephirah: Binah · Decã: Saturno em Libra
- **Resumo (`intro`):** Um coração vermelho é atravessado por três espadas sob nuvens e chuva. O luto, a traição ou a verdade que dói: a dor que não se discute e precisa ser atravessada para curar.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `pierced-heart` | ❤️‍🩹 | O Coração Ferido | A carta não suaviza: o coração está ferido e a dor é real. Reconhecê-la é o primeiro passo, porque o que é negado se cronifica. |
| `three-swords` | 🗡️ | As Três Espadas | Três lâminas simétricas entram juntas: a dor que vem de um só golpe com várias raízes. Cada espada nomeia uma ferida: perda, palavra e verdade. |
| `rain` | 🌧️ | A Chuva | A chuva cai sem parar: a tristeza também limpa. As lágrimas não são fraqueza, são o modo de a alma lavar o que não pode carregar. |
| `storm-clouds` | ⛈️ | As Nuvens Pesadas | Um céu cinza cobre tudo: a tempestade é um estado, não um destino. Nuvens carregadas passam, mesmo quando parecem permanentes. |

### Quatro de Espadas (`four-of-swords`)

- **Nome (EN):** Four of Swords · **Arte:** `/tarot/minor/four-of-swords.jpg` · **Posição:** 4
- **Correspondências:** Elemento: Ar · Sephirah: Chesed · Decã: Júpiter em Libra
- **Resumo (`intro`):** Um cavaleiro repousa em efígie sobre um túmulo, sob um vitral, com três espadas na parede. Pausa necessária, recolhimento e o descanso que recompõe a mente depois de uma batalha.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `stained-glass` | 🪟 | O Vitral | Uma cena sagrada colorida filtra a luz: a fé e o sentido que acompanham o descanso. Silêncio não é vazio, é um espaço de cura. |
| `effigy-knight` | 🛌 | A Efígie do Cavaleiro | Imóvel, mãos em prece: o guerreiro depõe as armas por um tempo. Recolher-se também é uma forma de coragem e de estratégia. |
| `hanging-swords` | 🗡️ | As Espadas na Parede | Três lâminas penduradas acima: os pensamentos e as batalhas em suspenso. Estão ao alcance, mas, por ora, ninguém precisa empunhá-las. |
| `sword-below` | ⚔️ | A Espada Sob o Túmulo | Uma quarta espada repousa junto ao sarcófago: a força guardada e à mão. O descanso inclui preparar-se para voltar à ação. |

### Cinco de Espadas (`five-of-swords`)

- **Nome (EN):** Five of Swords · **Arte:** `/tarot/minor/five-of-swords.jpg` · **Posição:** 5
- **Correspondências:** Elemento: Ar · Sephirah: Gevurah · Decã: Vênus em Aquário
- **Resumo (`intro`):** Um homem sorri segurando três espadas, enquanto dois outros se afastam derrotados. Vitória duvidosa, conflito vencido a qualquer custo e o preço de ganhar sem generosidade.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `victor` | 😏 | O Vencedor | O sorriso de canto revela satisfação e desprezo: ele venceu, mas está sozinho. Ganhar a discussão pode custar o vínculo. |
| `collected-swords` | ⚔️ | As Espadas Recolhidas | Ele toma as armas dos derrotados: o triunfo se mede em despojos. Quem acumula armas alheias vive sempre à espera da próxima luta. |
| `departing-losers` | 🚶 | Os que Se Afastam | Dois vultos caminham de cabeça baixa rumo ao mar: as consequências da derrota. A carta lembra que todo conflito deixa ressentimentos. |
| `stormy-sky` | 🌥️ | O Céu Rasgado | Nuvens longas e agitadas cortam o céu: o ar ainda está tenso depois do embate. Mesmo o vencedor não encontra calma imediata. |

### Seis de Espadas (`six-of-swords`)

- **Nome (EN):** Six of Swords · **Arte:** `/tarot/minor/six-of-swords.jpg` · **Posição:** 6
- **Correspondências:** Elemento: Ar · Sephirah: Tiferet · Decã: Mercúrio em Aquário
- **Resumo (`intro`):** Um barqueiro conduz uma mulher e uma criança encapuzadas por águas agitadas rumo a águas calmas, com seis espadas no casco. A travessia da crise: distância, transição e recuperação gradual.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `ferryman` | 🛶 | O Barqueiro | De costas, empurra a embarcação com uma vara: alguém conduz a travessia sem exigir nada. Aceitar ajuda também é parte da recuperação. |
| `hooded-passengers` | 🧕 | Os Passageiros Encapuzados | A mulher e a criança seguem em silêncio, cobertas: a dor ainda é discreta e carregada com dignidade. Partir também é proteger quem se ama. |
| `six-swords-hull` | 🗡️ | As Seis Espadas | Seis lâminas fincadas no barco acompanham a viagem: as lembranças e os pensamentos que se carregam. Deixar o lugar não apaga o que se viveu. |
| `two-waters` | 🌊 | As Duas Águas | A água à esquerda é turbulenta, à direita, calma: o antes e o depois. A mudança de estado é gradual e já está em curso. |

### Sete de Espadas (`seven-of-swords`)

- **Nome (EN):** Seven of Swords · **Arte:** `/tarot/minor/seven-of-swords.jpg` · **Posição:** 7
- **Correspondências:** Elemento: Ar · Sephirah: Netzach · Decã: Lua em Aquário
- **Resumo (`intro`):** Um homem se afasta na ponta dos pés carregando cinco espadas e deixa duas para trás, com um acampamento ao fundo. Estratégia, furtividade e o dilema entre a astúcia e a honestidade.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `sneaking-man` | 🥷 | O Furtivo | Anda de lado, olhando para trás com um sorriso: confia na própria esperteza. A carta pergunta se o atalho vale o risco de ser descoberto. |
| `five-swords-carried` | ⚔️ | As Cinco Espadas | Ele leva só o que consegue segurar: não dá para ganhar tudo. Decidir o que levar é também decidir o que abandonar. |
| `swords-left-behind` | 🗡️ | As Duas Espadas Deixadas | Duas lâminas ficam cravadas no solo: o que sobrou, esquecido ou sacrificado. Toda fuga deixa rastros que podem entregar quem foge. |
| `camp-tents` | ⛺ | O Acampamento | Tendas e figuras ao longe: o grupo de onde ele sai sem aviso. A carta fala de segredos, de confiança rompida e de agir às escondidas. |

### Oito de Espadas (`eight-of-swords`)

- **Nome (EN):** Eight of Swords · **Arte:** `/tarot/minor/eight-of-swords.jpg` · **Posição:** 8
- **Correspondências:** Elemento: Ar · Sephirah: Hod · Decã: Júpiter em Gêmeos
- **Resumo (`intro`):** Uma mulher de olhos vendados e amarrada está cercada por oito espadas num chão encharcado. Sensação de prisão, medo e a revelação de que a saída depende da própria percepção.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `bound-blindfold` | 🧣 | A Venda e as Amarras | O tecido solto no corpo e nos olhos: as prisões aqui são folgadas. O que prende é a crença de que não há saída, mais do que as cordas. |
| `eight-swords` | 🗡️ | As Oito Espadas | As lâminas formam uma cerca, mas deixam brechas: o medo desenha limites que a realidade não impõe. Os obstáculos são menos sólidos do que parecem. |
| `wet-ground` | 💧 | O Chão Molhado | A água cobre os pés dela: as emoções tomam conta do terreno e dificultam o passo. Para sair, é preciso aceitar a lama. |
| `castle-on-cliff` | 🏰 | O Castelo no Penhasco | Ao longe, no alto, uma fortaleza: a segurança está à vista. A saída existe, mas exige tirar a venda e dar o primeiro passo. |

### Nove de Espadas (`nine-of-swords`)

- **Nome (EN):** Nine of Swords · **Arte:** `/tarot/minor/nine-of-swords.jpg` · **Posição:** 9
- **Correspondências:** Elemento: Ar · Sephirah: Yesod · Decã: Marte em Gêmeos
- **Resumo (`intro`):** Sentada na cama, uma pessoa esconde o rosto nas mãos sob nove espadas penduradas na escuridão. Ansiedade, culpa e as noites em que a mente trabalha contra o descanso.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `face-in-hands` | 🫣 | O Rosto nas Mãos | Ela chora sem ver ninguém: o sofrimento é privado e silencioso. Nomear a angústia é o primeiro movimento para dissolvê-la. |
| `nine-swords-wall` | 🗡️ | As Nove Espadas | Penduradas no ar, sem tocá-la: os medos pesam mais na imaginação do que na realidade. As lâminas ameaçam, mas ainda não caíram. |
| `rose-quilt` | 🛏️ | A Colcha de Rosas | Rosas e símbolos astrológicos bordados na manta: o amor e o destino a cobrem, mesmo na noite escura. Há consolo na própria cama. |
| `carved-bed` | 🪑 | O Entalhe na Cama | Uma cena gravada no leito mostra uma luta e uma figura caída: a origem da culpa está na memória, repetida a cada noite sem solução. |

### Dez de Espadas (`ten-of-swords`)

- **Nome (EN):** Ten of Swords · **Arte:** `/tarot/minor/ten-of-swords.jpg` · **Posição:** 10
- **Correspondências:** Elemento: Ar · Sephirah: Malkuth · Decã: Sol em Gêmeos
- **Resumo (`intro`):** Uma figura jaz de bruços com dez espadas nas costas, sob um céu negro e um amanhecer no horizonte. O fim de um ciclo doloroso: o pior já passou, e algo novo começa a nascer.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `ten-swords` | 🗡️ | As Dez Espadas | Excesso e esgotamento: a dor chegou ao limite e já não pode crescer mais. O extremo, por si só, encerra o ciclo que o produziu. |
| `fallen-figure` | 🪦 | A Figura Caída | O corpo caído, com a capa vermelha: a derrota total que também liberta. Quando nada mais se sustenta, resta recomeçar do chão. |
| `dawn-horizon` | 🌅 | O Amanhecer | Uma faixa dourada no horizonte, sob a escuridão: a noite mais densa precede o dia. A luz já está a caminho, embora ainda não aqueça. |
| `black-sky` | 🌑 | O Céu Negro | Escuridão total no alto: o momento do desespero. A carta o mostra sem rodeios para dizer que ele tem limite e que o fundo existe. |

### Valete de Espadas (`page-of-swords`)

- **Nome (EN):** Page of Swords · **Arte:** `/tarot/minor/page-of-swords.jpg` · **Posição:** Valete
- **Correspondências:** Elemento: Ar · Letra: ה Heh · Elemento da corte: Terra
- **Resumo (`intro`):** Um jovem de cabelo ao vento ergue uma espada sobre uma colina, entre nuvens e pássaros. Curiosidade, vigilância e a mente ágil que quer aprender, perguntar e descobrir.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `raised-sword` | ⚔️ | A Espada Erguida | Segura com as duas mãos, apontando para o alto: a mente alerta e pronta para testar ideias. A lâmina ainda é jovem e precisa de treino. |
| `windblown-hair` | 💨 | O Cabelo ao Vento | O vento bagunça os cabelos e o corpo inteiro do jovem: ele está exposto às mudanças de ideia e de humor. Sua mente nunca fica parada. |
| `birds-clouds` | 🕊️ | Os Pássaros e as Nuvens | Aves cruzam o céu agitado: pensamentos que passam rápido, mensagens, notícias. Observar a mente é como observar um céu em movimento. |
| `bending-trees` | 🌳 | As Árvores ao Vento | Árvores se curvam ao fundo: a força do ar é grande, mas a vida se adapta. A flexibilidade protege melhor do que a rigidez. |

### Cavaleiro de Espadas (`knight-of-swords`)

- **Nome (EN):** Knight of Swords · **Arte:** `/tarot/minor/knight-of-swords.jpg` · **Posição:** Cavaleiro
- **Correspondências:** Elemento: Ar · Letra: ו Vav · Elemento da corte: Ar
- **Resumo (`intro`):** Um cavaleiro de espada em riste galopa num cavalo branco, enquanto o vento dobra as árvores. Ímpeto intelectual, decisão rápida e a franqueza que corta, às vezes sem medir o impacto.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `raised-sword` | ⚔️ | A Espada em Riste | Empunhada alto, sem hesitar: ele ataca a questão de frente. A clareza de propósito é grande, mas a pressa pode ferir quem está perto. |
| `galloping-horse` | 🐎 | O Cavalo a Galope | A montaria branca corre ao limite, com as patas no ar: a velocidade do pensamento que se lança sem olhar o terreno. |
| `wind-bent-trees` | 🌬️ | As Árvores Dobradas | O vento verga as árvores: tudo que está no caminho sofre o impacto. O cavaleiro move o ambiente à sua volta, queira ou não. |
| `storm-clouds` | ☁️ | As Nuvens Rasgadas | O céu em turbilhão acompanha a cavalgada: o debate é intenso e o ambiente mental, agitado. Tempestade de ideias, com raios e trovões. |

### Rainha de Espadas (`queen-of-swords`)

- **Nome (EN):** Queen of Swords · **Arte:** `/tarot/minor/queen-of-swords.jpg` · **Posição:** Rainha
- **Correspondências:** Elemento: Ar · Letra: ה Heh · Elemento da corte: Água
- **Resumo (`intro`):** A rainha de coroa de borboletas ergue a espada com uma mão e abre a outra, num trono entalhado. Lucidez, independência e a sabedoria de quem aprendeu com a dor e fala com franqueza.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `upright-sword` | ⚔️ | A Espada Vertical | A lâmina aponta para o alto, firme na mão: o julgamento claro, sem espaço para ilusões. Decide com a cabeça fria e o coração presente. |
| `open-hand` | 🖐️ | A Mão Aberta | A outra mão se abre, receptiva: ela ouve antes de julgar. A verdade precisa de espaço para escutar e não só para falar. |
| `cherub-throne` | 👼 | O Trono de Querubins | Querubins e borboletas esculpidos no trono: a inocência e a transformação sustentam sua autoridade. Ela sabe de onde vem o seu poder. |
| `bird-clouds` | 🐦 | A Ave nas Nuvens | Uma ave solitária cruza o céu limpo: perspectiva e liberdade de pensamento. Ela observa de cima, sem se prender ao drama. |

### Rei de Espadas (`king-of-swords`)

- **Nome (EN):** King of Swords · **Arte:** `/tarot/minor/king-of-swords.jpg` · **Posição:** Rei
- **Correspondências:** Elemento: Ar · Letra: י Yod · Elemento da corte: Fogo
- **Resumo (`intro`):** O rei de coroa de borboletas empunha uma espada, sentado num trono sob um céu de nuvens. Autoridade intelectual, justiça e a palavra que governa com lógica e ética.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `judge-sword` | ⚔️ | A Espada do Juiz | Empunhada de lado, como um cetro: a lei vem antes do impulso. O rei decide por princípios e não por simpatias passageiras. |
| `butterfly-crown` | 🦋 | A Coroa de Borboletas | O símbolo da alma e da transformação coroa o pensamento: a mente serena é capaz de mudar sem perder a firmeza. |
| `carved-throne` | 🪑 | O Trono Entalhado | Um trono sóbrio, adornado com símbolos do espírito: estrutura sólida para decisões sérias, sem ostentação nem tirania. |
| `blue-mantle` | 🟦 | O Manto Azul | O azul do ar e da mente cobre o rei: a calma do pensamento que pondera antes de falar. A voz vem depois de ouvir tudo. |

## Ouros (Pentacles) — Terra

### Ás de Ouros (`ace-of-pentacles`)

- **Nome (EN):** Ace of Pentacles · **Arte:** `/tarot/minor/ace-of-pentacles.jpg` · **Posição:** Ás
- **Correspondências:** Elemento: Terra · Sephirah: Kether
- **Resumo (`intro`):** Uma mão surge da nuvem oferecendo um pentáculo dourado sobre um jardim florido. Uma semente de prosperidade: uma oportunidade concreta, material e promissora que pede para ser plantada.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `hand-cloud` | ✋ | A Mão na Nuvem | A oportunidade chega como dádiva: o convite a receber e a trabalhar com o que foi oferecido. A mão mostra o pentáculo, mas ele só frutifica na terra. |
| `golden-pentacle` | 🪙 | O Pentáculo Dourado | Uma moeda marcada com a estrela de cinco pontas: o espírito encarnado na matéria. A riqueza verdadeira nasce do cuidado com o que é concreto. |
| `flower-garden` | 🌷 | O Jardim Florido | Lírios e rosas em um canteiro cuidado: o terreno fértil já preparado. Boas condições ajudam, mas é o cuidado diário que faz crescer. |
| `arch-mountains` | ⛰️ | O Arco e as Montanhas | Um arco de folhagem se abre para o caminho entre montanhas: a passagem para uma nova etapa. A semente promete o que o percurso revelará. |

### Dois de Ouros (`two-of-pentacles`)

- **Nome (EN):** Two of Pentacles · **Arte:** `/tarot/minor/two-of-pentacles.jpg` · **Posição:** 2
- **Correspondências:** Elemento: Terra · Sephirah: Chokmah · Decã: Júpiter em Capricórnio
- **Resumo (`intro`):** Um malabarista de chapéu alto equilibra dois pentáculos presos por uma faixa em oito, entre ondas grandes. Adaptação, flexibilidade e a arte de manter várias frentes sem perder o ritmo.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `juggled-pentacles` | 🤹 | Os Dois Pentáculos | Um sobe enquanto o outro desce: recursos que se alternam entre ganho e gasto. A atenção contínua evita que algum caia. |
| `infinity-ribbon` | ♾️ | A Faixa do Infinito | A fita desenha o lemniscata: movimento sem fim, ciclo contínuo de dar e receber. O equilíbrio é um fluxo, não um estado fixo. |
| `ships-waves` | 🚢 | Os Navios nas Ondas | Duas embarcações sobem e descem em ondas altas: as flutuações do mercado e da vida. Quem sabe dançar com a oscilação não naufraga. |
| `tall-hat` | 🎩 | O Chapéu Alto | Um chapéu vermelho, alto e leve: humor e ligeireza diante da instabilidade. Levar a sério o trabalho, mas não a si mesmo. |

### Três de Ouros (`three-of-pentacles`)

- **Nome (EN):** Three of Pentacles · **Arte:** `/tarot/minor/three-of-pentacles.jpg` · **Posição:** 3
- **Correspondências:** Elemento: Terra · Sephirah: Binah · Decã: Marte em Capricórnio
- **Resumo (`intro`):** Num salão gótico, um artesão trabalha sobre o arco enquanto um monge e um nobre discutem a planta. Trabalho em equipe, mestria compartilhada e o valor de cada contribuição numa obra comum.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `craftsman` | 🔨 | O Artesão | Sobre o banco, ele esculpe com ferramentas: a competência prática dá forma à visão dos outros. Sem mão de obra, o projeto não passa do papel. |
| `carved-pentacles` | 🪙 | Os Pentáculos no Arco | Três pentáculos gravados na pedra: o resultado concreto do trabalho. A obra bem feita deixa marca duradoura, visível a quem passar. |
| `plan-patrons` | 📜 | Os Mentores com a Planta | O monge e o nobre estudam o projeto: planejamento, patrocínio e orientação. Cada um contribui com o saber que o outro não tem. |
| `gothic-arch` | ⛪ | O Arco Gótico | Uma abóbada de pedra nervurada: a estrutura que une peças em direção ao alto. Obras duradouras dependem de que cada pedra sustente a outra. |

### Quatro de Ouros (`four-of-pentacles`)

- **Nome (EN):** Four of Pentacles · **Arte:** `/tarot/minor/four-of-pentacles.jpg` · **Posição:** 4
- **Correspondências:** Elemento: Terra · Sephirah: Chesed · Decã: Sol em Capricórnio
- **Resumo (`intro`):** Um homem sentado agarra um pentáculo contra o peito, tem outro sobre a cabeça e dois sob os pés, diante de uma cidade. Segurança, posse e o risco de se fechar para proteger o que se tem.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `coin-on-chest` | 🫀 | O Pentáculo no Peito | Abraçado contra o corpo: o apego ao que se tem. A segurança é legítima, mas, quando é tudo o que importa, o coração se estreita. |
| `coin-on-head` | 👑 | O Pentáculo na Cabeça | Uma moeda coroa os pensamentos: a mente ocupada com o que se possui. O bem material governa as decisões e limita a visão. |
| `coins-under-feet` | 🦶 | Os Pentáculos sob os Pés | Duas moedas firmam os pés no chão: base sólida, mas também âncora. Ele não se move porque tem demais a perder. |
| `city-behind` | 🏙️ | A Cidade ao Fundo | A cidade prospera atrás dele, mas ele a evita: a prosperidade que se isola do convívio. A riqueza ganha sentido quando circula. |

### Cinco de Ouros (`five-of-pentacles`)

- **Nome (EN):** Five of Pentacles · **Arte:** `/tarot/minor/five-of-pentacles.jpg` · **Posição:** 5
- **Correspondências:** Elemento: Terra · Sephirah: Gevurah · Decã: Mercúrio em Touro
- **Resumo (`intro`):** Dois mendigos feridos caminham na neve diante de um vitral iluminado com cinco pentáculos. Carência, exclusão e o abrigo que está tão perto e ainda assim parece fora do alcance.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `stained-glass-pentacles` | 🪟 | O Vitral de Pentáculos | Cinco moedas dispostas como a Árvore da Vida numa janela acesa: o refúgio visível. A ajuda existe, mas pede que alguém bata à porta. |
| `shawled-woman` | 🧣 | A Mulher Descalça | Encolhida num xale, de pés descalços sobre a neve: a vulnerabilidade levada sem queixa. A pobreza não é só falta de dinheiro, é falta de acolhimento. |
| `crutches-man` | 🩼 | O Homem de Muletas | Ele caminha com dificuldade ao lado dela: a dor compartilhada. Mesmo na carência, o companheirismo sustenta mais do que as posses. |
| `snow-night` | ❄️ | A Neve e a Noite | Um cenário gelado e escuro envolve a cena: o frio da solidão. Quem passa por ele sente cada esforço pesado, mas também pode escolher pedir ajuda. |

### Seis de Ouros (`six-of-pentacles`)

- **Nome (EN):** Six of Pentacles · **Arte:** `/tarot/minor/six-of-pentacles.jpg` · **Posição:** 6
- **Correspondências:** Elemento: Terra · Sephirah: Tiferet · Decã: Lua em Touro
- **Resumo (`intro`):** Um mercador de manto vermelho pesa moedas numa balança e as dá a dois mendigos que se ajoelham. Generosidade, reciprocidade e a justiça de dar e receber na medida certa.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `merchant-scales` | ⚖️ | A Balança | Medir antes de dar: a generosidade consciente avalia o que cada um precisa. A justiça não é igualar tudo, é dar o que cabe. |
| `coins-given` | 🪙 | As Moedas Dadas | Uma moeda passa da mão do mercador à do necessitado: o fluxo que mantém a riqueza viva. O que se compartilha volta de outras formas. |
| `kneeling-beggars` | 🙏 | Os Pedintes Ajoelhados | Dois à espera de ajuda, com gratidão e necessidade: a posição de quem recebe. Todos, em algum momento, ocupamos um dos dois lados. |
| `six-pentacles` | 🪙 | Os Seis Pentáculos | Seis moedas pairam acima: os recursos disponíveis, que dependem da distribuição. A abundância só cumpre sua função quando circula. |

### Sete de Ouros (`seven-of-pentacles`)

- **Nome (EN):** Seven of Pentacles · **Arte:** `/tarot/minor/seven-of-pentacles.jpg` · **Posição:** 7
- **Correspondências:** Elemento: Terra · Sephirah: Netzach · Decã: Saturno em Touro
- **Resumo (`intro`):** Um jovem se apoia na enxada e contempla um arbusto carregado de sete pentáculos. Pausa para avaliar o que já foi plantado, paciência e a dúvida entre esperar ou agir.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `leaning-hoe` | 🧑‍🌾 | A Enxada | Ele se apoia na ferramenta, de olhar fixo: um momento de descanso depois do esforço. Trabalhar bem inclui parar para olhar o que se fez. |
| `pentacle-bush` | 🌿 | O Arbusto de Pentáculos | As moedas brotam como frutos de uma planta: o retorno que cresce com o tempo. Não se colhe por pressão, mas por amadurecimento. |
| `reflective-gaze` | 🤔 | O Olhar Pensativo | Ele avalia sem pressa: vale o esforço continuar, ou é hora de mudar de plantio? A paciência exige reconhecer o que ainda não deu certo. |
| `green-field` | 🌱 | O Campo Verde | O terreno cultivado se estende atrás: o trabalho de meses. O investimento já está na terra, e o tempo é o próximo ingrediente. |

### Oito de Ouros (`eight-of-pentacles`)

- **Nome (EN):** Eight of Pentacles · **Arte:** `/tarot/minor/eight-of-pentacles.jpg` · **Posição:** 8
- **Correspondências:** Elemento: Terra · Sephirah: Hod · Decã: Sol em Virgem
- **Resumo (`intro`):** Sentado a um banco, um artesão grava com cuidado cada pentáculo; vários já estão prontos ao lado. Dedicação ao ofício, aprendizado e o prazer de aperfeiçoar-se pela repetição.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `engraving-craftsman` | 🔨 | O Artesão Concentrado | Cabeça baixa, atenção total à peça: o trabalho bem feito é uma forma de meditação. A mestria nasce da paciência com os detalhes. |
| `finished-pentacles` | 🪙 | Os Pentáculos Prontos | Seis peças acabadas, penduradas à vista: a obra acumulada. Cada moeda é um passo concluído na construção de uma competência. |
| `pentacle-in-progress` | 🛠️ | A Peça em Andamento | Uma moeda ainda está no chão, ao pé do banco: sempre há mais um trabalho esperando. A prática nunca termina, apenas se refina. |
| `distant-town` | 🏘️ | A Cidade ao Longe | Os telhados ao fundo mostram que o ofício serve a uma comunidade. O trabalho dedicado pode parecer isolado, mas alimenta o mundo. |

### Nove de Ouros (`nine-of-pentacles`)

- **Nome (EN):** Nine of Pentacles · **Arte:** `/tarot/minor/nine-of-pentacles.jpg` · **Posição:** 9
- **Correspondências:** Elemento: Terra · Sephirah: Yesod · Decã: Vênus em Virgem
- **Resumo (`intro`):** Uma mulher elegante, de vestido bordado, caminha sozinha por um vinhedo com um falcão na mão. Independência, conforto conquistado e o prazer de desfrutar o fruto do próprio esforço.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `falcon-glove` | 🦅 | O Falcão na Luva | A ave de caça repousa na mão enluvada, com o capuz: a vontade disciplinada. Ela domina o instinto e o transforma em parceria. |
| `vineyard-pentacles` | 🍇 | O Vinhedo de Pentáculos | Cachos e moedas entre as videiras: a prosperidade que veio do cultivo paciente. O que se plantou com cuidado agora rende em abundância. |
| `floral-robe` | 👗 | O Vestido Florido | Flores bordadas em ouro no manto: beleza e refinamento como expressão do que se conquistou. Gozar dos frutos é também honrar o esforço. |
| `garden-snail` | 🐌 | O Caracol | Um pequeno caracol no chão: o ritmo lento que sustenta a obra. A riqueza duradoura se faz devagar, e a lentidão é parte da maturidade. |

### Dez de Ouros (`ten-of-pentacles`)

- **Nome (EN):** Ten of Pentacles · **Arte:** `/tarot/minor/ten-of-pentacles.jpg` · **Posição:** 10
- **Correspondências:** Elemento: Terra · Sephirah: Malkuth · Decã: Mercúrio em Virgem
- **Resumo (`intro`):** Sob um arco de pedra, um patriarca, um casal, uma criança e dois cães ocupam um pátio onde dez pentáculos formam a Árvore da Vida. Herança, família, tradição e prosperidade que atravessa gerações.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `patriarch-dogs` | 🐕 | O Patriarca e os Cães | O ancião de manto bordado acaricia os cães: a sabedoria acumulada e a lealdade. O legado é cuidado por quem sabe receber de volta. |
| `family-child` | 👨‍👩‍👧 | O Casal e a Criança | Um casal conversa enquanto a criança observa: a transmissão que se faz pelo exemplo. A família é o primeiro lugar onde se aprende a prosperar. |
| `tree-of-life-pentacles` | 🌳 | Os Pentáculos em Árvore | Dez moedas dispostas como a Árvore da Vida: a riqueza como estrutura espiritual completa. Cada esfera material tem seu lugar no todo. |
| `estate-arch` | 🏰 | O Arco e a Propriedade | A arcada de pedra emoldura o castelo ao fundo: a continuidade de uma casa estável, um refúgio que protege o que as gerações construíram. |

### Valete de Ouros (`page-of-pentacles`)

- **Nome (EN):** Page of Pentacles · **Arte:** `/tarot/minor/page-of-pentacles.jpg` · **Posição:** Valete
- **Correspondências:** Elemento: Terra · Letra: ה Heh · Elemento da corte: Terra
- **Resumo (`intro`):** Um jovem de túnica verde contempla um pentáculo erguido, num campo arado diante das montanhas. Estudo, curiosidade prática e o início de um projeto que exige constância.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `raised-pentacle` | 🪙 | O Pentáculo Contemplado | Ele o ergue com as duas mãos e o observa de perto: a proposta de algo concreto, tratada com cuidado e atenção ao detalhe. |
| `red-cap` | 🧢 | O Gorro Vermelho | Um gorro simples e vermelho: a energia contida do aprendiz, discreta e diligente. O entusiasmo está no trabalho, não na aparência. |
| `plowed-field` | 🌾 | O Campo Arado | Sulcos prontos para a semente: o terreno foi trabalhado e espera paciência. Começar bem é preparar o chão antes de plantar. |
| `trees-mountains` | 🏔️ | As Árvores e as Montanhas | Árvores e montanhas ao longe: o horizonte de longo prazo. O jovem olha de perto para algo que só o tempo fará crescer. |

### Cavaleiro de Ouros (`knight-of-pentacles`)

- **Nome (EN):** Knight of Pentacles · **Arte:** `/tarot/minor/knight-of-pentacles.jpg` · **Posição:** Cavaleiro
- **Correspondências:** Elemento: Terra · Letra: ו Vav · Elemento da corte: Ar
- **Resumo (`intro`):** Um cavaleiro de armadura permanece imóvel num cavalo negro de passo firme, segurando um pentáculo num campo arado. Responsabilidade, perseverança e o trabalho metódico que não tem pressa.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `held-pentacle` | 🪙 | O Pentáculo na Mão | Ele o sustenta com atenção e o examina: a tarefa está nas mãos. A confiança vem de cumprir o prometido, sem atalhos. |
| `black-horse` | 🐴 | O Cavalo Negro | Forte e parado, de crina espessa: a energia da terra, robusta e paciente. Não corre, mas aguenta qualquer jornada longa. |
| `oak-leaf-helmet` | 🍃 | O Elmo de Folhas | Folhas de carvalho adornam o elmo: força e durabilidade da natureza. Sua autoridade vem do mérito constante, não do brilho passageiro. |
| `plowed-land` | 🌾 | A Terra Arada | Sulcos retos a perder de vista: o trabalho meticuloso e repetido. Quem confia no processo colhe no tempo certo. |

### Rainha de Ouros (`queen-of-pentacles`)

- **Nome (EN):** Queen of Pentacles · **Arte:** `/tarot/minor/queen-of-pentacles.jpg` · **Posição:** Rainha
- **Correspondências:** Elemento: Terra · Letra: ה Heh · Elemento da corte: Água
- **Resumo (`intro`):** A rainha em trono de frutas e cabras ampara um pentáculo no colo, num jardim com um coelho. Cuidado, abundância e a generosidade prática de quem nutre o ambiente à sua volta.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `pentacle-lap` | 🪙 | O Pentáculo no Colo | Ela o segura como a um filho, com os dois braços: a riqueza tratada com ternura. Cuidar do que é material também é um ato de amor. |
| `hare` | 🐇 | O Coelho | Um coelho salta no canto: fertilidade, abundância e instinto vivo. A natureza circula livre onde a rainha reina com acolhimento. |
| `carved-throne` | 🐐 | O Trono Entalhado | Cabras e frutas esculpidas: a vitalidade da terra e a colheita. Seu poder repousa na natureza e na fartura que dela se extrai. |
| `rose-bower` | 🌹 | O Caramanchão de Rosas | Rosas florescem sobre ela como um dossel: beleza e sensualidade em equilíbrio com a ordem. O ambiente ao redor reflete seu cuidado. |

### Rei de Ouros (`king-of-pentacles`)

- **Nome (EN):** King of Pentacles · **Arte:** `/tarot/minor/king-of-pentacles.jpg` · **Posição:** Rei
- **Correspondências:** Elemento: Terra · Letra: י Yod · Elemento da corte: Fogo
- **Resumo (`intro`):** O rei de manto de uvas senta num trono de touros, segurando cetro e pentáculo diante de seu castelo. Prosperidade, estabilidade e o poder de quem construiu e agora administra com generosidade.

| `id` | Ícone | Título | Descrição |
|------|:-----:|--------|-----------|
| `pentacle-sceptre` | 🪙 | O Pentáculo e o Cetro | Uma mão guarda a moeda, a outra o cetro: riqueza e autoridade a serviço do que construiu. Governar é também saber conservar. |
| `bull-throne` | 🐂 | O Trono de Touros | Cabeças de touro nos braços do trono: força, teimosia e fertilidade da terra. Sua autoridade é paciente, mas firme como a rocha. |
| `grape-mantle` | 🍇 | O Manto de Uvas | Videiras e cachos bordados cobrem a veste: a colheita feita roupa. A abundância é seu estado natural, fruto de décadas de cultivo. |
| `castle-garden` | 🏰 | O Castelo e o Jardim | A fortaleza e o jardim florido atrás dele: segurança que convida ao prazer. O patrimônio é lugar de proteção e também de acolhida. |
