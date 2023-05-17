const { createErrorResponse, createSuccessResponse } = require("../../response");
const { validateCPF } = require('../../utils/validateCPF');
const { readRecommendation, readPerson } = require('../../model/data/index');

/**
 * Baseado no CPF recebido no req.params, retornar as recomendações de pessoas
 * ordenados de maneira decrescente com base na relevância.
 * Pessoas recomendadas devem ser amigos de amigos que o usuário atual não conhece
 * O número de relevância aumenta conforme o número de amigos em comum que esse usuário possui com o recomendado
 * @param {*} req 
 * @param {*} res 
 * @returns HTTP 200 com array de cpfs || HTTP 400 se CPF for inválido || HTTP 404 se CPF não for cadastrado
 */
module.exports = (req, res) => {
    const { cpf } = req.params;

    // Verifica se o CPF tem 11 dígitos numéricos
    if (!validateCPF(cpf)) {
        const errorResponse = createErrorResponse(400, 'CPF inválido');
        return res.status(400).json(errorResponse);
    }

    const person = readPerson(cpf);

    if (!person) {
        const errorResponse = createErrorResponse(404, 'Usuário não encontrado');
        return res.status(404).json(errorResponse);
    }

    // chama funcão para pegar os recomendados para o usuário
    const sortedRecommendations = readRecommendation(person.cpf);

    const successResponse = createSuccessResponse({ data: sortedRecommendations });
    return res.status(200).json(successResponse);

}