import { expect } from "@playwright/test"

export class ProductRegistrationPage {
    constructor(page) {
        this.page = page;
        this.nameInput = 'input[data-testid="nome"]';
        this.priceInput = 'input[data-testid="preco"]';
        this.descriptionTextArea = 'textarea[data-testid="descricao"]';
        this.quantityInput = 'input[data-testid="quantity"]';
        this.imageInput = 'input[data-testid="imagem"]';
        this.registrationButton = 'button[data-testid="cadastarProdutos"]';
    };

    async validateAccessProductRegistrationPage() {
        await expect(this.page).toHaveURL('admin/cadastrarprodutos');
        await expect(this.page.getByRole('heading')).toHaveText('Cadastro de Produtos');
        await expect(this.page.locator(this.nameInput)).toBeVisible();
        await expect(this.page.locator(this.priceInput)).toBeVisible();
        await expect(this.page.locator(this.descriptionTextArea)).toBeVisible();
        await expect(this.page.locator(this.quantityInput)).toBeVisible();
        await expect(this.page.locator(this.imageInput)).toBeVisible();
        await expect(this.page.locator(this.registrationButton)).toBeVisible();
    }

    async registerProduct(product) {
        await this.page.fill(this.nameInput, product.nome);
        await this.page.fill(this.priceInput, product.preco);
        await this.page.fill(this.descriptionTextArea, product.descricao);
        await this.page.fill(this.quantityInput, product.quantidade);
        const path = require('path');
        await this.page.locator(this.imageInput).setInputFiles(path.join(__dirname, '../fixtures/images/lhama.jpg'))
        await this.page.click(this.registrationButton);
    }
};