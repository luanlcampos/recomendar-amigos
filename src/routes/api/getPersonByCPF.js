const Person = require("../../model/Person");
const { createSuccessResponse, createUserNotFoundResponse } = require("../../response");

/**
 * Recebe CPF na URL e retorna os dados da pessoa 
 * @param {*} req 
 * @param {*} res 
 * @returns {People} HTTP 200 se a pessoa existir || HTTP 404 caso não encontrado
 */
module.exports = (req, res) => {
    const { cpf } = req.params;

    const person = Person.getPersonByCPF(cpf);

    if (person) {
        const successResponse = createSuccessResponse(person);
        return res.status(200).json(successResponse);
    }

    const errorResponse = createUserNotFoundResponse();
    return res.status(404).json(errorResponse);
}