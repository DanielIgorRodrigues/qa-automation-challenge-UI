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

    // Método para validar o acesso à página de cadastro de produtos
    async validateAccessProductRegistrationPage() {
        await expect(this.page).toHaveURL('admin/cadastrarprodutos'); // Verifica se a URL atual é a URL da página de cadastro de produtos
        await expect(this.page.getByRole('heading')).toHaveText('Cadastro de Produtos'); // Verifica se a URL atual é a URL da página de cadastro de produtos
        // Verifica se todos os campos da tela e o botão de cadastro estão visíveis
        await expect(this.page.locator(this.nameInput)).toBeVisible();
        await expect(this.page.locator(this.priceInput)).toBeVisible();
        await expect(this.page.locator(this.descriptionTextArea)).toBeVisible();
        await expect(this.page.locator(this.quantityInput)).toBeVisible();
        await expect(this.page.locator(this.imageInput)).toBeVisible();
        await expect(this.page.locator(this.registrationButton)).toBeVisible();
    }

    // Método para registrar um novo produto
    async registerProduct(product) {
        // Preenche os campos de nome, preço, descrição e quantidade do produto
        await this.page.fill(this.nameInput, product.nome);
        await this.page.fill(this.priceInput, product.preco);
        await this.page.fill(this.descriptionTextArea, product.descricao);
        await this.page.fill(this.quantityInput, product.quantidade);
        const path = require('path');
        await this.page.locator(this.imageInput).setInputFiles(path.join(__dirname, '../fixtures/images/lhama.jpg')) // Realiza o upload da imagem do produto
        await this.page.click(this.registrationButton);
    }
};