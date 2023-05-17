const request = require('supertest');

const app = require('../src/app');

describe('POST v1/person', () => {
    test('deve criar e armazenar uma nova pessoa no banco de dados', async () => {
        const res = await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "77777777777", name: "Giba" });


        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('cpf', '77777777777');
        expect(res.body).toHaveProperty('name', 'Giba');
    });

    test('deve retornar 400: usuário já cadastrado', async () => {
        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "77777777777", name: "Giba" });

        const res = await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "77777777777", name: "Giba" });


        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.code).toBe(400);
        expect(res.body.error.message).toBe('Usuário já cadastrado');
    });

    test('deve retornar 400: cpf inválido', async () => {
        const res = await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: "7777777777", name: "Giba" });


        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body).toHaveProperty('error');
        expect(res.body.error.code).toBe(400);
        expect(res.body.error.message).toBe('Requisição inválida: Ocorreu um erro na criação de uma pessoa');
    });
})