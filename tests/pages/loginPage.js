import { expect } from "@playwright/test"

export class LoginPage {
    constructor(page) {
      this.page = page;
      this.emailInput = 'input[data-testid="email"]';
      this.passwordInput = 'input[data-testid="senha"]';
      this.loginButton = 'button[data-testid="entrar"]';
    }
  
    async go() {
      await this.page.goto('/');
      await expect(this.page).toHaveTitle(/Front - ServeRest/)
    }
  
    async login(email, password) {
      await this.page.fill(this.emailInput, email);
      await this.page.fill(this.passwordInput, password);
      await this.page.click(this.loginButton);
    }
  }  