// POST v1/person

const globalData = require("../../model/data/globalData");
const { createSuccessResponse, createErrorResponse } = require("../../response");
const Person = require('../../model/Person');

/**
 * Recebe nome e CPF para inserção de uma nova pessoa no banco de dados
 * @param {{"cpf": "12312312312", "name": "Luan"}} req 
 * @param {*} res
 * @returns HTTP 200 quando a inserção der certo || HTTP 400 caso usuario já esteja cadastrado ou CPF for inválido
 */

module.exports = (req, res) => {
    const { cpf, name } = req.body;
    let { people, relationshipsAJ } = globalData;

    try {
        const person = new Person(cpf, name);

        // Verifica se a pessoa já está cadastrada
        if (people[person.cpf]) {
            const errorResponse = createErrorResponse(400, 'Usuário já cadastrado');
            return res.status(400).json(errorResponse);
        }

        // adiciona pessoa na lista de usuários
        people[person.cpf] = person;
        // cria uma nova lista de relações vazia para o usuário
        relationshipsAJ[person.cpf] = [];

        const successResponse = createSuccessResponse(person);

        res.status(200).json(successResponse);
    } catch (error) {
        const errorResponse = createErrorResponse(400, 'Requisição inválida: Ocorreu um erro na criação de uma pessoa');
        console.warn(error.message);
        res.status(400).json(errorResponse);
    }
}