import { expect } from "@playwright/test"

export class ListProductPage {
    constructor(page) {
        this.page = page;
    };

    // Método para validar se um produto registrado aparece na lista de produtos
    async validateRegistratedProduct(product) {
        await expect(this.page).toHaveURL('admin/listarprodutos');
        await expect(this.page.getByRole('heading')).toHaveText('Lista dos Produtos');

        const productLine = this.page.locator(`tr:has-text("${product.nome}")`);
        
        await expect(productLine).toContainText(product.nome);
        await expect(productLine).toContainText(product.preco);
        await expect(productLine).toContainText(product.descricao);
        await expect(productLine).toContainText(product.quantidade);
        await expect(productLine).toContainText('lhama');
    }
};