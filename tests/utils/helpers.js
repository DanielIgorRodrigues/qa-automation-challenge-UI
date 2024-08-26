import { expect } from "@playwright/test";
import { faker } from '@faker-js/faker';
const base_api = 'https://serverest.dev'
let tokenUser;


export function generateRandomUser(isAdmin = false) {
    return {
        nome: faker.person.fullName(),
        email: faker.internet.email({ provider: 'teste.com' }),
        password: faker.internet.password(),
        administrador: isAdmin ? 'true' : 'false'
    };
}

async function createUser(request, data) {
    const newUser = await request.post(`${base_api}/usuarios/`, { data })
    expect(newUser.ok()).toBeTruthy()
};

async function deleteUser(request, idUser) {
    const deleteUser = await request.delete(`${base_api}/usuarios/${idUser}`)
    expect(deleteUser.ok()).toBeTruthy()
};

async function queryUserExist(request, email) {
    const response = await request.get(`${base_api}/usuarios`)
    let users = await response.json()
    users = users.usuarios
    return users.find(u => u.email === email);
}

export async function ensuredUser(request, data) {
    let user = await queryUserExist(request, data.email)
    while (user) {
        await deleteUser(request, user._id);
        user = await queryUserExist(request, data.email);
    }
    await createUser(request, data)
};

export async function deleteNewUser(request, email) {
    const user = await queryUserExist(request, email)

    if (user) {
        await deleteUser(request, user._id)
    }
};

export async function getToken(request) {
    tokenUser = generateRandomUser(true)
    await ensuredUser(request, tokenUser)
    const user = {
        "email": tokenUser.email,
        "password": tokenUser.password
    }
    const response = await request.post(`${base_api}/login/`, { data: user })
    expect(response.ok()).toBeTruthy()
    let token = await response.json()
    token = token.authorization
    return token
};


export async function ensuredProduct(request, product) {
    const token = await getToken(request);

    const findResponse = await request.get(`${base_api}/produtos?nome=${product.nome}`);
    let products = await findResponse.json();

    products = products.produtos || [];
    let existingProduct = products.find(p => p.nome === product.nome);
    let productId = existingProduct ? existingProduct._id : null;

    if (productId) {
        await request.delete(`${base_api}/produtos/${productId}`, {
            headers: {
                'Authorization': token,
                'Content-Type': 'application/json'
            }
        });
    }

    const response = await request.post(`${base_api}/produtos`, {
        data: product,
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json'
        }
    });
    expect(response.ok()).toBeTruthy();

    await deleteNewUser(request, tokenUser.email);
}


