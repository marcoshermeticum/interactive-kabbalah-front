---
inclusion: auto
---

# Visão do Projeto — Interactive Kabbalah

## Missão
Criar o melhor aplicativo de Kabbalah interativo do mercado — website + futuro mobile (Kotlin/Swift).
A experiência visual deve transmitir: organização, confiança, esperança. Como um tabuleiro de RPG de mesa sagrado.

## Referência Visual
- HOD Studios (editora parceira autorizada)
- Design geométrico inspirado em RPG de mesa
- "Armadura robusta" nas sephirots e caminhos: bordas duplas, anéis concêntricos definidos, moldura ornamental
- Colunas B (Boaz) e J (Jachin), lemniscata (∞), véus (Abismo, Parokhet, Nephesch)

## Arquitetura — Preparação Mobile
- **Dados separados da UI** — src/data/ como camada pura (reutilizável em qualquer plataforma)
- **Lógica de layout como JSON/config** — posições, tamanhos e relações em objetos exportáveis
- **Componentes SVG puros** — sem dependência de DOM (facilita port para Canvas/Compose/SwiftUI)
- **API-ready** — quando backend existir, dados vêm via API. Agora são estáticos.

## Monetização (curto prazo)
1. Doação (PIX, Ko-fi, Buy me a coffee)
2. Freemium: árvore básica grátis / correspondências avançadas, meditações, diário = pago
3. Futuro: parceria editorial (app complementar ao livro físico)

## Design System — "Aura Hermetica"
- Fonte display: EB Garamond (serif clássica)
- Fonte corpo: Inter (sans, legível)
- Background: parchment (#fff9eb) com textura sutil
- Ouro acadêmico como accent (#d4af37)
- Cores Golden Dawn para sephirots (já implementadas)
- Formas: geometria sagrada, bordas definidas, radii pequenos

## Acessibilidade (decisão dos saturninos)
- ARIA labels em cada sephirah e caminho
- Navegação por teclado (Tab entre nós)
- Alto contraste disponível
- Screen reader: descrições textuais completas
- Responsivo: desktop detalhista, mobile minimalista

## Plataformas
- Desktop: interface detalhista, sidebars com correspondências, marginalia
- Mobile web: minimalista, configurável via settings
- Futuro: Kotlin (Android) / Swift (iOS) — dados compartilhados via JSON/API

## Páginas (futuro)
1. Árvore interativa (principal — existente)
2. Área de aprendizado / conteúdo informativo
3. Outros gráficos cabalísticos
4. Configurações / perfil
5. Premium / assinatura
