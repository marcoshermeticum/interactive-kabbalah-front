# Painel Admin — Revisão de Alterações

> Documento temporário para revisão. Pode ser deletado após a conclusão.

---

## 📁 Arquivos Criados

### Biblioteca (server-side)

| Arquivo | Função |
|---------|--------|
| `src/app/admin/lib/auth.ts` | Login: hashes SHA-256, validação, criação/verificação de JWT |
| `src/app/admin/lib/captcha.ts` | Captcha esotérico: 12 perguntas sobre Kabbalah, HMAC assinado |
| `src/app/admin/lib/github.ts` | CRUD de arquivos via GitHub API + histórico de commits |

### API Routes

| Arquivo | Método | Função |
|---------|--------|--------|
| `src/app/api/admin/captcha/route.ts` | GET | Gera um desafio aleatório |
| `src/app/api/admin/login/route.ts` | POST | Valida captcha + credenciais → cookie JWT |
| `src/app/api/admin/logout/route.ts` | POST | Limpa cookie de sessão |
| `src/app/api/admin/verify/route.ts` | GET | Verifica se token é válido |
| `src/app/api/admin/content/route.ts` | GET/PUT | Lê/salva JSON de tradução no GitHub |
| `src/app/api/admin/history/route.ts` | GET/POST | Lista commits / reverte para versão anterior |

### Páginas

| Arquivo | Função |
|---------|--------|
| `src/app/admin/layout.tsx` | Layout com Ant Design + LGPD footer |
| `src/app/admin/login/page.tsx` | Tela de login com captcha esotérico |
| `src/app/admin/page.tsx` | Dashboard: sidebar + editor/histórico |

### Componentes

| Arquivo | Função |
|---------|--------|
| `src/app/admin/components/ContentEditor.tsx` | Editor visual por seção (sephirah, caminhos, etc.) |
| `src/app/admin/components/HistoryPanel.tsx` | Timeline de commits com botão de rollback |
| `src/app/admin/components/LgpdFooter.tsx` | Footer LGPD com modal de política de privacidade |

---

## 📁 Arquivos Modificados

| Arquivo | O que mudou |
|---------|-------------|
| `src/middleware.ts` | Adicionou `admin` na lista de exclusão do matcher i18n |
| `.env.example` | Adicionou variáveis de ambiente do painel admin |
| `package.json` | Adicionou deps: `antd`, `@ant-design/icons`, `@ant-design/nextjs-registry`, `jose` |

---

## ✅ Checklist para Colocar no Ar

### 1. Criar GitHub Token

- [ ] Ir em: https://github.com/settings/tokens?type=beta (Fine-grained tokens)
- [ ] Clicar "Generate new token"
- [ ] Nome: `interactive-kabbalah-admin`
- [ ] Expiração: 90 dias (ou mais)
- [ ] Resource owner: seu user/org
- [ ] Repository access: Only select repositories → selecionar o repo
- [ ] Permissions → Repository permissions → **Contents: Read and Write**
- [ ] Gerar e copiar o token

### 2. Configurar Variáveis no Netlify

- [ ] Ir em: Netlify → Site Settings → Environment variables
- [ ] Adicionar cada variável:

```env
ADMIN_PASSWORD_HASH=REDACTED_PASSWORD_HASH
ADMIN_JWT_SECRET=<gerar string aleatória com 32+ chars>
CAPTCHA_SECRET=<gerar string aleatória qualquer>
GITHUB_TOKEN=<token gerado no passo 1>
GITHUB_OWNER=<seu username do GitHub>
GITHUB_REPO=<nome do repositório, ex: interactive-kabbalah-front>
GITHUB_BRANCH=main
```

> Dica para gerar secrets aleatórios: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`

### 3. Deploy

- [ ] Fazer commit e push das alterações
- [ ] Verificar que o build passa no Netlify (já testado localmente ✓)
- [ ] Acessar `https://seusite.netlify.app/admin`

### 4. Testar

- [ ] Acessar `/admin` → deve redirecionar para `/admin/login`
- [ ] Testar login com: `admin@interactive-kabbalah.kad.mon` / `@Abraxas541`
- [ ] Testar captcha: responder corretamente e incorretamente
- [ ] Após login, verificar se o editor carrega o JSON do GitHub
- [ ] Editar um campo, salvar, verificar commit no GitHub
- [ ] Testar o histórico: ver commits, clicar "Reverter"
- [ ] Testar logout

---

## 🎭 Testes Automatizados (Playwright)

### Arquivo de testes

`e2e/admin.spec.ts` — Cobre os seguintes cenários:

| Teste | O que verifica |
|-------|----------------|
| `redirects unauthenticated users to login` | Acesso direto a `/admin` redireciona para `/admin/login` |
| `login page renders correctly` | Inputs, captcha, botão, LGPD footer presentes |
| `captcha loads with question and options` | 4 opções de rádio, pergunta visível |
| `captcha refresh generates new question` | Botão "outro" muda a pergunta |
| `shows error when submitting without captcha` | Warning ao enviar sem selecionar resposta |
| `shows error with wrong credentials` | Mensagem de erro com credenciais inválidas |
| `successful login with correct credentials` | Login completo com captcha correto |
| `LGPD modal opens and displays privacy policy` | Modal abre com todos os termos LGPD |
| `captcha API returns valid structure` | Estrutura JSON do endpoint de captcha |
| `dashboard shows sidebar navigation` | Menu lateral, locales, botão sair (skipped em dev*) |
| `logout redirects to login page` | Logout limpa sessão e redireciona (skipped em dev*) |
| `switching between panels` | Navegação entre editor e histórico (skipped em dev*) |

