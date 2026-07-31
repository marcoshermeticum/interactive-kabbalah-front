# Requirements Document

## Introduction

Este documento especifica os requisitos para aprimoramentos na aplicação Kabbalah Interativa, focando em: (1) um guia de orientações para novos visitantes, (2) sistema de notificações não-intrusivo, (3) conteúdo não-dualístico para a Árvore da Morte (Qliphoth), (4) catálogo completo de daemons com busca integrada e imagens de sigilos, e (5) compatibilidade mobile. A abordagem filosófica central é apresentar Sefirot e Qliphoth como espectros de experiência — sem dualizar "bem" e "mal" — seguindo a metáfora da poda (reconhecer, compreender, integrar).

## Glossary

- **Sistema_de_Notificações**: Componente visual na topbar que exibe indicadores (badge) para conteúdo não lido (guia de orientações e atualizações do site), acionando um dialog ao ser clicado.
- **Guia_de_Orientações**: Conteúdo textual internacionalizado que orienta o usuário na interpretação da Árvore da Vida como ferramenta de autoconhecimento pessoal, enfatizando que não se trata de julgamento moral ou religioso.
- **Indicador_de_Notificação**: Elemento visual (badge dourado ou vermelho) sobreposto ao botão de notificações na topbar, indicando que há conteúdo não lido.
- **Catálogo_de_Daemons**: Estrutura de dados contendo todos os daemons da tradição goética e qliphótica com nomes, aliases, apelidos e URLs de imagens de sigilos, indexados para busca.
- **Conteúdo_Não_Dualístico**: Campos adicionais na estrutura de dados das Qliphoth que apresentam aspectos de integração, lições e potencial criativo de cada qliphah — complementando o campo "defect" existente sem removê-lo.
- **Search_Index**: Módulo de busca unificado (`searchIndex.ts`) que indexa sephirots, qliphoth, caminhos, túneis, véus, pilares e (com esta feature) daemons.
- **Sigilo**: Símbolo gráfico associado a um daemon, exibido como imagem nos resultados de busca.
- **Topbar**: Componente de navegação superior (`Navbar.tsx`) contendo marca, seletor de visão, busca e ferramentas.
- **LocalStorage**: API do navegador utilizada para persistir estado de leitura (primeira visita, notificações lidas) no dispositivo do usuário.

## Requirements

### Requisito 1: Guia de Orientações

**User Story:** Como visitante da aplicação, quero acessar um guia de orientações sobre como interpretar a Árvore da Vida, para que eu compreenda que se trata de uma ferramenta de autoconhecimento pessoal e não de um sistema de julgamento moral ou religioso.

#### Critérios de Aceite

1. THE Guia_de_Orientações SHALL apresentar conteúdo internacionalizado (pt-BR e en-US no mínimo) explicando que a Árvore da Vida é uma ferramenta de análise pessoal, não de julgamento moral ou religioso.
2. THE Guia_de_Orientações SHALL incluir seções sobre: propósito da ferramenta, como interpretar Sefirot e Qliphoth de forma não-dualística, a metáfora da poda (reconhecer, compreender, integrar) e dicas de uso.
3. THE Guia_de_Orientações SHALL ser exibido dentro de um componente dialog acessível (com role="dialog", aria-modal="true", foco capturado dentro do dialog enquanto aberto, e retorno automático do foco ao botão que o abriu ao fechar via Escape ou botão de fechamento).
4. THE Guia_de_Orientações SHALL utilizar o título "Guia de Orientações" em pt-BR e "Orientation Guide" em en-US nas chaves de internacionalização.
5. THE Guia_de_Orientações SHALL ser acessível a qualquer momento pelo usuário, independentemente do estado de notificações, por meio de um item permanente no dialog de notificações.

### Requisito 2: Notificação de Primeira Visita

**User Story:** Como visitante em primeira visita, quero ser avisado de forma não-intrusiva de que existe um guia de orientações, para que eu possa lê-lo antes de explorar a árvore.

#### Critérios de Aceite

1. WHEN o usuário acessa a aplicação pela primeira vez (sem registro em leitura do guia em LocalStorage), THE Sistema_de_Notificações SHALL exibir o Indicador_de_Notificação no botão de notificações da Topbar em até 1 segundo após a renderização do layout.
2. WHEN o usuário abre o dialog do Guia_de_Orientações pela primeira vez, THE Sistema_de_Notificações SHALL registrar o estado de leitura em LocalStorage e remover o Indicador_de_Notificação do botão de notificações, de modo que o indicador não reapareça em visitas subsequentes.
3. THE Sistema_de_Notificações SHALL exibir o Indicador_de_Notificação como um badge circular com diâmetro entre 8px e 12px, sobreposto ao canto superior direito do ícone do botão de notificações — sem utilizar modal, popup ou dialog automático ao carregar a página.
4. WHEN o usuário clica no botão de notificações com indicador ativo referente ao guia, THE Sistema_de_Notificações SHALL abrir o dialog do Guia_de_Orientações.
5. IF o LocalStorage estiver indisponível ou inacessível, THEN THE Sistema_de_Notificações SHALL exibir o Indicador_de_Notificação a cada acesso (comportamento de primeira visita) sem gerar erro visível ao usuário.

