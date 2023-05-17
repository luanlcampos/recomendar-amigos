const globalData = require("../../model/data/globalData");
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
    const { people, relationshipsAJ } = globalData;
    const person1 = people.find(person => person.cpf === cpf1);
    const person2 = people.find(person => person.cpf === cpf2);

    // validar os dois cpfs
    if (!validateCPF(cpf1) || !validateCPF(cpf2)) {
        const errorResponse = createErrorResponse(400, "CPF inválido");
        return res.status(errorResponse.error.code).json(errorResponse);
    }

    // checar se os dois cpfs estão no banco de dados
    if (!person1 || !person2) {
        const errorResponse = createErrorResponse(404, "Usuário não cadastrado");
        return res.status(errorResponse.error.code).json(errorResponse);
    }

    // checar se relação já não é existente
    if (relationshipsAJ[cpf1].includes(cpf2) && relationshipsAJ[cpf2].includes(cpf1)) {
        const errorResponse = createErrorResponse(400, "Relacionamento já existe");
        return res.status(400).json(errorResponse);
    }


    /**
     *  criar relação
     * relationshipsAJ é uma lista adjacente onde a chave é os cpf do usuário,
     * e o valor é uma lista contendo todas a relações do usuário.
     * como toda relação é bidirecional, cpf1 adiciona cpf2 e cpf2 adiciona cpf1 
     * exemplo:
     * Antes da relação
     * {
     *  "11111111111": [],
     *  "22222222222": []
     * }
     * 
     * Depois da relação
     * 
     * {
     *  "11111111111": ["22222222222"],
     *  "22222222222": ["11111111111"]
     * }
     */
    relationshipsAJ[cpf1].push(cpf2);
    relationshipsAJ[cpf2].push(cpf1);



    // retornar resposta afirmativa
    const successResponse = createSuccessResponse({ "message": `Relação criada entre ${cpf1} e ${cpf2}` });
    return res.status(200).json(successResponse);
}