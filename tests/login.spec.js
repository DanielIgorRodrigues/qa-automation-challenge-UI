import { test, expect } from "@playwright/test";
import { ensureUser } from "./utils/helpers";
import { LoginPage } from "./pages/loginPage"

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

    test('Login de usuário admin com credenciais válidas', async ({ page, request }) => {

        // garantindo que os dados de acesso do usuário sempre estarão disponíveis.
        await ensureUser(request, data.AdminUser)

        const loginPage = new LoginPage(page)    

        //Acessando a página da aplicação.
        await loginPage.go()

        //Preenchendo os campos email e senha e realizando o login.
        await loginPage.login(data.AdminUser.email, data.AdminUser.password)

        //Validando o acesso à aplicação admin com sucesso.
        await expect(page).toHaveURL('/admin/home');
        await expect(page.getByText('Este é seu sistema para administrar seu ecommerce.')).toBeVisible()
    });
});

test.describe('falha no login', () => {
    test('tentativa de login com senha inválida', async ({ page, request }) => {

        await ensureUser(request, data.IncorrectUser)

        const loginPage = new LoginPage(page)    

        await loginPage.go()
        await loginPage.login(data.IncorrectUser.email, 'senhaInvalida')

        const alertMessage = await page.locator('//div[contains(@class, "alert")]/span').textContent()

        expect(alertMessage).toBe('Email e/ou senha inválidos')

        await page.waitForTimeout(5000)
    })

})
