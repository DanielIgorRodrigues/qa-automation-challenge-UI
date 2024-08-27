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
    // Inicializa as páginas necessárias para os testes
    loginPage = new LoginPage(page);
    homeAdminPage = new HomeAdminPage(page);
    homeCommumPage = new HomeCommumPage(page);
})

test.afterEach(async ({ request }) => {
    // Exclui o usuário criado durante o teste
    await deleteNewUser(request, randomUser.email)
})

test.describe('Login com sucesso', () => {
    test('Login de usuário comum com credenciais válidas', async ({ request }) => {
        randomUser = generateRandomUser(); // Gera um usuário comum aleatório
        await ensuredUser(request, randomUser); // cria o usuário gerado no sistema

        // Realiza o login com o usuário criado
        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);

        // Valida que o login foi bem-sucedido
        await homeCommumPage.validateLogin();
    });

    test('Login de usuário admin com credenciais válidas', async ({ request }) => {
        randomUser = generateRandomUser(true); // Gera um usuário administrador aleatório
        await ensuredUser(request, randomUser); // Cria o usuário administrador no sistema
        
        // Realiza o login com o usuário administrador
        await loginPage.gologin();
        await loginPage.login(randomUser.email, randomUser.password);

        // Valida que o login foi bem-sucedido        
        await homeAdminPage.validateLogin(randomUser);
    });
});

test.describe('falha no login', () => {
    test('tentativa de login com senha inválida', async ({ request }) => {
        randomUser = generateRandomUser(true); // Gera um usuário administrador aleatório
        await ensuredUser(request, randomUser); // Garante que o usuário foi criado no sistema
                                                // Neste caso foi criado o usuário para garantir que, 
                                                // mesmo passando uma senha invalida para um usuário existente, 
                                                // o login seria barrado.
        
        // Tenta realizar o login com uma senha inválida
        await loginPage.gologin();
        await loginPage.login(randomUser.email, 'senhaInvalida');
        
        // Valida que a mensagem de erro de login é exibida
        await loginPage.validateLoginErrorMessage();
    });
});
