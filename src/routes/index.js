// src/routes/index.js

const express = require('express');
const { createSuccessResponse } = require('../response');
const router = express.Router();

/**
 * Todas as rotas da API serão acessíveis a partir da base /v1/*
 * Este método facilita a implementação de novas features no futuro 
 * sem que o cliente perca acesso a API
 */
router.use('/v1', require('./api'));

/**
 * Rota para checar o estado da API
 */
router.get('/', (req, res) => {
    // Cache-control: no-cache para sempre obter resposta nova do servidor
    res.setHeader('Cache-Control', 'no-cache');

    const responseData = {
        message: "API funcionando"
    };
    const successResponse = createSuccessResponse(responseData);

    res.status(200).json(successResponse);
});

module.exports = router;