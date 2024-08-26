import { expect } from "@playwright/test"
const { MESSAGES } = require('../fixtures/messages');

export class HomeAdminPage {
    constructor(page) {
        this.page = page;
        this.logOutButton = 'button[data-testid="logout"]';
    };

    async validateLogin(data) {
        await expect(this.page).toHaveURL('/admin/home');
        await expect(this.page.getByText(MESSAGES.adminWelcome + data.nome)).toBeVisible();
        await expect(this.page.getByText(MESSAGES.messageAdminWelcome)).toBeVisible();
    }

    async logout() {
        await this.page.click(this.logOutButton);
        await expect(this.page).toHaveURL('/login');
        await expect(this.page).toHaveTitle(MESSAGES.pageTitle);
    };
};