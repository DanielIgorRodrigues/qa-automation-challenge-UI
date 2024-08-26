import { expect } from "@playwright/test";
const { MESSAGES } = require('../fixtures/messages');
import { HomeAdmin } from "./homeAdmin";

const homeAdmin = new HomeAdmin();

export class RegisterPage {
    constructor(page) {
        this.page = page;
        this.nameInput = 'input[data-testid="nome"]';
        this.emailInput = 'input[data-testid="email"]';
        this.passwordInput = 'input[data-testid="password"]';
        this.adminCheckbox = 'input[data-testid="checkbox"]';
        this.registrationButton = 'button[data-testid="cadastrar"]';
    };

    async adminUserRegistration(data) {
        await this.page.fill(this.nameInput, data.nome);
        await this.page.fill(this.emailInput, data.email);
        await this.page.fill(this.passwordInput, data.password);     
        await this.page.check(this.adminCheckbox);
        await this.page.click(this.registrationButton);

        await homeAdmin.validateLogin()
    };
};