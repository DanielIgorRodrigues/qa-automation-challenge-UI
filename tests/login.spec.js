import { test, expect } from "@playwright/test";
import { ensuredUser } from "./utils/helpers";
import { LoginPage } from "./pages/loginPage";
import { HomeAdmin } from "./pages/homeAdmin"

const data = require('./fixtures/users.json')

let loginPage;
let homeAdmin;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    homeAdmin = new HomeAdmin(page);
})

test.describe('Login com sucesso', () => {
    test('Login de usuário comum com credenciais válidas', async ({ page, request }) => {
        await ensuredUser(request, data.commonUser);
        await loginPage.gologin();
        await loginPage.login(data.commonUser.email, data.commonUser.password);
        
        await expect(page).toHaveURL('/home');
        await expect(page.getByRole("heading", { name: 'Serverest Store' })).toBeVisible();
    });

    test('Login de usuário admin com credenciais válidas', async ({ request }) => {
        await ensuredUser(request, data.AdminUser);
        await loginPage.gologin();
        await loginPage.login(data.AdminUser.email, data.AdminUser.password);
        await homeAdmin.validateLogin(data.AdminUser);
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
