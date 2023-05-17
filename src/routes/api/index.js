// src/routes/api/index.js

/**
 * O ponto de entrada principal para a API /v1
 */
const express = require('express');
const { createSuccessResponse } = require('../../response');

// Create a router on which to mount our API endpoints
const router = express.Router();

router.post('/person', require('./createPerson'));

router.get('/person/:cpf', require('./getPersonByCPF'));

router.delete('/clean', require('./cleanData'));

router.post('/relationship', require('./createRelationship'));

router.get('/recommendations/:cpf', require('./getRecommendations'));

router.get('/', (req, res) => {
    // Cache-control: no-cache para sempre obter resposta nova do servidor
    res.setHeader('Cache-Control', 'no-cache');

    const responseData = {
        message: "API V1 funcionando"
    };
    const successResponse = createSuccessResponse(responseData);

    res.status(200).json(successResponse);
});


// Other routes will go here later on...
module.exports = router;