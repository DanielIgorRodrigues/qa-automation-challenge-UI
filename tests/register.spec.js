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
    // Inicializa as páginas necessárias para os testes
    loginPage = new LoginPage(page);
    registerPage = new RegisterPage(page);
    homeAdminPage = new HomeAdminPage(page);
})

test.afterEach(async ({ request }) => {
    // Exclui o usuário criado durante o teste
    await deleteNewUser(request, randomUser.email)
})

test.describe('Cadastro de usuários', () => {
    test('cadastro de um novo usuário admin, com logOut e novo LogIn', async ({ request }) => {
        randomUser = generateRandomUser(); // Gera um usuário comum aleatório
        await deleteNewUser(request, randomUser); // Garante que o usuário não existe no sistema antes de criá-lo
        
        await loginPage.gologin(); // Navega para a página de login
        await loginPage.goToRegisterPage(); // Navega para a página de registro
        await registerPage.validateRegisterPage(); // Valida que a página de registro foi carregada corretamente
        
        await registerPage.adminUserRegistration(randomUser); // Realiza o cadastro do novo usuário administrador
        await homeAdminPage.validateLogin(randomUser); // Valida que o login do usuário foi bem-sucedido, ao cadastrar há um redirecionamento
        
        await homeAdminPage.logout(); // Realiza o logout
        await loginPage.login(randomUser.email, randomUser.password); // Realiza um novo login com o usuário criado
        await homeAdminPage.validateLogin(randomUser); // Valida novamente que o login foi bem-sucedido, validando usuário cadastrado corretamente.
    });
});