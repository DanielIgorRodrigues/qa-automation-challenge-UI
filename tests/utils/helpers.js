import { expect } from "@playwright/test";

const base_api = 'https://serverest.dev'

//função para cadastrar um novo usuário através de API
async function createUser(request, data) {
    const newUser = await request.post(`${base_api}/usuarios/`, { data })
    expect(newUser.ok()).toBeTruthy()
};

//função para excluir um novo usuário através de API
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
    const user = await queryUserExist(request, data.email)
    if (user) {
        deleteUser(request, user._id)
    }

    createUser(request, data)
};

export async function deleteNewUser(request, email) {
    const user = await queryUserExist(request, email)

    if (user) {
        deleteUser(request, user._id)
    }
}