### Requisito 3: Sistema de Notificações e Atualizações

**User Story:** Como usuário recorrente, quero ser informado sobre atualizações do site (novo conteúdo, funcionalidades) de forma unificada, para que eu saiba o que mudou desde minha última visita.

#### Critérios de Aceite

1. THE Sistema_de_Notificações SHALL unificar em um único botão na Topbar tanto o guia de primeira visita quanto as notificações de atualizações do site.
2. WHILE existem notificações não lidas (guia ou atualizações) no LocalStorage do usuário, THE Sistema_de_Notificações SHALL exibir o Indicador_de_Notificação no botão unificado.
3. WHEN o usuário clica no botão de notificações, THE Sistema_de_Notificações SHALL abrir um dialog acessível (role="dialog", aria-modal, foco gerenciado, fechamento via Escape) listando todas as notificações ordenadas da mais recente para a mais antiga, diferenciando visualmente as não lidas das lidas por meio de opacidade reduzida nas lidas.
4. WHEN o usuário clica em uma notificação no dialog para expandir ou visualizar seu conteúdo, THE Sistema_de_Notificações SHALL marcar essa notificação como lida no LocalStorage e remover o Indicador_de_Notificação quando todas estiverem lidas.
5. THE Sistema_de_Notificações SHALL suportar adição de novas notificações por meio de um array de dados no código-fonte, onde cada entrada contém no mínimo: identificador único, data de publicação, título internacionalizado e descrição internacionalizada — limitado a no máximo 50 entradas no array.
6. WHILE o viewport é menor que o breakpoint `sm` (640px), THE Sistema_de_Notificações SHALL ser exibido na sidebar mobile com o mesmo botão unificado, Indicador_de_Notificação e dialog de listagem disponíveis na versão desktop.
7. IF o LocalStorage for limpo ou inacessível, THEN THE Sistema_de_Notificações SHALL tratar todas as notificações como não lidas e exibir o Indicador_de_Notificação.

### Requisito 4: Conteúdo Não-Dualístico para Qliphoth

**User Story:** Como estudante de Kabbalah, quero visualizar aspectos de integração e lições de cada qliphah (além dos "defeitos"), para que eu compreenda a Árvore da Morte como espaço de autoconhecimento e não como catálogo de males.

#### Critérios de Aceite

1. THE Conteúdo_Não_Dualístico SHALL adicionar ao tipo `SephirotData` e à estrutura de dados de cada uma das 11 qliphoth (thaumiel, ghogiel, satariel, ghagsheblah, golohab, tagimron, gharab, samael, gamaliel, nahemoth, daath_qliphoth) os campos: `integration` (aspecto de integração/lição, string não-vazia com no mínimo 10 caracteres) e `dailyLife` (manifestação no cotidiano, string não-vazia com no mínimo 10 caracteres) — mantendo o campo `defect` existente no objeto `regent`.
2. THE Conteúdo_Não_Dualístico SHALL apresentar as Qliphoth como aspectos desequilibrados, partes rejeitadas da psique e potencial criativo estagnado — cada texto de `integration` deve descrever o que se ganha ao reconhecer e integrar o aspecto sombrio, e cada texto de `dailyLife` deve descrever como esse desequilíbrio se manifesta em comportamentos observáveis do cotidiano.
3. THE Conteúdo_Não_Dualístico SHALL utilizar nos campos `defect`, `integration` e `dailyLife` linguagem descritiva e neutra: sem adjetivos valorativos absolutos (ex: "maligno", "sagrado", "terrível", "glorioso") e sem imperativos morais (ex: "deve-se evitar", "é preciso combater").
4. WHEN o usuário visualiza o tooltip ou painel de detalhes de uma qliphah, THE Sistema SHALL exibir simultaneamente os três campos: o campo de sombra/defeito (label existente `defect`), o campo de integração (label `integration`) e o campo de manifestação cotidiana (label `dailyLife`), cada um com seu respectivo rótulo traduzido visível.
5. THE Conteúdo_Não_Dualístico SHALL revisar os textos de véus (`ornaments.veils`) e pilares (`ornaments.pillars`) nos arquivos de i18n, removendo linguagem demonizante ou glorificante referente às Qliphoth e aplicando o mesmo critério de neutralidade definido no critério 3.
6. THE Conteúdo_Não_Dualístico SHALL ser internacionalizado via next-intl com chaves de tradução para `integration` e `dailyLife` em cada qliphah, disponíveis em pt-BR e en-US no mínimo — se uma chave de tradução estiver ausente, o sistema deve exibir o valor fallback definido no arquivo de dados TypeScript.

### Requisito 5: Catálogo Completo de Daemons com Busca

**User Story:** Como pesquisador ocultista, quero buscar qualquer daemon pelo nome ou apelido e encontrar resultados relevantes, para que eu possa navegar rapidamente às qliphoth ou túneis associados.

#### Critérios de Aceite

