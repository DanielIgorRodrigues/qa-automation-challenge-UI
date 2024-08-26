import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import { HomeAdminPage } from "./pages/homeAdminPage"
import { deleteNewUser } from "./utils/helpers";

const data = require('./fixtures/users.json');
let loginPage;
let registerPage;
let homeAdminPage;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    homeAdminPage = new HomeAdminPage(page);
})
test.describe('Cadastro de usuários', () => {
    test('cadastro de um novo usuário admin, com logOut e novo LogIn', async ({ request }) => {
        await deleteNewUser(request, data.NewUser.email);
        
        await loginPage.gologin();
        await loginPage.goToRegisterPage();
        await registerPage.validateRegisterPage();
        
        await registerPage.adminUserRegistration(data.NewUser);
        await homeAdminPage.validateLogin(data.NewUser);
        
        await homeAdminPage.logout();
        
        await loginPage.login(data.NewUser.email, data.NewUser.password);
        await homeAdminPage.validateLogin(data.NewUser);
    });
});