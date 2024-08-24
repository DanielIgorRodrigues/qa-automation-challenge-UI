import { expect } from "@playwright/test";
const { base_api } = require('../fixtures/env')

//função para cadastrar um novo usuário através de API
async function createUser(request, data) {
    const newUser = await request.post(`${base_api}/usuarios/`, { data })
    expect(newUser.ok()).toBeTruthy()
}

//função para excluir um novo usuário através de API
async function deleteUser(request, idUser) {
    const deleteUser = await request.delete(`${base_api}/usuarios/${idUser}`)
    expect(deleteUser.ok()).toBeTruthy()
}

export async function ensureUser(request, data) {

    const response = await request.get(`${base_api}/usuarios`)
    let users = await response.json()
    users = users.usuarios

    const user = users.find(u => u.email === data.email);

    if (user) {
        deleteUser(request, user._id)
    }

    createUser(request, data)
}