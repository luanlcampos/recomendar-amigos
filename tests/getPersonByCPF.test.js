const request = require('supertest');

const app = require('../src/app');

describe('GET v1/person/:cpf', () => {
    test('deve retornar as informações do usuário', async () => {
        // cria usuário no db
        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "77777777777", name: "Giba" });


        const res = await request(app)
            .get('/v1/person/77777777777');

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('cpf', '77777777777');
        expect(res.body).toHaveProperty('name', 'Giba');
    });

    test('deve retornar 404: usuário não encontrado', async () => {
        const res = await request(app)
            .get('/v1/person/11111111111');


        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.code).toBe(404);
        expect(res.body.error.message).toBe('Usuário não encontrado');
    });
});