import { expect } from "@playwright/test"
const { MESSAGES } = require('../fixtures/messages');

export class LoginPage {
  constructor(page) {
    this.page = page;
    this.emailInput = 'input[data-testid="email"]';
    this.passwordInput = 'input[data-testid="senha"]';
    this.loginButton = 'button[data-testid="entrar"]';
    this.registrationButton = 'a[data-testid="cadastrar"]';
    this.loginErrorMessage = '//div[contains(@class, "alert")]/span'
  };
  
  // Método para navegar para a página de login e validar o título
  async gologin() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(MESSAGES.pageTitle);
  };

  // Método para realizar o login com as credenciais fornecidas
  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  };

  // Método para navegar para a página de cadastro de novo usuário
  async goToRegisterPage() {
    await this.page.click(this.registrationButton);
  };

  // Método para validar a mensagem de erro ao tentar fazer login com credenciais inválidas
  async validateLoginErrorMessage() {
    await expect(this.page.locator(this.loginErrorMessage)).toContainText(MESSAGES.loginError)
  };
};