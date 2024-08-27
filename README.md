# QA Automation Challenge - UI

Este projeto foi desenvolvido para o Desafio Técnico de QA Automation, realizando automação de testes de interface de usuário (UI) para a aplicação https://front.serverest.dev/.

Para este desafio foi utilizado o [Playwright](https://playwright.dev/).

## Pré-requisitos

Antes de configurar e executar os testes, certifique-se de ter o seguinte instalado em seu ambiente:

- [Node.js](https://nodejs.org/) (versão 14 ou superior)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)

## Configuração do Projeto

1. **Clone o repositório**:
   ```bash
   git clone https://github.com/DanielIgorRodrigues/qa-automation-challenge-UI.git
   cd qa-automation-challenge-UI
   ```
2. **Instale as dependências**:
   ```bash
    npm install
    # ou
    yarn install
   ```

## Executando os Testes

**Executar Todos os Testes**:
Para rodar todos os testes, execute:
   ```bash
    npx playwright test
   ```
**Executar Testes Específicos**:
Para rodar um teste específico, use o seguinte comando:
   ```bash
    npx playwright test nome-do-teste.spec.ts
   ```
**Executar em Diferentes Navegadores**:
Por padrão, os testes são executados no Chromium. Para executar em outros navegadores, use:
   ```bash
    npx playwright test --browser=firefox
    npx playwright test --browser=webkit
   ```

## Estrutura do Projeto

- **`pages/`**: Contém as classes de Page Object para diferentes páginas do sistema.
- **`tests/`**: Contém os arquivos de teste organizados por funcionalidade.
- **`utils/`**: Contém funções auxiliares usadas em diferentes testes.
