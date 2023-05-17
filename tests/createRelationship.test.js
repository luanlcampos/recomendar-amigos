const request = require('supertest');

const app = require('../src/app');

describe('POST v1/relationship', () => {
    test('deve criar relação entre cpf1 e cpf2', async () => {
        const cpf1 = "77777777777", cpf2 = "55555555555";
        // create two users
        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: cpf1, name: "Giba" });

        await request(app)
            .post('/v1/person')
            .set('Content-Type', 'application/json')
            .send({ cpf: cpf2, name: "Mauricio" });


        const res = await request(app)
            .post('/v1/relationship')
            .set('Content-Type', 'application/json')
            .send({ cpf1, cpf2 });

        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty('status', 'ok');
        expect(res.body).toHaveProperty('message', `Relação criada entre ${cpf1} e ${cpf2}`);
    });

    test('deve retornar 400: CPF inválido', async () => {
        const cpf1 = "77777777777", cpf2 = "5555555555";


        const res = await request(app)
            .post('/v1/relationship')
            .set('Content-Type', 'application/json')
            .send({ cpf1, cpf2 });

        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body.error).toHaveProperty('message', 'CPF inválido');
    });

    test('deve retornar 404: CPF não cadastrado', async () => {
        const cpf1 = "11111111111", cpf2 = "22222222222";


        const res = await request(app)
            .post('/v1/relationship')
            .set('Content-Type', 'application/json')
            .send({ cpf1, cpf2 });

        expect(res.statusCode).toBe(404);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body.error).toHaveProperty('message', 'Usuário não cadastrado');
    });

    test('deve retornar 400: relação já existente', async () => {
        const cpf1 = "77777777777", cpf2 = "55555555555";


        const res = await request(app)
            .post('/v1/relationship')
            .set('Content-Type', 'application/json')
            .send({ cpf1, cpf2 });


        expect(res.statusCode).toBe(400);
        expect(res.body).toHaveProperty('status', 'error');
        expect(res.body.error).toHaveProperty('message', 'Relacionamento já existe');
    });


});