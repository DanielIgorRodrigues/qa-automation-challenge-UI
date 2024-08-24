import { test, expect } from "@playwright/test";
import { ensureUser } from "./utils/helpers";
const LoginPage = require('./pages/loginPage')
const data = require('./fixtures/users.json')

test.describe('Login com sucesso', () => {
    test('Login de usuário comum com credenciais válidas', async ({ page, request }) => {

        // garantindo que os dados de acesso do usuário sempre estarão disponíveis.
        await ensureUser(request, data.commonUser)

        const loginPage = new LoginPage(page)    

        //Acessando a página da aplicação.
        await loginPage.go()

        //Preenchendo os campos email e senha e realizando o login.
        await loginPage.login(data.commonUser.email, data.commonUser.password)

        //Validando o acesso à aplicação com sucesso.
        await expect(page).toHaveURL('/home');
        await expect(page.getByRole("heading", {name: 'Serverest Store'})).toBeVisible()
    });
});
