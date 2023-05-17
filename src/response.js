// src/response.js

// Arquivo que contém funções para criar a respostas da API para melhor padronização

/**
 * A resposta acertiva terá o seguinte formato:
 * @example
 * {
 *   "status": "ok",
 *   ...data
 * }
 */
module.exports.createSuccessResponse = function (data) {
    return {
        status: 'ok',
        ...data,
    };
};


/**
 * A resposta de um erro terá o seguinte formato:
 * @example
 * {
 *   "status": "error",
 *   "error": {
 *     "code": 400,
 *     "message": "Requisição inválida...",
 *   }
 * }
 */

module.exports.createErrorResponse = function (code, message) {
    return {
        status: 'error',
        error: {
            code,
            message,
        },
    };
};

/**
 * Utiliza createErrorResponse para gerar uma resposta
 * padrão para quando o usuário não for encontrado 
 * @returns {Object} responseObject  
 * Objeto retornado terá a seguinte estrutura
 * @example
 *  {
 *       "status": "error",
 *       "error": {
 *           "code": 400,
 *           "message": "CPF Inválido"
 *       }
 *   }
 */
module.exports.createUserNotFoundResponse = () => this.createErrorResponse(404, "Usuário não encontrado");

/**
 * Utiliza createErrorResponse para gerar uma resposta
 * padrão para quando o CPF for inválido
 * @returns {Object} res  
 * Objeto retornado terá a seguinte estrutura
 * @example
 *  {
 *       "status": "error",
 *       "error": {
 *           "code": 404,
 *           "message": "Usuário não encontrado"
 *       }
 *   }
 */
module.exports.createInvalidCPFResponse = () => this.createErrorResponse(400, "CPF Inválido");