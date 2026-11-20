# playwright-portfolio

E2E test suite for [SauceDemo](https://www.saucedemo.com/) built with **Playwright + JavaScript**: login and navigation flows. Study project, in progress.

Suíte de testes E2E do SauceDemo com Playwright + JavaScript: fluxos de login e navegação. Projeto de estudos, em andamento.

## Cenários cobertos

- **Smoke:** página inicial carrega com o formulário de login
- **Login:** sucesso, usuário lento (timeout maior), usuário bloqueado, senha errada, usuário inexistente, campos vazios, sem senha, sem usuário
- **Navegação:** detalhes do produto e volta, carrinho e continuar comprando, menu lateral, logout, acesso direto sem login

## Estrutura

```
playwright.config.js   # baseURL, testIdAttribute, timeouts, reporter
.env.example           # variáveis de ambiente (copiar para .env)
support/               # credenciais e login reutilizável
tests/                 # smoke, login e navigation
```

## Boas práticas aplicadas

- Locators por `data-test` (`getByTestId`) e por papel (`getByRole`)
- Auto-waiting: asserções web-first (`await expect(...)`), sem esperas fixas
- `test.describe` + `test.beforeEach` para organizar e preparar cada teste
- Variáveis de ambiente para URL e credenciais

## Como rodar

```bash
npm install
npx playwright install chromium
cp .env.example .env
npx playwright test            # headless
npx playwright test --ui       # modo interativo
npx playwright show-report     # relatório HTML
```
