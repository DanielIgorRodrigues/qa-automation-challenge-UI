import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { HomeCommumPage } from "./pages/homeCommumPage"
import { ensuredUser, ensuredProduct, generateRandomUser, deleteNewUser  } from "./utils/helpers";

const product = require('./fixtures/product.json')
let randomUser;
let loginPage;
let homeCommumPage;


test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homeCommumPage = new HomeCommumPage(page);
})

test.afterEach(async ({ request }) => {
    await deleteNewUser(request, randomUser.email)
})

test.describe('Compras', () => {
    test('inclusão de produto na lista de compras', async ({ request }) => {
        randomUser = generateRandomUser();
        await ensuredUser(request, randomUser);
        await ensuredProduct(request, product.product1);

        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);
        
        await homeCommumPage.validateLogin();

        await homeCommumPage.addToShopListAndValidate(product.product1.nome);        
    });
});