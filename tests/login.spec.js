import { test } from "@playwright/test";
import { ensuredUser, generateRandomUser, deleteNewUser } from "./utils/helpers";
import { LoginPage } from "./pages/loginPage";
import { HomeAdminPage } from "./pages/homeAdminPage"
import { HomeCommumPage } from "./pages/homeCommumPage";

let randomUser;
let loginPage;
let homeAdminPage;
let homeCommumPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homeAdminPage = new HomeAdminPage(page);
    homeCommumPage = new HomeCommumPage(page);
})

test.afterEach(async ({ request }) => {
    await deleteNewUser(request, randomUser.email)
})

test.describe('Login com sucesso', () => {
    test('Login de usuário comum com credenciais válidas', async ({ page, request }) => {
        randomUser = generateRandomUser();
        
        await ensuredUser(request, randomUser);

        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);
        await page.waitForTimeout(5000)
        await homeCommumPage.validateLogin();
    });

    test('Login de usuário admin com credenciais válidas', async ({ request }) => {
        randomUser = generateRandomUser(true);
        await ensuredUser(request, randomUser);
        
        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);
        
        await homeAdminPage.validateLogin(randomUser);
    });
});

test.describe('falha no login', () => {
    test('tentativa de login com senha inválida', async ({ request }) => {
        randomUser = generateRandomUser(true);
        await ensuredUser(request, randomUser);
        
        await loginPage.gologin();
        await loginPage.login(randomUser.email, 'senhaInvalida');
        
        await loginPage.validateLoginErrorMessage();
    });
});
