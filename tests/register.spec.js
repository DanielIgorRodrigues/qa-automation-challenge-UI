import { test } from "@playwright/test";
import { LoginPage } from "./pages/loginPage";
import { RegisterPage } from "./pages/registerPage";
import { HomeAdmin } from "./pages/homeAdmin"
import { deleteNewUser } from "./utils/helpers";

const data = require('./fixtures/users.json');
let loginPage;
let registerPage;
let homeAdmin;

test.beforeEach(({ page }) => {
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    homeAdmin = new HomeAdmin(page);
})
test.describe('Cadastro de usuários', () => {
    test('cadastro de um novo usuário admin, com logOut e novo LogIn', async ({ request }) => {
        await deleteNewUser(request, data.NewUser.email);
        await loginPage.gologin();
        await loginPage.goToRegisterPage();
        await registerPage.adminUserRegistration(data.NewUser);
        await homeAdmin.logout();
        await loginPage.login(data.NewUser.email, data.NewUser.password);
        await homeAdmin.validateLogin(data.NewUser)
    });
});