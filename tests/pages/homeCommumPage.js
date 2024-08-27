import { expect } from "@playwright/test"
const { MESSAGES } = require('../fixtures/messages');


export class HomeCommumPage {
    constructor(page) {
        this.page = page;
        this.logOutButton = 'button[data-testid="logout"]';

    };

    // Método para validar que o login do usuário comum foi bem-sucedido
    async validateLogin() {
        await expect(this.page).toHaveURL('/home'); // Verifica se a URL atual é a URL da página inicial do usuário comum
        await expect(this.page.getByRole("heading", { name: MESSAGES.commumPageTittle })).toBeVisible(); // Verifica se o título da página é visível e corresponde ao esperado
    };

    // Método para realizar o logout do usuário comum
    async logout() {
        await this.page.click(this.logOutButton); // Clica no botão de logout
        await expect(this.page).toHaveURL('/login'); // Verifica se o usuário foi redirecionado para a página de login
        await expect(this.page).toHaveTitle(MESSAGES.pageTitle); // Verifica se o título da página de login está correto
    };

    // Método para adicionar um produto à lista de compras e validar a adição
    async addToShopListAndValidate(productName) {
        const addtoListButton = `//h5[normalize-space(text())="${productName}"]/..//button[contains(@data-testid, "adicionarNaLista")]` // Localiza o botão "Adicionar à lista" baseado no nome do produto
        await this.page.click(addtoListButton) // Clica no botão para adicionar o produto à lista
        await expect(this.page.getByRole("heading", { name: MESSAGES.shopListTittle })).toBeVisible(); // Verifica se a página da lista de compras foi carregada corretamente
        await expect(this.page.getByText(productName)).toBeVisible(); // Verifica se o produto foi adicionado à lista de compras
    }
};