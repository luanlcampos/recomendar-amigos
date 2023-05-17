// src/response.js

// Arquivo que contém funções para criar a respostas da API para melhor padronização

/**
 * A resposta acertiva terá o seguinte formato:
 *
 * {
 *   "status": "ok",
 *   ...
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
 *
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