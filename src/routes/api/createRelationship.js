const Person = require("../../model/Person");
const { createErrorResponse, createSuccessResponse } = require("../../response");
const { validateCPF } = require("../../utils/validateCPF");

/**
 * Cria uma nova relação entre pessoas baseado nos CPFs
 * @param {*} req 
 * @param {*} res 
 * @returns HTTP 200 em caso de sucesso || HTTP 404 caso um dos usuários não exista
 */
module.exports = (req, res) => {
    const { cpf1, cpf2 } = req.body;

    // validar os dois cpfs
    if (!validateCPF(cpf1) || !validateCPF(cpf2)) {
        const errorResponse = createErrorResponse(400, "CPF inválido");
        return res.status(errorResponse.error.code).json(errorResponse);
    }

    // checar se os dois cpfs estão no banco de dados
    const person1 = Person.getPersonByCPF(cpf1);
    const person2 = Person.getPersonByCPF(cpf2);


    if (!person1 || !person2) {
        const errorResponse = createErrorResponse(404, "Usuário não cadastrado");
        return res.status(errorResponse.error.code).json(errorResponse);
    }

    // checar se relação já não é existente
    const relationshipAJ1 = Person.getRelationshipsById(cpf1);
    const relationshipAJ2 = Person.getRelationshipsById(cpf2);


    if (relationshipAJ1.includes(cpf2) && relationshipAJ2.includes(cpf1)) {
        const errorResponse = createErrorResponse(400, "Relacionamento já existe");
        return res.status(400).json(errorResponse);
    }

    Person.addRelationship(cpf1, cpf2);

    // retornar resposta afirmativa
    const successResponse = createSuccessResponse({ "message": `Relação criada entre ${cpf1} e ${cpf2}` });
    return res.status(200).json(successResponse);
}