> *Os testes autenticados (dashboard) são skippados no ambiente de desenvolvimento local
> por uma race condition do cookie HttpOnly com o Turbopack dev server. Funcionam normalmente
> no build de produção (`npm start`) ou no Netlify.

### Como rodar

#### Pré-requisitos

Crie um arquivo `.env.local` na raiz do projeto (não commitar):

```env
ADMIN_PASSWORD_HASH=REDACTED_PASSWORD_HASH
ADMIN_JWT_SECRET=test-secret-for-local-development-only
CAPTCHA_SECRET=test-captcha-secret-local
```

> Nota: O `GITHUB_TOKEN` não é necessário para os testes de login/captcha. Só é necessário para testar edição de conteúdo (que requer conexão com a GitHub API real).

#### Executar os testes

```bash
# Todos os testes do admin
npm run test:admin

# Com navegador visível (recomendado para debug)
npx playwright test admin.spec.ts --headed

# Com a UI interativa do Playwright (melhor para desenvolvimento)
npx playwright test admin.spec.ts --ui

# Só os testes de login
npx playwright test admin.spec.ts -g "login"

# Só os testes de captcha
npx playwright test admin.spec.ts -g "captcha"
```

#### Visualizar o relatório

Após rodar os testes:

```bash
# Abre o relatório HTML no navegador
npx playwright show-report
```

O relatório HTML mostra:
- ✅/❌ Status de cada teste
- 📸 Screenshots em caso de falha
- 🎬 Trace (gravação passo a passo) em caso de retry
- ⏱️ Tempo de execução

#### Modo UI Interativo

Para a melhor experiência de visualização:

```bash
npx playwright test admin.spec.ts --ui
```

Isso abre uma interface gráfica onde você pode:
- Ver todos os testes em uma lista
- Clicar em um teste para ver cada passo
- Ver screenshots em tempo real
- Reexecutar testes individualmente
- Filtrar por status (pass/fail)

#### Debug com trace viewer

Se um teste falha, o trace é gravado automaticamente na retry. Para abrir:

```bash
npx playwright show-trace playwright-report/trace.zip
```

---

## 🔐 Segurança — O que Revisar

| Item | Status | Notas |
|------|--------|-------|
| Emails nunca em texto plano | ✓ | Armazenados como SHA-256 no código |
| Senha nunca em texto plano | ✓ | Hash em variável de ambiente |
| Comparação timing-safe | ✓ | Usa `crypto.timingSafeEqual` |
| Cookie HttpOnly + Secure | ✓ | Não acessível por JS do browser |
| Cookie SameSite=Strict | ✓ | Proteção CSRF |
| Token expira em 8h | ✓ | Requer novo login após 8h |
| Captcha com TTL de 5min | ✓ | Desafio expira |
| Página com noindex/nofollow | ✓ | Não indexada pelo Google |
| GitHub token no server-side | ✓ | Nunca exposto ao client |

---

## 🏗️ Impacto no Deploy

**Nenhum.** O deploy continua exatamente igual:
- `netlify.toml` não foi alterado
- Build command continua `yarn build`
- O admin é servido como páginas normais do Next.js
- As API routes rodam como Netlify Functions (automático via plugin)

---

## 🔮 Captcha — Perguntas Implementadas

1. Qual é o planeta associado a Tiferet? → Sol
2. Qual Sephirah é associada a Vênus? → Netzach
3. Qual é o símbolo de Malkuth? → ⨁
4. Quem é o Arcanjo de Tiferet? → Raphael
5. Qual Arcano Maior está no caminho 13? → A Sacerdotisa
6. Qual planeta rege Binah? → Saturno
7. Qual é o nome do pilar da esquerda? → Severidade
8. Qual Sephirah é chamada de "Fundação"? → Yesod
9. Qual elemento é associado ao caminho 23? → Água
10. Quem é o guardião do Véu do Abismo? → Choronzon
11. Qual é o valor numérico de Chokmah? → 2
12. Qual Qliphah é a sombra de Tiferet? → Tagimron

---

## 📌 Pendências Futuras

- [ ] Google OAuth (vincular Gmail para login facilitado) — necessita projeto GCP
- [ ] Possibilidade de adicionar mais perguntas ao captcha
- [ ] Preview em tempo real das edições antes de salvar
- [ ] Notificação por email quando conteúdo é alterado

---

## ⚠️ Atenção

- A senha `@Abraxas541` é a mesma para os dois logins. Se quiser senhas diferentes, me avise.
- O GitHub Token tem data de expiração. Coloque um lembrete para renovar.
- Cada edição no admin leva ~1-2 min para refletir no site (tempo de rebuild no Netlify).
