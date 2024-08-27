import { expect } from "@playwright/test"
const { MESSAGES } = require('../fixtures/messages');

export class HomeAdminPage {
    constructor(page) {
        this.page = page;
        this.logOutButton = 'button[data-testid="logout"]';
        this.productRegistrationLink = 'a[data-testid="cadastrarProdutos"]'
    };

    // Método para validar que o login do administrador foi bem-sucedido
    async validateLogin(data) {
        await expect(this.page).toHaveURL('/admin/home'); // Verifica se a URL atual é a URL da página inicial do administrador
        await expect(this.page.getByText(MESSAGES.adminWelcome + data.nome)).toBeVisible(); // Verifica se a mensagem de boas-vindas personalizada para o administrador está visível
        await expect(this.page.getByText(MESSAGES.messageAdminWelcome)).toBeVisible(); // Verifica se a mensagem padrão de boas-vindas do administrador está visível
    }

    // Método para realizar o logout do administrador
    async logout() {
        await this.page.click(this.logOutButton); // Clica no botão de logout
        await expect(this.page).toHaveURL('/login'); // Verifica se o usuário foi redirecionado para a página de login
        await expect(this.page).toHaveTitle(MESSAGES.pageTitle); // Verifica se o título da página é o esperado para a página de login
    };

    async accessingProductPegistrationPage() {
        await this.page.click(this.productRegistrationLink)
    }
};