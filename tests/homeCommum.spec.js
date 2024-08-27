import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { HomeCommumPage } from "./pages/homeCommumPage"
import { ensuredUser, ensuredProduct, generateRandomUser, deleteNewUser  } from "./utils/helpers";

const product = require('./fixtures/product.json')
let randomUser;
let loginPage;
let homeCommumPage;


test.beforeEach(({ page }) => {
    // Inicializa as páginas de login e home comum
    loginPage = new LoginPage(page);
    homeCommumPage = new HomeCommumPage(page);
})

test.afterEach(async ({ request }) => {
    // Exclui o usuário criado durante o teste
    await deleteNewUser(request, randomUser.email)
})

test.describe('Compras', () => {
    test('inclusão de produto na lista de compras', async ({ request }) => {
        randomUser = generateRandomUser(); // Gera um usuário comum aleatório
        
        // Garante que o usuário e o produto existem no sistema
        await ensuredUser(request, randomUser); 
        await ensuredProduct(request, product.apiProductRegister);

        // Realiza o login com o usuário criado
        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);
        
        // Valida que o login foi bem-sucedido
        await homeCommumPage.validateLogin();

        // Adiciona o produto à lista de compras e valida a adição
        await homeCommumPage.addToShopListAndValidate(product.apiProductRegister.nome);        
    });
});