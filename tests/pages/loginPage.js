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

  async gologin() {
    await this.page.goto('/');
    await expect(this.page).toHaveTitle(/Front - ServeRest/);
  };

  async login(email, password) {
    await this.page.fill(this.emailInput, email);
    await this.page.fill(this.passwordInput, password);
    await this.page.click(this.loginButton);
  };

  async goToRegisterPage() {
    await this.page.click(this.registrationButton);
    await expect(this.page).toHaveURL('/cadastrarusuarios');
    await expect(this.page.getByRole('heading')).toHaveText(/Cadastro/);
  };

  async validateLoginErrorMessage() {
    await expect(this.page.locator(this.loginErrorMessage)).toContainText(MESSAGES.loginError)
  };
};