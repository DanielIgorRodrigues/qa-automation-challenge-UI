import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { ensuredUser, deleteProductByName, generateRandomUser, deleteNewUser  } from "./utils/helpers";
import { HomeAdminPage } from "./pages/homeAdminPage";
import { ProductRegistrationPage } from "./pages/productRegistrationPage";
import { ListProductPage } from "./pages/listProductPage";

const product = require('./fixtures/product.json')

let randomUser;
let loginPage;
let listProductPage;
let homeAdminPage;
let productRegistrationPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homeAdminPage = new HomeAdminPage(page);
    productRegistrationPage = new ProductRegistrationPage(page);
    listProductPage = new ListProductPage(page)
})

test.afterEach(async ({ request }) => {
    await deleteNewUser(request, randomUser.email)
    await deleteProductByName(request, product.manualProductRegister)
})

test.describe('Cadastro Produto', () => {
    test('cadastro de um novo produto pelo sistema de administrador', async ({ page, request }) => {
        randomUser = generateRandomUser(true);

        await ensuredUser(request, randomUser);
        
        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);
        
        await homeAdminPage.validateLogin(randomUser);

        await page.click('a[data-testid="cadastrarProdutos"]')
        await productRegistrationPage.validateAccessProductRegistrationPage()
        await productRegistrationPage.registerProduct(product.manualProductRegister);     
        await listProductPage.validateRegistratedProduct(product.manualProductRegister);
        
    });
});