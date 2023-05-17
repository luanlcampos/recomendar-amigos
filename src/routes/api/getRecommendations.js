const globalData = require("../../model/data/globalData");
const { createErrorResponse, createSuccessResponse } = require("../../response");
const { validateCPF } = require('../../utils/validateCPF');

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
    const { people, relationshipsAJ } = globalData;

    // Verifica se o CPF tem 11 dígitos numéricos
    if (!validateCPF(cpf)) {
        const errorResponse = createErrorResponse(400, 'CPF inválido');
        return res.status(400).json(errorResponse);
    }

    const person = people[cpf];

    if (!person) {
        const errorResponse = createErrorResponse(404, 'Usuário não encontrado');
        return res.status(404).json(errorResponse);
    }

    // obtem lista de amigos da aj
    const friends = relationshipsAJ[cpf];

    const recommendations =
        // reduce para iterar na array filtrada e criar um novo objeto contendo
        // o score de cada recomendação
        friends.reduce((acc, cpf) => {
            relationshipsAJ[cpf].forEach(friend => {
                if (!friends.includes(friend) && friend !== person.cpf) {
                    acc[friend] = (acc[friend] || 0) + 1;
                }
            });
            return acc;
        }, {});


    // Ordena as recomendações pela relevância
    const sortedRecommendations = Object.entries(recommendations)
        // apenas scores > 0 são considerados para ordenamento
        .filter(([_, score]) => score > 0)
        .sort((a, b) => b[1] - a[1])
        .map(([cpf]) => cpf);

    const successResponse = createSuccessResponse({ data: sortedRecommendations });
    return res.status(200).json(successResponse);

}