1. THE Catálogo_de_Daemons SHALL conter no mínimo todos os daemons regentes das 11 Qliphoth e os 22 daemons dos Túneis de Set, cada entrada incluindo: nome canônico, no mínimo 1 alias alternativo, e a referência (id) da qliphah ou túnel associado.
2. THE Search_Index SHALL indexar o Catálogo_de_Daemons de modo que buscas por nome canônico ou alias retornem resultados do tipo `SearchResult` com campo `type` indicando `qliphah` ou `tunnel` e campo `position` apontando para o elemento associado na árvore.
3. WHEN o usuário busca por um nome ou alias de daemon com no mínimo 2 caracteres, THE Search_Index SHALL retornar resultados utilizando a mesma escala de scoring existente (10 para correspondência exata, 8 para prefixo, 5 para correspondência parcial) e incluí-los ordenados junto aos demais resultados.
4. IF um daemon é referenciado em mais de uma qliphah ou túnel, THEN THE Search_Index SHALL retornar um resultado separado para cada associação, cada um com sua respectiva posição e tipo.
5. THE Catálogo_de_Daemons SHALL incluir a URL da imagem do sigilo de cada daemon seguindo o padrão `https://daemons.com.br/wp-content/uploads/selo-{nome-normalizado}.png`, onde `{nome-normalizado}` é o nome canônico em minúsculas, sem acentos, com espaços substituídos por hífen (ex: "Lucifuge Rofocale" → "selo-lucifuge-rofocale.png").
6. THE Catálogo_de_Daemons SHALL ser estruturado como módulo TypeScript independente (`src/data/daemons.ts`) importado pelo Search_Index.

### Requisito 6: Imagens de Sigilos nos Resultados de Busca

**User Story:** Como usuário, quero ver a imagem do sigilo de um daemon ao lado do resultado de busca, para que eu identifique visualmente o daemon encontrado.

#### Critérios de Aceite

1. WHEN um resultado de busca é do tipo daemon, THE Search_Index SHALL incluir a URL do sigilo (campo `sigilUrl`) no objeto de resultado, obtida a partir do Catálogo_de_Daemons.
2. WHEN o componente de busca renderiza um resultado de daemon, THE componente_Search SHALL exibir a imagem do sigilo à esquerda do texto do resultado, com dimensões de 32x32px em viewports a partir de 640px (desktop) e 28x28px em viewports abaixo de 640px (mobile), utilizando ajuste de conteúdo "cover" com cantos arredondados e atributo alt contendo o nome do daemon.
3. IF a imagem do sigilo falhar ao carregar (erro de rede ou recurso indisponível), THEN THE componente_Search SHALL substituir a imagem por um ícone placeholder (emoji de selo 🔏 ou SVG genérico) com as mesmas dimensões do sigilo, mantendo o layout inalterado.
4. THE componente_Search SHALL reservar um espaço horizontal fixo de pelo menos 40px (desktop) ou 36px (mobile) à esquerda do texto do resultado para acomodar a imagem do sigilo, garantindo que o nome do daemon permaneça legível com truncamento por reticências caso exceda o espaço disponível.
5. IF o resultado de busca não for do tipo daemon, THEN THE componente_Search SHALL manter o layout atual de ícone emoji à esquerda do texto, sem reservar espaço adicional para imagem de sigilo.

### Requisito 7: Compatibilidade Mobile

**User Story:** Como usuário mobile, quero que todas as novas funcionalidades (notificações, guia, busca com sigilos) funcionem adequadamente em telas pequenas, para que eu tenha a mesma experiência independentemente do dispositivo.

#### Critérios de Aceite

1. THE Sistema_de_Notificações SHALL ser acessível tanto pela Topbar (desktop) quanto pela sidebar mobile, mantendo funcionalidade equivalente (abrir lista de notificações, visualizar conteúdo, marcar como lido).
2. THE componente_Search SHALL manter a responsividade existente (largura `90vw` em mobile, `400px` em desktop), exibindo os sigilos em 28x28px em viewports abaixo de 640px e 32x32px em viewports de 640px ou mais.
3. WHEN o dialog do Guia_de_Orientações é aberto em viewport abaixo de 640px de largura, THE dialog SHALL ocupar no máximo 95% da largura e 90% da altura da viewport, com scroll interno quando o conteúdo excede a área visível do dialog.
4. THE Sistema SHALL manter compatibilidade com a bottom tab bar mobile existente, garantindo que nenhum elemento interativo novo sobreponha visualmente ou tenha sua área de toque sobreposta à bottom tab bar, exceto dialogs e overlays que utilizem z-index superior ao da bottom tab bar (z-50).
5. THE Sistema SHALL garantir que todos os novos elementos interativos possuam área de toque mínima de 44x44px em viewports abaixo de 640px, conforme diretrizes WCAG 2.5.5.
6. WHEN um dialog ou overlay (notificações, guia) é aberto em viewport abaixo de 640px, THE Sistema SHALL posicionar o conteúdo do dialog acima da bottom tab bar, de modo que o botão de fechamento e o conteúdo interativo permaneçam acessíveis sem necessidade de rolar.
