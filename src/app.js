// src/app.js

const express = require('express');

const { createErrorResponse } = require('./response');

// Create an express app instance we can use to attach middleware and HTTP routes
const app = express();

app.use(express.json());


app.use('/', require('./routes'));

// 404 middleware para retornar resposta erro quando rota não for encontrada
app.use((req, res, next) => {
    const errorResponse = createErrorResponse(404, 'not found');
    next(errorResponse);
});


/**
 * responsável por suportar todos os erros da aplicação
 * quando o erro não foi passado para esse middleware, ele irá utilizar uma resposta genérica
 * */
app.use((err, req, res, next) => {
    const status = err.error?.code || err.code || 500;
    const message = err.error?.message || err.message || 'incapaz de processar a requisição';

    // If this is a server error, log something so we can see what's going on.
    if (status > 499) {
        console.error({ err }, `Ocorreu um erro ao processar a requisição`);
    }

    const errorResponse = createErrorResponse(status, message);
    res.status(status).json(errorResponse);
});

module.exports = app;