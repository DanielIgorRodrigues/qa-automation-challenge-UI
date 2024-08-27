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
    // Inicializa as páginas necessárias para o teste
    loginPage = new LoginPage(page);
    homeAdminPage = new HomeAdminPage(page);
    productRegistrationPage = new ProductRegistrationPage(page);
    listProductPage = new ListProductPage(page)
})

test.afterEach(async ({ request }) => {
    // Exclui o usuário e o produto criado durante o teste garantindo a limpeza da base
    await deleteNewUser(request, randomUser.email)
    await deleteProductByName(request, product.manualProductRegister)
})

test.describe('Cadastro Produto', () => {
    test('cadastro de um novo produto pelo sistema de administrador', async ({ page, request }) => {
        randomUser = generateRandomUser(true); // Gera um usuário administrador aleatório
        await ensuredUser(request, randomUser); // cria o usuário no sistema via api
        
        // Realiza o login com o usuário administrador
        await loginPage.gologin(); 
        await loginPage.login(randomUser.email, randomUser.password);
        
        await homeAdminPage.validateLogin(randomUser); // Valida que o login foi bem-sucedido

        await homeAdminPage.accessingProductPegistrationPage() // Navega para a página de cadastro de produtos
        await productRegistrationPage.validateAccessProductRegistrationPage() // Valida que a página de cadastro de produtos foi carregada corretamente
        await productRegistrationPage.registerProduct(product.manualProductRegister); // Realiza o cadastro do produto     
        await listProductPage.validateRegistratedProduct(product.manualProductRegister); // Valida que o produto foi registrado e está na lista de produtos
        
    });
});