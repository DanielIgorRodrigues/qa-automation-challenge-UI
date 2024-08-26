import { test } from "@playwright/test";
import { ensuredUser } from "./utils/helpers";
import { LoginPage } from "./pages/loginPage";
import { HomeAdminPage } from "./pages/homeAdminPage"
import { HomeCommumPage } from "./pages/homeCommumPage";

const data = require('./fixtures/users.json')

let loginPage;
let homeAdminPage;
let homeCommumPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homeAdminPage = new HomeAdminPage(page);
    homeCommumPage = new HomeCommumPage(page);
})

test.describe('Login com sucesso', () => {
    test('Login de usuário comum com credenciais válidas', async ({ request }) => {
        await ensuredUser(request, data.commonUser);

        await loginPage.gologin();
        await loginPage.login(data.commonUser.email, data.commonUser.password);
        
        await homeCommumPage.validateLogin();
    });

    test('Login de usuário admin com credenciais válidas', async ({ request }) => {
        await ensuredUser(request, data.AdminUser);
        
        await loginPage.gologin();
        await loginPage.login(data.AdminUser.email, data.AdminUser.password);
        
        await homeAdminPage.validateLogin(data.AdminUser);
    });
});

test.describe('falha no login', () => {
    test('tentativa de login com senha inválida', async ({ request }) => {
        await ensuredUser(request, data.IncorrectUser);
        
        await loginPage.gologin();
        await loginPage.login(data.IncorrectUser.email, 'senhaInvalida');
        
        await loginPage.validateLoginErrorMessage();
    });
});
