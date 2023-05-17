const request = require('supertest');

const app = require('../src/app');


describe('POST v1/clean', () => {
    test('deve limpar todos os usuários e relações do banco de dados', async () => {
        // create a person
        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "77777777777", name: "Giba" });

        // get person
        const res = await request(app)
            .get('/v1/person/77777777777');
        expect(res.body).toHaveProperty('cpf', '77777777777');
        expect(res.body).toHaveProperty('name', 'Giba');

        // delete data
        const deleteRes = await request(app)
            .delete('/v1/clean');


        expect(deleteRes.statusCode).toBe(200);
        expect(deleteRes.body).toHaveProperty('status', 'ok');
        expect(deleteRes.body).toHaveProperty('message', 'Dados excluídos com sucesso');

        // get person para confirmar
        const confirmRes = await request(app)
            .get('/v1/person/77777777777');
        expect(confirmRes.statusCode).toBe(404);
        expect(confirmRes.body).toHaveProperty('status', 'error');
        expect(confirmRes.body).toHaveProperty('error');
        expect(confirmRes.body.error.code).toBe(404);
        expect(confirmRes.body.error.message).toBe('Usuário não encontrado');
    });

});