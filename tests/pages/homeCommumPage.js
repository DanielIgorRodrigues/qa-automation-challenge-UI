import { expect } from "@playwright/test"
const { MESSAGES } = require('../fixtures/messages');


export class HomeCommumPage {
    constructor(page) {
        this.page = page;
        this.logOutButton = 'button[data-testid="logout"]';

    };

    async validateLogin() {
        await expect(this.page).toHaveURL('/home');
        await expect(this.page.getByRole("heading", { name: MESSAGES.commumPageTittle })).toBeVisible();
    };

    async logout() {
        await this.page.click(this.logOutButton);
        await expect(this.page).toHaveURL('/login');
        await expect(this.page).toHaveTitle(MESSAGES.pageTitle);
    };

    async addToShopListAndValidate(productName) {
        const addtoListButton = `//h5[normalize-space(text())="${productName}"]/..//button[contains(@data-testid, "adicionarNaLista")]`
        await this.page.click(addtoListButton)
        await expect(this.page.getByRole("heading", { name: MESSAGES.shopListTittle })).toBeVisible();
        await expect(this.page.getByText(productName)).toBeVisible();
    }
};