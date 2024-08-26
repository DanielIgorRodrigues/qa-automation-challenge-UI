import { test } from "@playwright/test";
import { generateRandomUser, deleteNewUser } from "./utils/helpers";
import { RegisterPage } from "./pages/registerPage";
import { HomeAdminPage } from "./pages/homeAdminPage"
import { LoginPage } from "./pages/loginPage";

let randomUser;
let loginPage;
let registerPage;
let homeAdminPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    homeAdminPage = new HomeAdminPage(page);
})

test.afterEach(async ({ request }) => {
    await deleteNewUser(request, randomUser.email)
})

test.describe('Cadastro de usuários', () => {
    test('cadastro de um novo usuário admin, com logOut e novo LogIn', async ({ request }) => {
        randomUser = generateRandomUser();
        await deleteNewUser(request, randomUser);
        
        await loginPage.gologin();
        await loginPage.goToRegisterPage();
        await registerPage.validateRegisterPage();
        
        await registerPage.adminUserRegistration(randomUser);
        await homeAdminPage.validateLogin(randomUser);
        
        await homeAdminPage.logout();
        
        await loginPage.login(randomUser.email, randomUser.password);
        await homeAdminPage.validateLogin(randomUser);
    });
});